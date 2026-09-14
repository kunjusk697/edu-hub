const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const mentorUser = await prisma.user.upsert({
    where: { email: 'imran.hossen@eduin.global' },
    update: {},
    create: {
      name: 'Imran Hossen',
      email: 'imran.hossen@eduin.global',
      phone: '+8801000000001',
      passwordHash: 'TEMPORARY_PASSWORD',
      roles: ['MENTOR']
    }
  });

  const mentor = await prisma.mentor.upsert({
    where: { userId: mentorUser.id },
    update: {},
    create: { userId: mentorUser.id }
  });

  const extraMentors = [
    { name: 'Asha Rahman', email: 'asha.rahman@eduin.global', tag: 'Hindi' },
    { name: 'James Cole', email: 'james.cole@eduin.global', tag: 'English' },
    { name: 'Nabila Khan', email: 'nabila.khan@eduin.global', tag: 'Bangla' }
  ];

  for (const extra of extraMentors) {
    const user = await prisma.user.upsert({
      where: { email: extra.email },
      update: {},
      create: {
        name: extra.name,
        email: extra.email,
        passwordHash: 'TEMPORARY_PASSWORD',
        roles: ['MENTOR']
      }
    });
    await prisma.mentor.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id }
    });
  }

  let programme = await prisma.programme.findFirst({
    where: { name: 'UX & Web Design' }
  });

  if (!programme) {
    programme = await prisma.programme.create({
      data: {
        name: 'UX & Web Design',
        description: 'Free course for students',
        mentorId: mentor.id
      }
    });
  }

  let course = await prisma.course.findFirst({
    where: { title: 'UX & Web Design Best Master Course' }
  });

  if (!course) {
    course = await prisma.course.create({
      data: {
        title: 'UX & Web Design Best Master Course',
        description: 'UX & Web Design Course',
        programmeId: programme.id,
        fee: 0
      }
    });
  }

  const existingModule = await prisma.module.findFirst({
    where: { courseId: course.id }
  });

  const module =
    existingModule ||
    (await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Studio workshops',
        order: 1
      }
    }));

  const existingSession = await prisma.session.findFirst({
    where: { moduleId: module.id }
  });

  if (!existingSession) {
    const start = new Date();
    start.setDate(start.getDate() + 6);
    start.setHours(14, 30, 0, 0);

    await prisma.session.create({
      data: {
        moduleId: module.id,
        title: 'UX & Web Design Course',
        startsAt: start,
        meetingUrl: 'https://zoom.us/j/eduin-class'
      }
    });
  }

  const existingBatch = await prisma.batch.findFirst({
    where: { name: 'UX Studio Batch A' }
  });

  if (!existingBatch) {
    await prisma.batch.create({
      data: {
        name: 'UX Studio Batch A',
        programmeId: programme.id,
        courseId: course.id,
        mentorId: mentor.id,
        capacity: 25,
        startDate: new Date()
      }
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
