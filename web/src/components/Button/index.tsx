import { Button as StyledButton } from './styles';

interface ButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export function Button({ disabled, children, type, onClick }: ButtonProps) {
  return (
    <StyledButton disabled={disabled} type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
