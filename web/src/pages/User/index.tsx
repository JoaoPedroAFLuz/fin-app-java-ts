import { UserForm } from '../../components/UserForm';
import { Container } from './styles';

export function User() {
  return (
    <Container>
      <h1>Cadastro de Pessoa</h1>

      <UserForm />
    </Container>
  );
}
