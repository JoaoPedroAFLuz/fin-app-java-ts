import { useState } from 'react';
import { TransactionDTO } from '../../dtos/Transaction.dto';
import { NewTransactionDTO } from '../../dtos/NewTransaction.dto';

import { UserDTO } from '../../dtos/User.dto';

import { useErrors } from '../../hooks/useErrors';
import { api } from '../../utils/api';

import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { Input } from '../Input';
import { Select } from '../Select';

import { ButtonContainer, Form } from './styles';
import { AccountDTO } from '../../dtos/Account.dto';
import { formatCurrency } from '../../utils/formatCurrency';
import { applyCPFMask } from '../../utils/applyCPFMask';

interface TransactionFormProps {
  users: UserDTO[];
  accounts: AccountDTO[];
  onSelectAccount: (accountId: number) => void;
  onRegisterTransaction: (transaction: TransactionDTO) => void;
}

export function TransactionForm({
  users,
  onSelectAccount,
  onRegisterTransaction,
}: TransactionFormProps) {
  const [userId, setUserId] = useState('');
  const [accounts, setAccounts] = useState<AccountDTO[]>([]);
  const [accountId, setAccountId] = useState('');
  const [transactionValue, setTransactionValue] = useState('');
  const [transactionType, setTransactionType] = useState<
    'CREDIT' | 'DEBIT' | ''
  >('');

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();

  const hasEmptyField =
    !userId || !accountId || !transactionValue || !transactionType;

  const isFormValid = !hasEmptyField && errors.length === 0;

  async function handleSelectUser(userId: string) {
    setUserId(userId);

    handleSelectAccount('');

    const { data } = await api.get(`/accounts/by-user`, {
      params: {
        userId: Number(userId),
      },
    });

    setAccounts(data);
  }

  async function handleSelectAccount(accountId: string) {
    setAccountId(accountId);
    onSelectAccount(Number(accountId));
  }

  function handleTransactionValueChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;

    setTransactionValue(value);

    if (!value) {
      setError({
        field: 'transactionValue',
        message: 'Valor da movimentação é obrigatório',
      });
    } else {
      removeError({ field: 'transactionValue' });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const currentAccount = accounts.find(
        (account) => account.id === Number(accountId)
      );

      if (transactionType === '' || !currentAccount) {
        return;
      }

      if (
        transactionType === 'DEBIT' &&
        Number(transactionValue) > currentAccount.balance
      ) {
        return alert('Saldo insuficiente');
      }

      const transaction: NewTransactionDTO = {
        accountId: Number(accountId),
        type: transactionType,
        value: Number(transactionValue),
      };

      const { data: transactionResponse } = await api.post(
        '/transactions',
        transaction
      );

      onRegisterTransaction(transactionResponse);
      clearFields();
    } catch {
      console.log('Erro ao cadastrar movimentação');
    }
  }

  function clearFields() {
    setUserId('');
    setAccountId('');
    setTransactionValue('');
    setTransactionType('');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('user')}>
        <Select
          value={userId}
          onChange={(event) => handleSelectUser(event.target.value)}
        >
          <option value="" placeholder="Selecione uma pessoa *">
            Selecione uma pessoa *
          </option>
          {users?.length > 0 &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {applyCPFMask(user.cpf)}
              </option>
            ))}
        </Select>
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('account')}>
        <Select
          value={accountId}
          onChange={(event) => handleSelectAccount(event.target.value)}
        >
          <option value="" placeholder="Selecione uma conta *">
            Selecione uma conta *
          </option>
          {accounts?.length > 0 &&
            accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.registrationCode} - {formatCurrency(account.balance)}
              </option>
            ))}
        </Select>
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('transactionValue')}>
        <Input
          title="Valor"
          type="number"
          placeholder="Valor *"
          value={transactionValue}
          onChange={handleTransactionValueChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('transactionType')}>
        <Select
          value={transactionType}
          onChange={(event) =>
            setTransactionType(event.target.value as 'CREDIT' | 'DEBIT')
          }
        >
          <option value="" placeholder="Depositar / Sacar *">
            Depositar / Sacar *
          </option>

          <option value="CREDIT" placeholder="Depositar">
            Depositar
          </option>

          <option value="DEBIT" placeholder="Sacar *">
            Sacar
          </option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button disabled={!isFormValid}>Salvar</Button>
      </ButtonContainer>
    </Form>
  );
}
