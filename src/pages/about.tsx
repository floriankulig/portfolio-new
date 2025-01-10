import { Curtain } from "components/layout/Curtain";
import { InlineImageBubble } from "components/shared";
import dynamic from "next/dynamic";
import styled from "styled-components";

const Header = dynamic(
  () => import("components/shared").then((mod) => mod.Header),
  { ssr: false }
);

const StyledAboutPage = styled.section`
  height: calc(100vh - 46px);
  padding-inline: ${({ theme }) => theme.mainColPadding};
  padding-block: 0 46px;
  display: grid;
  place-items: center;

  h1 {
    font-size: clamp(2.5rem, 10dvw, 6rem);
    font-weight: 600;
    letter-spacing: -5%;
    line-height: 1;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.1em 0.25em;
  }
`;

const AboutPage = () => {
  return (
    <>
      <Curtain />
      <Header />
      <StyledAboutPage>
        <h1>
          Work <InlineImageBubble image="WIP.png" alt="test" />
          in Progress...
        </h1>
      </StyledAboutPage>
    </>
  );
};

export default AboutPage;
