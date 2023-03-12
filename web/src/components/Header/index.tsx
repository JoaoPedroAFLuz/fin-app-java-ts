import { Link, Outlet } from 'react-router-dom';

import { Container, OutletContainer } from './styles';

import fiescNegativeLogo from '../../assets/images/fiesc-negative-logo.png';

export function Header() {
  return (
    <>
      <Container>
        <a href="https://fiesc.com.br/" target="_blank" rel="noreferrer">
          <img src={fiescNegativeLogo} alt="FIESC logo" />
        </a>

        <ul>
          <li>
            <Link to="/user">Pessoa</Link>
          </li>
          <li>
            <Link to="/account">Conta</Link>
          </li>
          <li>
            <Link to="/transaction">Movimentação</Link>
          </li>
        </ul>
      </Container>

      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </>
  );
}
