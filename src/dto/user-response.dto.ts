import { Role } from 'src/generated/prisma/enums';

export class UserResponseDto {
  id: number;
  email: string;
  name: string | null;
  role: Role;
}
