import { useState } from 'react';

import { NewUserDTO } from '../../dtos/NewUser.dtos';

import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { Input, InputMask } from '../Input';

import { ButtonContainer, Form } from './styles';

export function UserForm() {
  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  function handleNameChange(envent: React.ChangeEvent<HTMLInputElement>) {
    setName(envent.target.value);
  }

  function handleCPFChange(envent: React.ChangeEvent<HTMLInputElement>) {
    let { value } = envent.target;

    value = value.replace(/\D/g, '');

    setCPF(value);
  }

  function handleEmailChange(envent: React.ChangeEvent<HTMLInputElement>) {
    setEmail(envent.target.value);
  }

  function handleAddressChange(envent: React.ChangeEvent<HTMLInputElement>) {
    setAddress(envent.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user: NewUserDTO = {
      name,
      cpf,
      email,
      address,
    };

    console.log(user);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error="Nome é obrigatório">
        <Input value={name} onChange={handleNameChange} title="Nome" />
      </FormGroup>

      <FormGroup error="CPF é obrigatório">
        <InputMask
          mask="999.999.999-99"
          value={cpf}
          onChange={handleCPFChange}
          title="CPF"
        />
      </FormGroup>

      <FormGroup error="Email é obrigatório">
        <Input value={email} onChange={handleEmailChange} title="Email" />
      </FormGroup>

      <FormGroup error="Endereço é obrigatório">
        <Input value={address} onChange={handleAddressChange} title="Nome" />
      </FormGroup>

      <ButtonContainer>
        <Button>Salvar</Button>
      </ButtonContainer>
    </Form>
  );
}
