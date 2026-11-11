# Здача ПР9 · Серверні фреймворки

Прізвище та ім’я: Суганяка Надія

Commit або змінені файли: `src/auth/roles.guard.ts`, `src/admin.controller.ts` (контекст: `src/auth/roles.decorator.ts`)

## Три перевірки GET /api/v1/admin/users

Не вставляйте значення JWT або JWT_SECRET. Пишіть лише «student», «admin» або «без токена».

| Хто виконує запит | Статус і тіло відповіді |
|---|---|
| Без токена | `401` `{"message":"TOKEN_REQUIRED","error":"Unauthorized","statusCode":401}` |
| STUDENT | `403` `{"message":"Forbidden resource","error":"Forbidden","statusCode":403}` |
| ADMIN | `200` `[{"id":2,"name":"Student Demo","roles":["STUDENT"]},{"id":1,"name":"Admin Demo","roles":["ADMIN"]}]` |

`npm run check`: `PASS: 401 / 403 / 200 / 401; /me remains 200` (невалідний токен → 401; `npm run typecheck` без помилок)
