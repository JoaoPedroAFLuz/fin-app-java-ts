import { Container } from './styles';

interface FormGroupProps {
  error: string;
  children: React.ReactNode;
}

export function FormGroup({ children, error }: FormGroupProps) {
  return (
    <Container>
      <div className="form-item">{children}</div>
      {error && <small>{error}</small>}
    </Container>
  );
}
