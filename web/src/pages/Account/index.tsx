import { useEffect, useState } from 'react';

import { AccountDTO } from '../../dtos/Account.dto';
import { UserDTO } from '../../dtos/User.dto';
import { api } from '../../utils/api';

import { AccountForm } from '../../components/Forms/AccountForm';
import { AccountTable } from '../../components/Tables/AccountTable';

import arrow from '../../assets/images/arrow.svg';

import { Container, Header } from './styles';

export function Account() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [account, setAccount] = useState<AccountDTO | null>(null);
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

  function handleSubmit(account: AccountDTO, updated: boolean) {
    if (!updated) {
      return setAccounts((prevState) => [...prevState, account]);
    }

    setAccounts((prevState) =>
      prevState.map((account) =>
        account.id === account.id ? account : account
      )
    );

    return setAccount(null);
  }

  function handleSelectAccount(account: AccountDTO) {
    setAccount(account);
  }

  function handleRemoveAccount(accountId: number) {
    setAccounts((prevState) =>
      prevState.filter((account) => account.id !== accountId)
    );
  }

  return (
    <Container>
      <Header>
        {account && <img src={arrow} alt="" onClick={() => setAccount(null)} />}
        <h1>{account?.id ? 'Edição' : 'Cadastro'} de Conta</h1>
      </Header>

      <AccountForm
        users={users}
        account={account}
        accounts={accounts}
        onRegisterAccount={handleSubmit}
      />

      <AccountTable
        accounts={accounts}
        onSelectAccount={handleSelectAccount}
        onRemoveAccount={handleRemoveAccount}
      />
    </Container>
  );
}
