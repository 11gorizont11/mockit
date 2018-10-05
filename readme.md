## How to use dev version

### Setup services:
```bash
docker-compose up build db api
```
### Run web:

```bash
cd web && npm run dev
```

### Stop services: 
```bash
docker-compose down --rmi local
```