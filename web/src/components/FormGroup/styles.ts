import styled from 'styled-components';

export const Container = styled.div`
  width: 22.5rem;

  small {
    color: ${({ theme }) => theme.colors.danger.main};
    font-size: 0.75rem;
    display: block;
    margin-top: 0.5rem;
  }

  .form-item {
    position: relative;

    .loader {
      position: absolute;
      top: 1.125rem;
      right: 1rem;
    }
  }

  & + & {
    margin-top: 1rem;
  }
`;
