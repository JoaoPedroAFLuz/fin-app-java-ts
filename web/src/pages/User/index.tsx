import { useEffect, useState } from 'react';

import { api } from '../../utils/api';
import { UserDTO } from '../../dtos/User.dto';

import { UserForm } from '../../components/Forms/UserForm';
import { UserTable } from '../../components/Tables/UserTable';

import arrow from '../../assets/images/arrow.svg';

import { Container, Header } from './styles';

export function User() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');

      setUsers(response.data);
    }

    loadUsers();
  }, []);

  function handleSelectUser(user: UserDTO) {
    setUser(user);
  }

  function handleSubmit(userDto: UserDTO, updated: boolean) {
    if (!updated) {
      return setUsers((prevState) => [...prevState, userDto]);
    }

    setUsers((prevState) =>
      prevState.map((user) => (user.id === userDto.id ? userDto : user))
    );

    return setUser(null);
  }

  function handleRemoveUser(userId: number) {
    setUsers((prevState) => prevState.filter((user) => user.id !== userId));
  }

  return (
    <Container>
      <Header>
        {user && <img src={arrow} alt="" onClick={() => setUser(null)} />}
        <h1>{user?.id ? 'Edição' : 'Cadastro'} de Pessoa </h1>
      </Header>

      <UserForm user={user} users={users} onSubmit={handleSubmit} />

      <UserTable
        users={users}
        onSelectUser={handleSelectUser}
        onRemoveUser={handleRemoveUser}
      />
    </Container>
  );
}
