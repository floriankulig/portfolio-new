import styled from "styled-components";

export const MainColumn = styled.div`
  margin: 0 auto;
  width: clamp(1px, 90%, 76rem);
  @media (${({ theme }) => theme.bp.small}) {
    width: clamp(1px, 80%, 76rem);
  }
  @media (${({ theme }) => theme.bp.medium}) {
    width: clamp(1px, 70%, 76rem);
  }
`;
