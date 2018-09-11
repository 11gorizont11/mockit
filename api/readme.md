## Just simple mock api service.

#### scripts for pun project:

```bash
npm start
```

```bash
npm run dev
```

get all docker IPs

```bash
docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
```
