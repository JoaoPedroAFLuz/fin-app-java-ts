import { Link, Outlet } from 'react-router-dom';
import { Container } from './styles';

import fiescLogoNegative from '../../assets/images/fiesc-logo-negative.png';

export function Header() {
  return (
    <>
      <Container>
        <a href="https://fiesc.com.br/" target="_blank" rel="noreferrer">
          <img src={fiescLogoNegative} alt="FIESC logo" />
        </a>

        <ul>
          <li>
            <Link to="/user">Pessoa</Link>
          </li>
          <li>
            <a href="/account">Conta</a>
          </li>
          <li>
            <a href="/transaction">Movimentação</a>
          </li>
        </ul>
      </Container>

      <Outlet />
    </>
  );
}
