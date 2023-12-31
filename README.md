<!--toc:start-->

- [FitFriends](#fitfriends)
- [Серверная часть проекта (Backend).](#серверная-часть-проекта-backend)
  - [Все команды выполняются из корневого каталога проекта.](#все-команды-выполняются-из-корневого-каталога-проекта)
  - [Для запуска необходимо:](#для-запуска-необходимо)
  - [По умолчанию сервер запускается на порту 4000.](#по-умолчанию-сервер-запускается-на-порту-4000)
  - [API: <http://localhost:4000/spec>](#api-httplocalhost4000spec)
- [Клиентская часть проекта.](#клиентская-часть-проекта)
  - [По умолчанию клиент запускается на порту 4200.](#по-умолчанию-клиент-запускается-на-порту-4200)
  - [<http://localhost:4200>](#httplocalhost4200)
  <!--toc:end-->

# FitFriends

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **"Этот проект создан с помощью " [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

# Серверная часть проекта (Backend)

## Все команды выполняются из корневого каталога проекта

## Для запуска необходимо

1. Инсталлировать все библиотеки:

   $ `npm install`

2. Создать .env файл в корневом каталоге проекта.
   Скопировав содержимое из файла .env-example

3. Запустить в докере базу данных, почтовый сервер и администратор базы данных:

   $`docker compose -f docker-compose.dev.yml up -d`

4. Инициализировать базу данных:

   $ `npx prisma migrate dev`

5. Наполнить базу данных:

   $ `npx ts-node ./prisma/seed.ts`

6. Произвести проверку проекта:

   $ `nx run-many --all --target=lint`

7. Запустить сервер:

   $ `nx serve backend`

## По умолчанию сервер запускается на порту 4000

## API: <http://localhost:4000/spec>

# Клиентская часть проекта

1. Создать .env файл в каталоге frontend.
   Скопировав содержимое из файла apps/frontend/.env-example

2. Запустить клиентскую часть проекта (Frontend):

   $ `nx serve frontend`

## По умолчанию клиент запускается на порту 4200

## [http://localhost:4200](http://localhost:4200)
