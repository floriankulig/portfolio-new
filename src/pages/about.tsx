import { Curtain, Header } from "components/layout";
import Link from "next/link";
import styled from "styled-components";

const StyledAboutPage = styled.div`
  width: 100vw;
  min-height: 150vh;
  background: ${({ theme }) => theme.light};
`;

const About = () => {
  return (
    <StyledAboutPage>
      <Curtain />
      <Header />
      About
      <button>
        <Link href="/">Go to Home</Link>
      </button>
    </StyledAboutPage>
  );
};

export default About;
