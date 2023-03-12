import { UserDTO } from './User.dto';

export interface AccountDTO {
  id: number;
  registrationCode: number;
  User: UserDTO;
  balance: number;
}
