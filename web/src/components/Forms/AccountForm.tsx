import { useState } from 'react';
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
  onRegisterAccount: (account: AccountDTO) => void;
}

export function AccountForm({ users, onRegisterAccount }: AccountFormProps) {
  const [userId, setUserId] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();

  const hasEmptyField = !userId || !registrationCode;

  const isFormValid = !hasEmptyField && errors.length === 0;

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

      const account: NewAccountDTO = {
        userId: Number(userId),
        registrationCode: Number(registrationCode),
      };

      const { data: accountResponse } = await api.post('/accounts', account);

      onRegisterAccount(accountResponse);
    } catch {
      console.log('Erro ao cadastrar contar');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('user')}>
        <Select
          value={userId}
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
