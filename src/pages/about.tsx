import { Curtain } from "components/layout/Curtain";
import { InlineImageBubble } from "components/shared";
import dynamic from "next/dynamic";
import { rgba } from "polished";
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
    -webkit-text-stroke: 1px ${({ theme }) => rgba(theme.bg1, 0.2)};
    background: var(--text1);
    background-image: radial-gradient(
      circle at 3.75em 5%,
      ${({ theme }) => rgba(theme.bg3, 0.45)} 0%,
      transparent 40%
    );
    color: transparent;
    background-clip: text;
    padding: 0.2em 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0 0.25em;
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
