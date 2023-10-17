import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.userEntity.upsert({
    where: { userId: 100 },
    update: {},
    create: {
      userId: 100,
      name: 'Макеев',
      email: 'makeev@gmail.com',
      avatar: 'avatar.jpg',
      passwordHash: 'ldldlkkkksss',
      gender: 'мужской',
      role: 'client',
      description: 'Только собираюсь начать заниматься',
      location: 'Пионерская',
      client: {
        create: {
          timeOfTraining: '10-30 мин',
          caloryLosingPlanTotal: 1000,
          caloryLosingPlanDaily: 1500,
          isTrainingReadiness: true,
        },
      },
      backgraundPicture: 'backgraundPicture.jpg',
      level: 'новичок',
      typesOfTraining: ['йога'],
      orders: {
        create: [
          {
            typeOfOrder: 'абонемент',
            trainingId: 101,
            price: 1900,
            quantity: 1000,
            typeOfPayment: 'visa',
          },
        ],
      },
    },
  });
  await prisma.userEntity.upsert({
    where: { userId: 102 },
    update: {},
    create: {
      userId: 102,
      name: 'Петров',
      email: 'petrov@gmail.com',
      avatar: 'avatar1.jpg',
      passwordHash: 'kk33j3j332',
      gender: 'мужской',
      role: 'trainer',
      description: 'Очень люблю свою работу!',
      location: 'Удельная',
      trainer: {
        create: {
          sertificat: 'sertificat.pdf',
          merit: '1000',
          isPersonalTraining: true,
        },
      },
      backgraundPicture: 'backgraundPicture1.jpg',
      level: 'профессионал',
      typesOfTraining: ['кроссфит'],
    },
  });
  await prisma.userEntity.upsert({
    where: { userId: 103 },
    update: {},
    create: {
      userId: 103,
      name: 'Stepanova',
      email: 'Stepanova@gmail.com',
      avatar: 'avatar11.jpg',
      passwordHash: 'asdfa1sdfasdf',
      gender: 'женский',
      role: 'trainer',
      description: 'На моих тренировках получите массу ощущений!',
      location: 'Петроградская',
      trainer: {
        create: {
          sertificat: 'sertificate2.pdf',
          merit: 'descriptionsome',
          isPersonalTraining: false,
        },
      },
      backgraundPicture: 'backgraunure1.jpg',
      level: 'профессионал',
      typesOfTraining: ['стрейчинг', 'бокс'],
    },
  });
  await prisma.userEntity.upsert({
    where: { userId: 14 },
    update: {},
    create: {
      userId: 14,
      name: 'Бурков',
      email: 'burkov@gmail.com',
      avatar: 'avatar5.jpg',
      passwordHash: '333ll28',
      gender: 'мужской',
      role: 'client',
      description: 'Что то я сильно расслабился! Надо бы поднажать',
      location: 'Пионерская',
      client: {
        create: {
          timeOfTraining: '80-100 мин',
          caloryLosingPlanTotal: 1000,
          caloryLosingPlanDaily: 1500,
          isTrainingReadiness: true,
        },
      },
      backgraundPicture: 'bgraund3.jpg',
      level: 'профессионал',
      typesOfTraining: ['бокс'],
    },
  });
  await prisma.userEntity.upsert({
    where: { userId: 105 },
    update: {},
    create: {
      userId: 105,
      name: 'Марков',
      email: 'markov@gmail.com',
      avatar: 'avatar45.jpg',
      passwordHash: '338891938d',
      gender: 'мужской',
      role: 'client',
      description: 'С нового года обязательно начну!',
      location: 'Спортивная',
      client: {
        create: {
          timeOfTraining: '80-100 мин',
          caloryLosingPlanTotal: 1000,
          caloryLosingPlanDaily: 1500,
          isTrainingReadiness: true,
        },
      },
      backgraundPicture: 'bgraund33.jpg',
      level: 'любитель',
      typesOfTraining: ['стрейчинг', 'аэробика'],
    },
  });
  await prisma.trainingEntity.upsert({
    where: { trainingId: 101 },
    update: {},
    create: {
      trainingId: 101,
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
            userId: 12,
            rating: 3,
            text: 'Часто тут бываю',
          },
          {
            userId: 13,
            rating: 4,
            text: 'Сегодня было особено хорошо',
          },
        ],
      },
    },
  });
  await prisma.trainingEntity.upsert({
    where: { trainingId: 107 },
    update: {},
    create: {
      trainingId: 7,
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
