```shell
docker compose build --progress=plain && docker compose down -v && docker compose up -d
```

!! Так как образ keycloak-а поставляется без `curl` и `wget`, то делать healthcheck приходится немного изощренно.

Если не работает на MacOS, можно удалить блок `healthcheck:` и перезапустить сервис `backend-api`, т.к. он подключается 
к Keycloak быстрее чем он поднимается.