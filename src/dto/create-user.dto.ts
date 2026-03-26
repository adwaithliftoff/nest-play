import { Role } from "src/generated/prisma/enums";

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  role?: Role;
}
