import { AboutIntro, Education, Experience, Focus } from "components/about";
import { Curtain } from "components/layout/Curtain";
import { Footer } from "components/layout/footer/Footer";
import { Header } from "components/layout/header";
import styled from "styled-components";

const StyledAboutPage = styled.main`
  min-height: 100svh;
  padding-block: min(max(10vw, 100px), 140px) 6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const AboutPage = () => {
  return (
    <>
      <Curtain />
      <Header />
      <StyledAboutPage className="main-col">
        <AboutIntro />
        <Focus />
        <Experience />
        <Education />
        {/* <Credentials /> */}
        {/* <AboutLinks /> */}
      </StyledAboutPage>
      <Footer />
    </>
  );
};

export default AboutPage;
