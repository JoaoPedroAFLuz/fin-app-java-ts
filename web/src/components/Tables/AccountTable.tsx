import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { AccountDTO } from '../../dtos/Account.dto';

import { api } from '../../utils/api';
import { applyCPFMask } from '../../utils/applyCPFMask';

import { StyledTableCell, StyledTableRow } from './styles';

interface AccountTableProps {
  accounts: AccountDTO[];
  onSelectAccount: (account: AccountDTO) => void;
  onRemoveAccount: (accountId: number) => void;
}

export function AccountTable({
  accounts,
  onSelectAccount,
  onRemoveAccount,
}: AccountTableProps) {
  async function handleDeleteAccount(account: AccountDTO) {
    const { data } = await api.get(`/transactions/by-account`, {
      params: {
        accountId: account.id,
      },
    });

    if (data.length > 0) {
      return alert('Não é possível excluir um conta que possui transações');
    }

    if (confirm('Deseja realmente excluir este conta?') === true) {
      await api.delete(`/accounts/${account.id}`);
      onRemoveAccount(account.id);
    }
  }

  return (
    <>
      <TableContainer>
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
                <StyledTableCell>
                  {applyCPFMask(account.user.cpf)}
                </StyledTableCell>
                <StyledTableCell>{account.registrationCode}</StyledTableCell>
                <StyledTableCell>
                  <button onClick={() => onSelectAccount(account)}>
                    Editar
                  </button>
                </StyledTableCell>
                <StyledTableCell>
                  <button onClick={() => handleDeleteAccount(account)}>
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
