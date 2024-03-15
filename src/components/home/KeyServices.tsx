import styled from "styled-components";

const StyledKeyServices = styled.div`
  background-color: var(--bg2);
  padding: 3.5rem 0;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr) 1px 1fr 1px 1fr;
  align-items: center;

  h3 {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 2%;
    text-transform: uppercase;
  }
`;

const StyledService = styled.div`
  font-family: var(--jakarta);
  font-weight: 600;
  letter-spacing: 2%;
  font-size: 1.5rem;
`;

const StyledServiceDivider = styled.div`
  width: 1px;
  height: 56px;
  background-color: var(--text3);
`;

//TODO: Desktop view
export const KeyServices = () => {
  return (
    <StyledKeyServices>
      <h3>What I Do</h3>
      <StyledService>Web Development</StyledService>
      <StyledServiceDivider />
      <StyledService>UX- / UI-Design</StyledService>
      <StyledServiceDivider />
      <StyledService>Interaction Design</StyledService>
    </StyledKeyServices>
  );
};
