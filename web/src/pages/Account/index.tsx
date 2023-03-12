import { useEffect, useState } from 'react';

import { applyCPFMask } from '../../utils/applyCPFMask';
import { api } from '../../utils/api';

import { AccountDTO } from '../../dtos/Account.dto';
import { UserDTO } from '../../dtos/User.dto';

import { AccountForm } from '../../components/Forms/AccountForm';

import { Container } from './styles';
import { AccountTable } from '../../components/Tables/AccountTable';

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

  function handleRegisterAccount(account: AccountDTO) {
    setAccounts((prevState) => [...prevState, account]);
  }

  function handleRemoveAccount(accountId: number) {
    setAccounts((prevState) =>
      prevState.filter((account) => account.id !== accountId)
    );
  }

  return (
    <Container>
      <h1>Cadastro de Conta</h1>

      <AccountForm users={users} onRegisterAccount={handleRegisterAccount} />

      <AccountTable accounts={accounts} onRemoveAccount={handleRemoveAccount} />
    </Container>
  );
}
