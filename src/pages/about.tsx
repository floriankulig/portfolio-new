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
    font-size: clamp(2rem, 11svw, 6rem);
    font-weight: 600;
    letter-spacing: -0.05em;
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
    padding: 0.5em 0;
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
          Work{" "}
          <InlineImageBubble
            image="/WIP.png"
            sizes="(max-width: 768px) 20vw, 190px"
            alt="Image of a turned off laptop on a desk"
          />
          in Progress...
        </h1>
      </StyledAboutPage>
    </>
  );
};

export default AboutPage;
