import { useEffect, useState } from 'react';

import { api } from '../../utils/api';

import { AccountDTO } from '../../dtos/Account.dto';
import { UserDTO } from '../../dtos/User.dto';

import { AccountForm } from '../../components/Forms/AccountForm';

import { AccountTable } from '../../components/Tables/AccountTable';
import { Container } from './styles';

export function Account() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [accounts, setAccounts] = useState<AccountDTO[]>([]);

  useEffect(() => {
    async function loadData() {
      const [{ data: usersResponseData }, { data: AccountsResponseData }] =
        await Promise.all([api.get('/users'), api.get('/accounts')]);

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

      <AccountForm
        users={users}
        accounts={accounts}
        onRegisterAccount={handleRegisterAccount}
      />

      <AccountTable accounts={accounts} onRemoveAccount={handleRemoveAccount} />
    </Container>
  );
}
