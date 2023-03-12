import { UserDTO } from './User.dto';

export interface AccountDTO {
  id: number;
  registrationCode: number;
  user: UserDTO;
  balance: number;
}
