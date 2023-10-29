import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { UserLevel } from '../libs/types/src/lib/user-level.enum';
import { UserTypesTraining } from '../libs/types/src/lib/user-types-training.enum';
import { UserGender } from '../libs/types/src/lib/user-gender.enum';
import { TrainingDuration } from '../libs/types/src/lib/training-duration.enum';
import { trainingGender } from '../libs/types/src/lib/constants/validation.constants';
import { TypeOfPayment } from '../libs/types/src/lib/type-of-payment.enum';
import { UserRole } from '../libs/types/src/lib/user-role.enum';
import { TypeOfOrder } from '../libs/types/src/lib/type-of-order.enum';

const ITEM_COUNT = 100;

const prisma = new PrismaClient();

function createRandomItems() {
  const gender = faker.helpers.enumValue(UserGender);
  const name = faker.person.firstName();
  const email = faker.internet.email();

  const clientBody = {
    timeOfTraining: faker.helpers.enumValue(TrainingDuration),
    caloryLosingPlanTotal: faker.number.int({ min: 1000, max: 5000 }),
    caloryLosingPlanDaily: faker.number.int({ min: 1000, max: 5000 }),
    isReady: faker.helpers.arrayElement([true, false]),
  };

  const trainerBody = {
    certificate: faker.helpers.arrayElement([
      'sertificate1.pdf',
      'sertificate2.pdf',
      'sertificate3.pdf',
    ]),
    merits: faker.lorem.paragraph(1),
    isPersonalTraining: faker.helpers.arrayElement([true, false]),
  };

  const userRole = faker.helpers.enumValue(UserRole);

  const trainingBody = {
    title: faker.lorem.words(2),
    backgroundPicture: faker.image.avatar(),
    levelOfUser: faker.helpers.enumValue(UserLevel),
    typeOfTraining: faker.helpers.enumValue(UserTypesTraining),
    duration: faker.helpers.enumValue(TrainingDuration),
    price: faker.number.int({ min: 0, max: 3000 }),
    caloriesQtt: faker.number.int({ min: 1, max: 10 }),
    description: faker.lorem.paragraph(2),
    createdAt: faker.date.past({ years: 1 }),
    gender: faker.helpers.arrayElement(trainingGender),
    video: faker.helpers.arrayElement([
      'running.mov',
      'boxing.mov',
      'yoga.mov',
      'swimming.mov',
      'jogging.mov',
    ]),
    rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
    trainerId: faker.number.int({ min: 1, max: 10000 }),
    isPromo: faker.helpers.arrayElement([true, false]),
  };

  const feedbackBody = {
    userId: faker.number.int({ min: 1, max: 10000 }),
    trainingId: faker.number.int({ min: 1, max: 10000 }),
    rating: faker.number.int({ min: 1, max: 5 }),
    text: faker.lorem.paragraph(2),
    createdAt: faker.date.past({ years: 1 }),
  };

  const orderBody = {
    userId: faker.number.int({ min: 1, max: 10000 }),
    type: faker.helpers.enumValue(UserTypesTraining),
    trainingId: faker.number.int({ min: 1, max: 10000 }),
    price: faker.number.int({ min: 0, max: 2000 }),
    quantity: faker.number.int({ min: 1, max: 10 }),
    sumPrice: faker.number.int({ min: 0, max: 100000 }),
    typeOfPayment: faker.helpers.enumValue(TypeOfPayment),
    createdAt: faker.date.past({ years: 1 }),
  };

  const personalOrderBody = {
    userId: faker.number.int({ min: 1, max: 10000 }),
    trainerId: faker.number.int({ min: 1, max: 10000 }),
    createdAt: faker.date.past({ years: 1 }),
    updateAt: faker.date.past({ years: 1 }),
    orderStatus: faker.helpers.arrayElement([
      'принят',
      'отклонён',
      'на рассмотрении',
    ]),
  };
  const user = {
    userId: faker.number.int({ min: 1, max: 10000 }),
    avatar: faker.image.avatar(),
    birthDate: faker.date.birthdate(),
    email,
    name,
    gender,
    role: userRole,
    location: faker.helpers.arrayElement([
      'Пионерская',
      'Спортивная',
      'Удельная',
      'Советская',
      'Комсомольская',
    ]),
    level: faker.helpers.enumValue(UserLevel),
    description: faker.lorem.paragraph(4),
    typesOfTraining: faker.helpers.arrayElements(
      ['бокс', 'аэробика', 'стрейчинг', 'фитнес', 'йога', 'бег'],
      { min: 1, max: 3 },
    ),
    passwordHash: faker.internet.password(),
    createdAt: faker.date.past({ years: 1 }),
  };

  return {
    personalOrderBody,
    orderBody,
    feedbackBody,
    trainingBody,
    trainerBody,
    clientBody,
    user,
    userRole,
  };
}

async function fiilDb() {
  // clean db
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.feedback.deleteMany(),
    prisma.order.deleteMany(),
    prisma.personalOrder.deleteMany(),
    prisma.training.deleteMany(),
  ]);

  // create items
  for (let i = 0; i < ITEM_COUNT; i++) {
    const items = createRandomItems();
    const qtt = faker.number.int({ min: 1, max: 10 });
    const priceTemp = faker.number.int({ min: 0, max: 1000 });

    await prisma.user.create({
      data: {
        name: items.user.name,
        email: items.user.email,
        avatar: items.user.avatar,
        passwordHash: items.user.passwordHash,
        gender: items.user.gender,
        birthDate: items.user.birthDate,
        role: items.userRole,
        description: items.user.description,
        location: items.user.location,
        client: {
          create:
            items.userRole === UserRole.Client ? items.clientBody : undefined,
        },
        trainer: {
          create:
            items.userRole === UserRole.Trainer ? items.trainerBody : undefined,
        },
        level: items.user.level,
        typesOfTraining: items.user.typesOfTraining,
        orders: {
          create: [
            {
              type: faker.helpers.enumValue(TypeOfOrder),
              trainingId: ++i,
              price: priceTemp,
              quantity: qtt,
              sumPrice: priceTemp * qtt,
              typeOfPayment: faker.helpers.enumValue(TypeOfPayment),
              createdAt: faker.date.past({ years: 1 }),
            },
            {
              type: faker.helpers.enumValue(TypeOfOrder),
              trainingId: ++i + 1,
              price: priceTemp + 100,
              quantity: qtt + 1,
              sumPrice: priceTemp * qtt,
              typeOfPayment: faker.helpers.enumValue(TypeOfPayment),
              createdAt: faker.date.past({ years: 1 }),
            },
          ],
        },
        personalOrders: {
          create: [
            {
              trainerId: faker.number.int({ min: 1, max: 10000 }),
              createdAt: faker.date.past({ years: 1 }),
              updateAt: faker.date.past({ years: 1 }),
              orderStatus: faker.helpers.arrayElement([
                'принят',
                'отклонен',
                'на рассмотрении',
              ]),
            },
            {
              trainerId: faker.number.int({ min: 1, max: 10000 }),
              createdAt: faker.date.past({ years: 1 }),
              updateAt: faker.date.past({ years: 1 }),
              orderStatus: faker.helpers.arrayElement([
                'принят',
                'отклонен',
                'на рассмотрении',
              ]),
            },
          ],
        },
      },
    });

    await prisma.training.create({
      data: {
        title: items.trainingBody.title,
        backgroundPicture: items.trainingBody.backgroundPicture,
        levelOfUser: items.trainingBody.levelOfUser,
        typeOfTraining: items.trainingBody.typeOfTraining,
        duration: items.trainingBody.duration,
        price: items.trainingBody.price,
        caloriesQtt: items.trainingBody.caloriesQtt,
        description: items.trainingBody.description,
        gender: items.trainingBody.gender,
        video: items.trainingBody.video,
        rating: items.trainingBody.rating,
        trainerId: ++i,
        isPromo: items.trainingBody.isPromo,
        feedbacks: {
          create: [
            {
              userId: ++i,
              rating: items.feedbackBody.rating,
              text: items.feedbackBody.text,
              createdAt: items.feedbackBody.createdAt,
            },
          ],
        },
      },
    });
  }
  console.info('🤘️ Database was filled');
}

fiilDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
