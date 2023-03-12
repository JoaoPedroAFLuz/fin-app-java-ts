import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { AccountDTO } from '../../dtos/Account.dto';

import { api } from '../../utils/api';

import { StyledTableCell, StyledTableRow } from './styles';

interface AccountTableProps {
  accounts: AccountDTO[];
  onRemoveAccount: (accountId: number) => void;
}

export function AccountTable({ accounts, onRemoveAccount }: AccountTableProps) {
  async function handleDeleteAccount(id: number) {
    await api.delete(`/accounts/${id}`);
    onRemoveAccount(id);
  }

  return (
    <>
      <TableContainer sx={{ marginTop: 8 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>CPF</StyledTableCell>
              <StyledTableCell>Número da conta</StyledTableCell>
              <StyledTableCell>Editar</StyledTableCell>
              <StyledTableCell>Remover</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <StyledTableRow key={account.id}>
                <StyledTableCell component="th" scope="row">
                  {account.user.name}
                </StyledTableCell>
                <StyledTableCell>{account.user.cpf}</StyledTableCell>
                <StyledTableCell>{account.registrationCode}</StyledTableCell>
                <StyledTableCell>
                  <button>Editar</button>
                </StyledTableCell>
                <StyledTableCell>
                  <button onClick={() => handleDeleteAccount(account.id)}>
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
