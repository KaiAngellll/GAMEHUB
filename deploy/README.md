# GAMEHUB — локальный деплой приложения

## 1. Описание проекта

GAMEHUB — веб-приложение игровой тематики. Проект состоит из frontend на React и Vite, backend на Node.js и Express, а также внешней базы данных Supabase PostgreSQL


## 2. Архитектура приложения

Схема взаимодействия компонентов:

1. Браузер пользователя обращается к `https://gamehub.localhost`.
2. Основной Nginx принимает HTTP- и HTTPS-запросы.
3. HTTP-запросы перенаправляются на HTTPS.
4. Запросы к `/api/` передаются backend на Express.
5. Остальные запросы передаются frontend-контейнеру с собранным React-приложением.
6. Backend подключается к внешней базе данных Supabase PostgreSQL.

## 3. Используемые технологии

| Компонент | Технология | Порт |
|---|---|---|
| Frontend | React, Vite, Nginx | 80 (внутренний) |
| Backend | Node.js, Express | 3000 (внутренний) |
| Основной шлюз | Nginx | 80, 443 |
| База данных | Supabase PostgreSQL | 5432 |

## 4. Структура deploy

- `certs/` — локальные SSL-сертификаты и закрытый ключ.
- `nginx/nginx.conf` — конфигурация основного Nginx.
- `docker-compose.yml` — описание контейнеров.
- `.gitignore` — исключение сертификатов и локальных секретов.
- `screenshots/` — скриншоты выполнения практической работы.

## 5. Переменные окружения

Backend использует переменные из корневого файла `.env`:

- `DB_HOST` — адрес базы данных.
- `DB_PORT` — порт базы данных.
- `DB_NAME` — название базы данных.
- `DB_USER` — пользователь базы данных.
- `DB_PASSWORD` — пароль базы данных.
- `DB_SSL` — настройка SSL-подключения.
- `JWT_SECRET` — секретный ключ JWT.
- `JWT_EXPIRES_IN` — срок действия токена.
- `PORT` — порт backend.


## 6. Создание локального SSL-сертификата

Для создания сертификата используется mkcert.

Установка локального центра сертификации:

```powershell
mkcert -install
```

Создание сертификата из корня проекта:

```powershell
mkcert -cert-file deploy/certs/gamehub.localhost.pem -key-file deploy/certs/gamehub.localhost-key.pem gamehub.localhost
```

## 7. Запуск приложения

Из папки `deploy` выполнить:

```powershell
docker compose up --build -d
```

Проверить состояние контейнеров:

```powershell
docker compose ps
```

Просмотреть журналы backend:

```powershell
docker compose logs backend
```

После успешного запуска приложение доступно по адресу:

`https://gamehub.localhost`

При обращении по HTTP выполняется перенаправление на HTTPS!

## 8. Остановка приложения

Из папки `deploy` выполнить:

```powershell
docker compose down
```

## 9. Проверка работы

После запуска необходимо проверить:

- успешный запуск трёх контейнеров;
- открытие главной страницы по HTTPS;
- перенаправление с HTTP на HTTPS;
- работу запросов к API;
- регистрацию и авторизацию пользователя;
- подключение backend к Supabase PostgreSQL;
- наличие заголовка `X-Robots-Tag: noindex, nofollow` у API-ответов.

