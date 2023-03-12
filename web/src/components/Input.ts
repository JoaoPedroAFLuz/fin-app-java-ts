import ReactInputMask from 'react-input-mask';
import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  height: 52px;

  background: #ffffff;
  border: 2px solid #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  outline: none;
  padding: 0 1rem;
  font-size: 1rem;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const InputMask = styled(ReactInputMask)`
  width: 100%;
  height: 52px;

  background: #ffffff;
  border: 2px solid #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  outline: none;
  padding: 0 1rem;
  font-size: 1rem;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;
