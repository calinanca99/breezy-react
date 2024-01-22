use axum::{
    extract::{Path, State},
    http::{Method, StatusCode},
    response::{IntoResponse, Response},
    routing::get,
    Router,
};

use serde::{Deserialize, Serialize};
use tower_http::cors::{Any, CorsLayer};

#[derive(Clone)]
pub struct AppState {
    pub open_weather_api_key: String,
}

#[tokio::main]
async fn main() {
    let open_weather_api_key =
        std::env::var("OPEN_WEATHER_API_KEY").expect("OPEN_WEATHER_API_KEY not set");
    let state = AppState {
        open_weather_api_key,
    };

    let app = Router::new()
        .route("/health_check", get(health_check))
        .route("/weather/:city", get(weather))
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods([Method::GET]),
        )
        .with_state(state);
    let port = 3000;
    let addr = format!("127.0.0.1:{port}");
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();

    println!("Listening on: {addr}");

    axum::serve(listener, app).await.unwrap();
}

pub async fn health_check() -> impl IntoResponse {
    StatusCode::OK
}

#[derive(Debug, Deserialize)]
pub struct Weather {
    pub name: String,
    #[serde(rename(deserialize = "main"))]
    pub temperature: Temperature,
}

#[derive(Debug, Serialize)]
pub struct WeatherResponse {
    pub name: String,
    pub temperature: f32,
}

#[derive(Debug, Deserialize)]
pub struct Temperature {
    pub temp: f32,
}

pub async fn weather(Path(city): Path<String>, State(app): State<AppState>) -> Response {
    let url = format!(
        "https://api.openweathermap.org/data/2.5/weather?q={}&appid={}",
        city, app.open_weather_api_key
    );

    match reqwest::get(url).await {
        Ok(res) => match res.json::<Weather>().await {
            Ok(data) => {
                let res = WeatherResponse {
                    name: data.name,
                    temperature: data.temperature.temp,
                };
                serde_json::to_string(&res).unwrap().into_response()
            }
            Err(_) => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
        },
        Err(_) => StatusCode::UNAUTHORIZED.into_response(),
    }
}
