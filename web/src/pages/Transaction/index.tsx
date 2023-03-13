import { useCallback, useEffect, useState } from 'react';

import { api } from '../../utils/api';

import { TransactionTable } from '../../components/Tables/TransactionTable';
import { TransactionDTO } from '../../dtos/Transaction.dto';

import { TransactionForm } from '../../components/Forms/TransactionsForm';
import { AccountDTO } from '../../dtos/Account.dto';
import { UserDTO } from '../../dtos/User.dto';
import { Container } from './styles';

export function Transaction() {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

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

  const handleSelectAccount = useCallback(async (accountId: number) => {
    const { data } = await api.get(`/transactions/by-account`, {
      params: {
        accountId,
      },
    });

    setTransactions(data);
  }, []);

  function handleRegisterTransaction(transaction: TransactionDTO) {
    setTransactions((prevState) => [transaction, ...prevState]);
  }

  return (
    <Container>
      <h1>Cadastro de Movimentação</h1>

      <TransactionForm
        users={users}
        accounts={accounts}
        onSelectAccount={handleSelectAccount}
        onRegisterTransaction={handleRegisterTransaction}
      />

      <TransactionTable transactions={transactions} />
    </Container>
  );
}
