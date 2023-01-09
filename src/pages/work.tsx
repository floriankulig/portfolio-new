import { Curtain, Header } from "components/layout";
import Link from "next/link";
import styled from "styled-components";

const StyledWorkPage = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${({ theme }) => theme.light};
`;

const Work = () => {
  return (
    <StyledWorkPage>
      <Curtain />
      <Header />
      Work
      <button>
        <Link href="/">Go to Home</Link>
      </button>
    </StyledWorkPage>
  );
};

export default Work;
