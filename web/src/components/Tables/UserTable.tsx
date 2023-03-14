import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { UserDTO } from '../../dtos/User.dto';
import { api } from '../../utils/api';
import { applyCPFMask } from '../../utils/applyCPFMask';
import { StyledTableCell, StyledTableRow } from './styles';

interface UserTableProps {
  users: UserDTO[];
  onSelectUser: (user: UserDTO) => void;
  onRemoveUser: (userId: number) => void;
}

export function UserTable({
  users,
  onSelectUser,
  onRemoveUser,
}: UserTableProps) {
  async function handleDeleteUSer(id: number) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    await api.delete(`/users/${id}`);

    onRemoveUser(id);
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>CPF</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Endereço</StyledTableCell>
              <StyledTableCell>Editar</StyledTableCell>
              <StyledTableCell>Remover</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell>{applyCPFMask(user.cpf)}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.address}</StyledTableCell>
                <StyledTableCell>
                  <button onClick={() => onSelectUser(user)}>Editar</button>
                </StyledTableCell>
                <StyledTableCell>
                  <button onClick={() => handleDeleteUSer(user.id)}>
                    Remover
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
