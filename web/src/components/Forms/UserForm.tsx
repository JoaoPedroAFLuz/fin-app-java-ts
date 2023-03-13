import { useState } from 'react';

import { NewUserDTO } from '../../dtos/NewUser.dtos';
import { useErrors } from '../../hooks/useErrors';
import { isEmailValid } from '../../utils/isEmailValid';

import { api } from '../../utils/api';

import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { Input, InputMask } from '../Input';

import { ButtonContainer, Form } from './styles';
import { UserDTO } from '../../dtos/User.dto';
import { capitalizeWords } from '../../utils/capitalizeWords';

interface UserFormProps {
  users: UserDTO[];
  onRegisterUser: (user: UserDTO) => void;
}

export function UserForm({ users, onRegisterUser }: UserFormProps) {
  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();

  const hasEmptyField = !name || !cpf || !email || !address;

  const isFormValid = !hasEmptyField && errors.length === 0;

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setName(value);

    if (!value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError({ field: 'name' });
    }
  }

  function handleCPFChange(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, '');
    setCPF(value);

    if (!value || value.length !== 11) {
      setError({ field: 'cpf', message: 'CPF é obrigatório' });
    } else {
      removeError({ field: 'cpf' });
    }
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setEmail(value);

    if (!value || !isEmailValid(value)) {
      setError({ field: 'email', message: 'Email é obrigatório' });
    } else {
      removeError({ field: 'email' });
    }
  }

  function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (!value) {
      setError({ field: 'address', message: 'Endereço é obrigatório' });
    } else {
      removeError({ field: 'address' });
    }

    setAddress(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const cpfAlreadyExists = users.some((user) => user.cpf === cpf);
      if (cpfAlreadyExists) {
        return alert('CPF já cadastrado');
      }

      const emailAlreadyExists = users.some((user) => user.email === email);
      if (emailAlreadyExists) {
        return alert('Email já cadastrado');
      }

      const user: NewUserDTO = {
        name: capitalizeWords(name),
        cpf,
        email,
        address,
      };

      const response = await api.post('/users', user);

      onRegisterUser(response.data as UserDTO);
    } catch {
      console.log('Erro ao cadastrar usuário');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          title="Nome"
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('cpf')}>
        <InputMask
          title="CPF"
          placeholder="CPF *"
          mask="999.999.999-99"
          value={cpf}
          onChange={handleCPFChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          title="Email"
          placeholder="Email *"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('address')}>
        <Input
          title="Nome"
          placeholder="Endereço *"
          value={address}
          onChange={handleAddressChange}
        />
      </FormGroup>

      <ButtonContainer>
        <Button disabled={!isFormValid}>Salvar</Button>
      </ButtonContainer>
    </Form>
  );
}
