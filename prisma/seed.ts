import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.user.upsert({
    where: { userId: 1 },
    update: {},
    create: {
      userId: 1,
      name: 'Макеев',
      email: 'makeev@gmail.com',
      avatar: 'avatar.jpg',
      passwordHash: 'ldldlkkkksss',
      gender: 'мужской',
      birthDate: '25.01.1974',
      role: 'пользователь',
      description: 'Только собираюсь начать заниматься',
      location: 'Пионерская',
      client: {
        create: {
          timeOfTraining: '10-30 мин',
          caloryLosingPlanTotal: 1000,
          caloryLosingPlanDaily: 1500,
          isReady: true,
        },
      },
      level: 'новичок',
      typesOfTraining: ['йога', 'бег'],
      orders: {
        create: [
          {
            typeOfOrder: 'абонемент',
            trainingId: 7,
            price: 1900,
            quantity: 1000,
            typeOfPayment: 'visa',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { userId: 2 },
    update: {},
    create: {
      userId: 2,
      name: 'Петров',
      email: 'petrov@gmail.com',
      avatar: 'avatar1.jpg',
      passwordHash: 'kk33j3j332',
      gender: 'мужской',
      role: 'тренер',
      description: 'Очень люблю свою работу!',
      location: 'Удельная',
      trainer: {
        create: {
          certificate: 'sertificat.pdf',
          merits: 'Лучший тренер года.',
          isPersonalTraining: true,
        },
      },
      level: 'профессионал',
      typesOfTraining: ['кроссфит'],
    },
  });
  await prisma.user.upsert({
    where: { userId: 3 },
    update: {},
    create: {
      userId: 3,
      name: 'Stepanova',
      email: 'Stepanova@gmail.com',
      avatar: 'avatar11.jpg',
      passwordHash: 'asdfa1sdfasdf',
      gender: 'женский',
      role: 'тренер',
      description: 'На моих тренировках получите массу ощущений!',
      location: 'Петроградская',
      trainer: {
        create: {
          certificate: 'sertificate2.pdf',
          merits: 'descriptionsome',
          isPersonalTraining: false,
        },
      },
      level: 'профессионал',
      typesOfTraining: ['стрейчинг', 'бокс'],
    },
  });
  await prisma.user.upsert({
    where: { userId: 4 },
    update: {},
    create: {
      userId: 4,
      name: 'Бурков',
      email: 'burkov@gmail.com',
      avatar: 'avatar5.jpg',
      passwordHash: '333ll28',
      gender: 'мужской',
      role: 'пользователь',
      description: 'Что то я сильно расслабился! Надо бы поднажать',
      location: 'Пионерская',
      client: {
        create: {
          timeOfTraining: '80-100 мин',
          caloryLosingPlanTotal: 1000,
          caloryLosingPlanDaily: 1500,
          isReady: true,
        },
      },
      level: 'профессионал',
      typesOfTraining: ['бокс'],
    },
  });
  await prisma.user.upsert({
    where: { userId: 5 },
    update: {},
    create: {
      userId: 5,
      name: 'Марков',
      email: 'markov@gmail.com',
      avatar: 'avatar45.jpg',
      passwordHash: '338891938d',
      gender: 'мужской',
      role: 'пользователь',
      description: 'С нового года обязательно начну!',
      location: 'Спортивная',
      client: {
        create: {
          timeOfTraining: '80-100 мин',
          caloryLosingPlanTotal: 1000,
          caloryLosingPlanDaily: 1500,
          isReady: true,
        },
      },
      level: 'любитель',
      typesOfTraining: ['стрейчинг', 'аэробика'],
    },
  });
  await prisma.training.upsert({
    where: { id: 10 },
    update: {},
    create: {
      id: 10,
      title: 'Пробежка вечерком',
      backgroundPicture: 'bground12.jpg',
      levelOfUser: 'профессионал',
      typeOfTraining: 'бег',
      duration: '80-100 мин',
      price: 1000,
      caloriesQtt: 1000,
      description: 'Ежедневно, групой в парке отдыха',
      trainingGender: 'для всех',
      video: 'running.mov',
      rating: 2,
      trainerId: 3,
      isPromo: true,
      feedbacks: {
        create: [
          {
            userId: 1,
            rating: 3,
            text: 'Часто тут бываю',
          },
          {
            userId: 3,
            rating: 4,
            text: 'Сегодня было особено хорошо',
          },
        ],
      },
    },
  });
  await prisma.training.upsert({
    where: { id: 7 },
    update: {},
    create: {
      id: 7,
      title: 'йога, кому за 30',
      backgroundPicture: 'bground99.jpg',
      levelOfUser: 'профессионал',
      typeOfTraining: 'йога',
      duration: '80-100 мин',
      price: 1000,
      caloriesQtt: 1000,
      description: 'Сегодня расстянем шею и спину',
      trainingGender: 'для всех',
      video: 'yoga.mov',
      rating: 3,
      trainerId: 3,
      isPromo: true,
    },
  });
  console.info('🤘️ Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
