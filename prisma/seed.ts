import { Role } from '../src/generated/prisma/enums';
import { PrismaService } from '../src/prisma.service';

const prisma = new PrismaService();

async function main() {
  const adminEmail = 'admin@example.com';
  const adminUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  if (!adminUser) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: 'password',
        role: Role.ADMIN,
      },
    });
    console.log('Admin created');
  }
}

main();
