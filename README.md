# Hydra Web UI
Web Management UI for Hydra oAuth Server

## Prerequisites

* Node.js
* Docker compose

# Compose setup

* Have a look at this url to run compose and create client,
```console
https://www.ory.sh/hydra/docs/5min-tutorial/
```

## .env.docker
* copy `.env.docker` to `.env` in web directory,

```console
HYDRA_PROXY_URL=http://localhost:4445
```


* To run with docker-compose,
```console
docker-compose up --build
```

* To stop all the containers running with compose,
```console
docker-compose stop
```

* To remove all the stopped container,
```console
docker-compose rm
```

* If some containers are still running even after running above stop and rm commands, remove those containers individually by running below command,
```console
docker stop <container-id>
docker rm <container-id>
```

# UI Setup

* For UI everything is under `/web/` folder, so go to `/web/` folder. 

## .env.example

* copy `.env.example` to `.env`.
```
HYDRA_PROXY_URL=http://localhost:4445
```
* `HYDRA_PROXY_URL`: It's a Hydra Admin url.

## Build Setup

* Go to `/web/` folder. 

* copy `.env.example` to `.env`. (skip if already done)

```bash
$ cp .env.example .env
```

* run following commands

``` bash
# install dependencies (skip if already done)
$ npm install 

# build for production and launch server
$ npm run build

# run the application
$ npm start

# serve with hot reload at localhost:3000
$ npm run dev
```

After this application will run at `http://localhost:3000/hydra`.