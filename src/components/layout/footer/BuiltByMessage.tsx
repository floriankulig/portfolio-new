import styled from "styled-components";

const StyledBuiltByMessage = styled.p`
  width: 100%;
  display: grid;
  place-items: center;
  color: inherit;
  opacity: 0.75;
  font-family: var(--jakarta);
  font-size: 0.875rem;
  padding-block: 0.5rem 1rem;
`;

export const BuiltByMessage = () => {
  return (
    <StyledBuiltByMessage className="main-col">
      Built and designed with ❤️ by Florian Kulig
    </StyledBuiltByMessage>
  );
};
