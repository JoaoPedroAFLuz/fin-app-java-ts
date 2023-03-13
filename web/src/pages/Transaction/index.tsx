import { useCallback, useEffect, useState } from 'react';

import { api } from '../../utils/api';

import { TransactionTable } from '../../components/Tables/TransactionTable';
import { TransactionDTO } from '../../dtos/Transaction.dto';

import { TransactionForm } from '../../components/Forms/TransactionsForm';
import { AccountDTO } from '../../dtos/Account.dto';
import { UserDTO } from '../../dtos/User.dto';
import { Balance, Container } from './styles';
import { formatCurrency } from '../../utils/formatCurrency';

export function Transaction() {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
  const [balance, setBalance] = useState(0);

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

    const transactionsBalance = data.reduce(
      (acc: number, current: TransactionDTO) => (acc += current.value),
      0
    );

    setBalance(transactionsBalance);

    setTransactions(data);
  }, []);

  function handleRegisterTransaction(transaction: TransactionDTO) {
    setTransactions((prevState) => [transaction, ...prevState]);
    setBalance((prevState) => prevState + transaction.value);
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

      {transactions.length > 0 && (
        <Balance>Saldo: {formatCurrency(balance)}</Balance>
      )}

      <TransactionTable transactions={transactions} />
    </Container>
  );
}
