import { UserRole } from '../constants/userRole';

export type User = {
  email: string;
  projects?: [];
  _id: string;
  role: UserRole;
};
