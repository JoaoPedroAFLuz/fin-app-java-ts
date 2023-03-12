import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { UserDTO } from '../../dtos/User.dto';
import { api } from '../../utils/api';
import { StyledTableCell, StyledTableRow } from './styles';

interface UserTableProps {
  users: UserDTO[];
  onRemoveUser: (userId: number) => void;
}

export function UserTable({ users, onRemoveUser }: UserTableProps) {
  async function handleDeleteUSer(id: number) {
    await api.delete(`/users/${id}`);

    onRemoveUser(id);
  }

  return (
    <>
      <TableContainer sx={{ marginTop: 8 }}>
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
                <StyledTableCell>{user.cpf}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.address}</StyledTableCell>
                <StyledTableCell>
                  <button>Editar</button>
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
