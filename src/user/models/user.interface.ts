import { UserRole } from './user.entity';

export interface iUser {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
