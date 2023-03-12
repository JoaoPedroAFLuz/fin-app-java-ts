import { useEffect, useState } from 'react';
import { AccountForm } from '../../components/Forms/AccountForm';
import { AccountDTO } from '../../dtos/Account.dto';
import { UserDTO } from '../../dtos/User.dto';
import { api } from '../../utils/api';
import { applyCPFMask } from '../../utils/applyCPFMask';
import { Container } from './styles';

export function Account() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [accounts, setAccounts] = useState<AccountDTO[]>([]);

  useEffect(() => {
    async function loadData() {
      const [{ data: usersResponseData }, { data: AccountsResponseData }] =
        await Promise.all([api.get('/users'), api.get('/accounts')]);

      usersResponseData.forEach(
        (user: UserDTO) => (user.cpf = applyCPFMask(user.cpf))
      );

      setUsers(usersResponseData);
      setAccounts(AccountsResponseData);
    }

    loadData();
  }, []);

  return (
    <Container>
      <h1>Cadastro de Conta</h1>

      <AccountForm users={users} />
    </Container>
  );
}
