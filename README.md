# Hydra Web UI
Web Management UI for Hydra oAuth Server

## Prerequisites

* Node.js - Version 12.14.1 
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
PORT=3000
```


* To run with docker-compose,
```console
docker-compose -f hydrastart.yaml \           
    -f hydrastart-postgres.yaml   \
    up --build
```

* To stop all the containers running with compose,
```console
docker-compose -f hydrastart.yaml \           
    -f hydrastart-postgres.yaml   \
    stop
```

* To remove all the stopped container,
```console
docker-compose -f hydrastart.yaml \           
    -f hydrastart-postgres.yaml   \
    rm
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
HYDRA_PROXY_URL=http://hydra:4445
PORT=3000
```
* `HYDRA_PROXY_URL`: It is Hydra Admin url.

* `PORT`: Port on which the UI will run.

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

After this application will run at `http://localhost:3000/`.
  
## Perform the OAuth 2.0 authorization code grant
* Go to root folder and run following commands.

* Run this command to run authorization flow using consent app.

* Here callback url should be same as the callback url configured in the application using hydra.

```bash
# Create client
$ docker-compose -f quickstart.yml exec hydra \
    hydra clients create \
    --endpoint http://127.0.0.1:4445 \
    --id auth-code-client \
    --secret secret \
    --grant-types authorization_code,refresh_token \
    --response-types code,id_token \
    --scope openid,offline \
    --callbacks http://127.0.0.1:5555/callback

# Perform authorization code flow
$ docker-compose -f quickstart.yml exec hydra \
    hydra token user \
    --client-id auth-code-client \
    --client-secret secret \
    --endpoint http://127.0.0.1:4444/ \
    --port 5555 \
    --scope openid,offline
```

# Gitea Setup
* To use hydra client in gitea install gitea from binary to your local system from here https://docs.gitea.io/en-us/install-from-binary/

* In the configuration page of the gitea when you sign-in for the first time use SQLite as DB, `127.0.0.1` instead of localhost.

* Run this command to run authorization flow using getia in the root folder.

```bash
# Create client
$ docker-compose -f hydrastart.yaml exec hydra \
    hydra clients create \
    --endpoint http://127.0.0.1:4445 \
    --id gitea-client \
    --secret secret \
    --grant-types authorization_code,refresh_token \
    --response-types code,id_token \
    --scope openid,offline \
    --callbacks http://127.0.0.1:3000/user/ORY_Hydra/new/callback \
    --token-endpoint-auth-method client_secret_post
```

* Once the client is created and Logged-in to gitea, go to authentication sources tab, add authentication source with following details.

```bash
Authentication Type: OAuth2
Authentication Name: ORY_Hydra
OAuth2 Provider: OpenID Connect
Client ID: gitea-client
Client Secret: secret
OpenID Connect Auto Discovery URL: http://127.0.0.1:4444/.well-known/openid-configuration
```

* Log-out of the gitea and you should see sign-in with OpenID connect.
