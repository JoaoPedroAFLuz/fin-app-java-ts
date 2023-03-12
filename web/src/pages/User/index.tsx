import { useEffect, useState } from 'react';

import { api } from '../../utils/api';

import { UserDTO } from '../../dtos/User.dto';

import { UserForm } from '../../components/Forms/UserForm';
import { UserTable } from '../../components/Tables/UserTable';

import { Container } from './styles';

export function User() {
  const [users, setUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');

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
