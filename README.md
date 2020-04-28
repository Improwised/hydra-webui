# hydra-webui
Web Management UI for Hydra oAuth Server

Have a look at this url to run compose and create client,
```console
https://www.ory.sh/hydra/docs/5min-tutorial/
```

Make .env.docker file in web directory with contents,
```console
HYDRA_ADMIN_URL=http://hydra:4445
PUBLIC_URL=http://hydra:4444
```


To run with docker-compose,
```console
docker-compose up --build
```

To stop all the containers running with compose,
```console
docker-compose stop
```

To remove all the stopped container,
```console
docker-compose rm
```

If some containers are still running even after running above stop and rm commands, remove those containers individually by running below command,
```console
docker stop <container-id>
docker rm <container-id>
```