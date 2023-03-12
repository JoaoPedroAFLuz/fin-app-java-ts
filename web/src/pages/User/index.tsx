import { useEffect, useState } from 'react';

import { UserForm } from '../../components/UserForm';
import { UserTable } from '../../components/UserTable';
import { UserDTO } from '../../dtos/User.dto';
import { api } from '../../utils/api';
import { applyCPFMask } from '../../utils/applyCPFMask';

import { Container } from './styles';

export function User() {
  const [users, setUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');

      response.data.map((user: UserDTO) => (user.cpf = applyCPFMask(user.cpf)));

      setUsers(response.data);
    }

    loadUsers();
  }, []);

  function setNewUser(user: UserDTO) {
    setUsers((prevState) => [...prevState, user]);
  }

  function removeUser(userId: number) {
    setUsers((prevState) => prevState.filter((user) => user.id !== userId));
  }

  return (
    <Container>
      <h1>Cadastro de Pessoa</h1>

      <UserForm onRegisterUser={setNewUser} />

      <UserTable users={users} onRemoveUser={removeUser} />
    </Container>
  );
}
