-- CreateEnum
CREATE TYPE "UserRoleType" AS ENUM ('trainer', 'client');

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL DEFAULT '',
    "user_mail" TEXT NOT NULL DEFAULT '',
    "user_avatar" TEXT NOT NULL DEFAULT '',
    "passwordHash" TEXT NOT NULL DEFAULT '',
    "user_gender" TEXT NOT NULL DEFAULT '',
    "birth_date" TEXT NOT NULL DEFAULT '',
    "user_role" "UserRoleType" NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "backgraund_picture" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_level" TEXT NOT NULL DEFAULT '',
    "types_of_traning" TEXT[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "clients" (
    "client_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "time_of_training" TEXT NOT NULL DEFAULT '',
    "calory_losing_plan_total" INTEGER NOT NULL DEFAULT 0,
    "calory_losing_plan_daily" INTEGER NOT NULL DEFAULT 0,
    "readiness_for_training" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("client_id")
);

-- CreateTable
CREATE TABLE "trainers" (
    "trainer_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "sertificat" TEXT NOT NULL,
    "merit" TEXT NOT NULL DEFAULT '',
    "personal_training" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "trainers_pkey" PRIMARY KEY ("trainer_id")
);

-- CreateTable
CREATE TABLE "trainings" (
    "training_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "backgraund_picture" TEXT NOT NULL DEFAULT '',
    "level_of_user" TEXT NOT NULL DEFAULT '',
    "type_of_training" TEXT NOT NULL DEFAULT '',
    "duration" TEXT NOT NULL DEFAULT '',
    "price" INTEGER NOT NULL DEFAULT 0,
    "calories_qtt" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "training_gender" TEXT NOT NULL DEFAULT '',
    "video" TEXT NOT NULL DEFAULT '',
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "trainerId" INTEGER NOT NULL DEFAULT 0,
    "is_promo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("training_id")
);

-- CreateTable
CREATE TABLE "user_balances" (
    "user_balance_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "training_id" INTEGER NOT NULL,
    "training_qtt" INTEGER NOT NULL,

    CONSTRAINT "user_balances_pkey" PRIMARY KEY ("user_balance_id")
);

-- CreateTable
CREATE TABLE "feed_backs" (
    "feedback_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "training_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "text" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feed_backs_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "order_trainings" (
    "order_traiding_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "typeOfOrder" TEXT NOT NULL DEFAULT '',
    "training_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "typeOfPayment" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_trainings_pkey" PRIMARY KEY ("order_traiding_id")
);

-- CreateTable
CREATE TABLE "personal_order_trainings" (
    "personal_order_training_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "trainer_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderCondition" TEXT NOT NULL,

    CONSTRAINT "personal_order_trainings_pkey" PRIMARY KEY ("personal_order_training_id")
);

-- CreateTable
CREATE TABLE "refresh_token_stores" (
    "refresh_token_id" SERIAL NOT NULL,
    "token_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_token_stores_pkey" PRIMARY KEY ("refresh_token_id")
);

-- CreateTable
CREATE TABLE "user_friends" (
    "user_friend_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "friend_id" INTEGER NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_friends_pkey" PRIMARY KEY ("user_friend_id")
);

-- CreateTable
CREATE TABLE "files" (
    "file_id" SERIAL NOT NULL,
    "hashName" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("file_id")
);

-- CreateTable
CREATE TABLE "subscribers" (
    "subscriber_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trainer_id" INTEGER NOT NULL,

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("subscriber_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "notification_id" SERIAL NOT NULL,
    "target_user_id" INTEGER NOT NULL,
    "typesOfNotification" TEXT NOT NULL,
    "asking_user_id" INTEGER NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_mail_key" ON "users"("user_mail");

-- CreateIndex
CREATE UNIQUE INDEX "clients_user_id_key" ON "clients"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "trainers_user_id_key" ON "trainers"("user_id");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainers" ADD CONSTRAINT "trainers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_balances" ADD CONSTRAINT "user_balances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feed_backs" ADD CONSTRAINT "feed_backs_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("training_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_trainings" ADD CONSTRAINT "order_trainings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_order_trainings" ADD CONSTRAINT "personal_order_trainings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_friends" ADD CONSTRAINT "user_friends_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
