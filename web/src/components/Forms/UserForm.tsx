/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';

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
  user: UserDTO | null;
  users: UserDTO[];
  onSubmit: (user: UserDTO, updated: boolean) => void;
}

export function UserForm({ user, users, onSubmit }: UserFormProps) {
  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();

  const hasEmptyField = !name || !cpf || !email || !address;

  const isFormValid = !hasEmptyField && errors.length === 0;

  useEffect(() => {
    setName(user?.name || '');
    setCPF(user?.cpf || '');
    setEmail(user?.email || '');
    setAddress(user?.address || '');
  }, [user]);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;

    value = value.replace(/\d/g, '');

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

      if (!user?.id) {
        registerUser();
      } else {
        updateUser();
      }

      clearFields();
    } catch {
      console.log('Erro ao salvar usuário');
    }
  }

  async function registerUser() {
    const cpfAlreadyExists = users.some((user) => user.cpf === cpf);
    if (cpfAlreadyExists) {
      return alert('CPF já cadastrado');
    }

    const emailAlreadyExists = users.some((user) => user.email === email);
    if (emailAlreadyExists) {
      return alert('Email já cadastrado');
    }

    const user: NewUserDTO = {
      name: capitalizeWords(name!),
      cpf: cpf!,
      email: email!,
      address: address!,
    };

    const { data } = await api.post('/users', user);

    onSubmit(data, false);
  }

  async function updateUser() {
    const userDTO: UserDTO = {
      id: user!.id,
      name: capitalizeWords(name!),
      cpf: cpf!,
      email: email!,
      address: address!,
    };

    const { data } = await api.put(`/users/${user!.id}`, userDTO);

    onSubmit(data, true);
  }

  function clearFields() {
    setName('');
    setCPF('');
    setEmail('');
    setAddress('');
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
          disabled={!!user?.id}
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
