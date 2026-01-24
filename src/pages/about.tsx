import { Curtain } from "components/layout/Curtain";
import { Header } from "components/layout/header";
import { LinkButton } from "components/project-detail/LinkButton";
import { InlineImageBubble } from "components/shared";
import { rgba } from "polished";
import { Linkedin } from "react-feather";
import styled from "styled-components";
import theme from "styles/theme";
import { LINKEDIN } from "ts/content";

const StyledAboutPage = styled.section`
  height: 100vh;
  padding-inline: ${({ theme }) => theme.mainColPadding};
  padding-block: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
    justify-content: center;
    /* align-items: center;
    flex-wrap: wrap;
    gap: 0 0.25em; */
  }

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    @media (width < 540px) {
      flex-direction: column;
      gap: 4px;
    }
    span.text {
      font-size: clamp(1rem, 4vw, 1.25rem);
      color: var(--text2);
    }
  }
`;
const LinkedInIcon = <Linkedin strokeWidth={1.5} />;

const AboutPage = () => {
  return (
    <>
      <Curtain />
      <Header />
      <StyledAboutPage>
        <h1 className="with-bubble">
          Work{" "}
          <InlineImageBubble
            image="/WIP.png"
            sizes="(max-width: 768px) 20vw, 190px"
            alt="Image of a turned off laptop on a desk"
          />
          in Progress...
        </h1>
        <p>
          <span className="text">For now, </span>
          <LinkButton
            link={LINKEDIN}
            icon={LinkedInIcon}
            color={"#1272a5"}
            textColor={theme.bg1}
          >
            LinkedIn
          </LinkButton>{" "}
          <span className="text">might be worth a visit.</span>
        </p>
      </StyledAboutPage>
    </>
  );
};

export default AboutPage;
