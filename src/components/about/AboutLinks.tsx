import { LinkButton } from "components/project-detail/LinkButton";
import { GitHub, Linkedin, Mail } from "react-feather";
import styled from "styled-components";
import theme from "styles/theme";
import { EMAIL, GITHUB, LINKEDIN } from "ts/content";
import { AboutSection } from "./AboutSection";

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const AboutLinks = () => (
  <AboutSection label="Links">
    <Links>
      <LinkButton
        link={LINKEDIN}
        icon={<Linkedin strokeWidth={1.5} />}
        color={"#0a689a"}
        textColor={theme.bg1}
      >
        LinkedIn
      </LinkButton>
      <LinkButton
        link={GITHUB}
        icon={<GitHub />}
        color={"#000"}
        textColor={theme.bg1}
      >
        GitHub
      </LinkButton>
      <LinkButton
        link={`mailto:${EMAIL}?subject=Let's work together!`}
        icon={<Mail strokeWidth={1.5} />}
        sameSite
      >
        Email
      </LinkButton>
    </Links>
  </AboutSection>
);
