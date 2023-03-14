import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

import { TransactionDTO } from '../../dtos/Transaction.dto';
import { formatCurrency } from '../../utils/formatCurrency';

import { StyledTableCell, StyledTableRow } from './styles';

const rowStyle = {
  color: 'red',
};

interface TransactionTableProps {
  transactions: TransactionDTO[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Data</StyledTableCell>
            <StyledTableCell>Valor</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map((transaction) => (
            <StyledTableRow key={transaction.id}>
              <StyledTableCell component="th" scope="row">
                {moment(transaction.dateTime).format('DD/MM/YYYY HH:mm:ss')}
              </StyledTableCell>
              <StyledTableCell
                style={transaction.value < 0 ? rowStyle : undefined}
              >
                {formatCurrency(transaction.value)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
