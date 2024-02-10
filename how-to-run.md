# Приложение FitFriends (backend + frontend)

Для запуска приложения необходимо
скопировать приложение из данного репозитория:

```bash
git clone git@github.com:Mabori1/fit-friends.git ./fit-friends
```

Перейти в корневой каталог проекта:

```bash
cd ./fit-friends
```

Установить библиотеки:

```bash
npm install
```

Создать файл .env в корне проекта, скопировать содержимое из файла .env-example.
Повторить данную операцию в папке frontend.

## Для работы в режиме разработки необходимо

Запустить в докере базу данных, почтовый сервер и администратор базы данных:

```bash
docker compose -f docker-compose.dev.yml up -d
```

Запустить backend:

```bash
nx serve backend
```

Запустить frontend:

```bash
nx serve frontend
```

При необходимости выполнить проверку проекта:

```bash
nx run-many --all --target=lint
```

Для запуска тестов frontend:

```bash
nx test frontend
```

## Для запуска приложения в режиме production необходимо

Создать docker image backend, frontend:

```bash
nx buildImage backend
```

```bash
nx buildImage frontend
```

Запустить приложение в докере:

```bash
docker compose -f docker-compose.prod.yml up -d
```

Приложение запускается по умолчанию на порту 80: [localhost](http://localhost:80)
