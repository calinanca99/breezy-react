# Breezy React

Visit at: https://breezy-frontend.fly.dev/

## Run locally

**Running the app locally requires setting an OpenWeather API key.** You can find more details [here](https://openweathermap.org/api).

### Via Docker

1. Build and run the Docker image for the backend

```
$ cd src-backend/
$ docker build -t breezy-backend .
$ docker run -d -p 3000:3000 -e OPEN_WEATHER_API_KEY=<YOUR_API_KEY> breezy-backend:latest
$ curl -v http://localhost:3000/weather/london
```

2. Build and run the Docker image for the frontend

Set `VITE_API_ENDPOINT` to http://localhost:3000 in `.env.production`.

```
$ docker build -t breezy-frontend .
$ docker run -d -p 8000:8000 breezy-frontend:latest
```

Visit http://localhost:8000.

### Via Cargo and Bun

1. Run the backend

```
$ cd src-backend/
$ cp .envrc.example .envrc # update OPEN_WEATHER_API_KEY value
$ direnv allow . # requires https://direnv.net/
$ cargo run
$ curl -v http://localhost:3000/weather/london
```

2. Run the frontend

```
$ cp .env.example .env # update VITE_API_ENDPOINT value
$ bun run dev
```

Visit http://localhost:5173.
