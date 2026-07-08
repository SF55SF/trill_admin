# Кабинет управления Trilliant

В проект добавлена админка Decap CMS по адресу:

```text
/admin/
```

Что уже сделано:

- офисы вынесены в `src/content/offices/`;
- карточки на главной странице берутся из файлов офиса;
- страницы офисов создаются автоматически по `slug`;
- добавлена страница админки `src/pages/admin/index.astro` и конфиг `public/admin/config.yml`;
- добавлен общий JS-файл `public/js/site.js`;
- добавлен шаблон GitHub Actions для автоматического деплоя на FTP-хостинг.

## Как добавлять офисы

В админке создаётся новый офис. Главное поле — `slug`.

Например:

```text
office-300m2-trilliant
```

После публикации страница будет доступна по адресу:

```text
https://www.trilliant.uz/office-300m2-trilliant/
```

## Важно про логин

Админка использует GitHub backend. В `public/admin/config.yml` уже указан репозиторий:

```yaml
repo: SF55SF/trill_admin
```

Чтобы вход через `/admin/` работал на сайте, нужно подключить GitHub OAuth для Decap CMS или использовать совместимый auth gateway. Пока это не настроено, можно редактировать файлы напрямую в GitHub или использовать локальный режим Decap CMS.

## Локальный запуск админки

1. Установить зависимости:

```bash
npm ci
```

2. Запустить Astro:

```bash
npm run dev
```

3. В отдельном терминале можно запустить локальный backend Decap CMS:

```bash
npx decap-server
```

4. Открыть:

```text
http://localhost:4321/admin/
```

## Автоматический деплой на хостинг

В архив добавлен файл:

```text
.github/workflows/deploy.yml
```

В GitHub нужно добавить Secrets:

```text
FTP_SERVER
FTP_USERNAME
FTP_PASSWORD
FTP_SERVER_DIR
```

После этого при каждом `git push origin main` GitHub сам соберёт сайт и загрузит `dist` на хостинг.
