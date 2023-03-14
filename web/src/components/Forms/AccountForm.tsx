import { useEffect, useState } from 'react';
import { AccountDTO } from '../../dtos/Account.dto';
import { NewAccountDTO } from '../../dtos/NewAccount.dto';

import { UserDTO } from '../../dtos/User.dto';

import { useErrors } from '../../hooks/useErrors';
import { api } from '../../utils/api';
import { applyCPFMask } from '../../utils/applyCPFMask';

import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { Input } from '../Input';
import { Select } from '../Select';

import { ButtonContainer, Form } from './styles';

interface AccountFormProps {
  users: UserDTO[];
  account: AccountDTO | null;
  accounts: AccountDTO[];
  onRegisterAccount: (account: AccountDTO, updated: boolean) => void;
}

export function AccountForm({
  users,
  account,
  accounts,
  onRegisterAccount,
}: AccountFormProps) {
  const [userId, setUserId] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();

  const hasEmptyField = !userId || !registrationCode;

  const isFormValid = !hasEmptyField && errors.length === 0;

  useEffect(() => {
    if (account) {
      setUserId(account.user.id.toString());
      setRegistrationCode(account.registrationCode.toString());
    }
  }, [account]);

  function handleRegistrationCodeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;

    setRegistrationCode(value);

    if (!value) {
      setError({
        field: 'registrationCode',
        message: 'Número da conta é obrigatório',
      });
    } else {
      removeError({ field: 'registrationCode' });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      if (!account?.id) {
        registerAccount();
      } else {
        updateAccount();
      }
    } catch {
      console.log('Erro ao cadastrar contar');
    }
  }

  async function registerAccount() {
    const registrationCodeAlreadyExists = accounts.some(
      (account) => account.registrationCode === Number(registrationCode)
    );
    if (registrationCodeAlreadyExists) {
      return alert('Número da conta já cadastrado');
    }

    const account: NewAccountDTO = {
      userId: Number(userId),
      registrationCode: Number(registrationCode),
    };

    const { data: accountResponse } = await api.post('/accounts', account);

    onRegisterAccount(accountResponse, false);
  }

  async function updateAccount() {
    const { data } = await api.put(`/accounts/${account?.id}`, account);

    onRegisterAccount(data, true);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('user')}>
        <Select
          value={userId}
          disabled={!!account?.id}
          onChange={(event) => setUserId(event.target.value)}
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

      <FormGroup error={getErrorMessageByFieldName('registrationCode')}>
        <Input
          title="Número da Conta"
          type="number"
          placeholder="Número da Conta *"
          value={registrationCode}
          onChange={handleRegistrationCodeChange}
        />
      </FormGroup>

      <ButtonContainer>
        <Button disabled={!isFormValid}>Salvar</Button>
      </ButtonContainer>
    </Form>
  );
}
