import {
  Banner,
  Hero,
  ProjectsIntro,
  ProjectsSlide,
  ThinkDifferent,
  ProjectsStack,
} from "components/home";
import { Curtain } from "components/layout/Curtain";
import { Footer } from "components/layout/footer/Footer";
import { Header } from "components/layout/header";
import { useViewport } from "hooks";

const Home = () => {
  const { isMobile, orientation } = useViewport(960);
  return (
    <>
      <Curtain />
      <Header />
      <Hero />
      <ProjectsIntro />
      {isMobile || orientation === "portrait" ? (
        <ProjectsStack />
      ) : (
        <ProjectsSlide />
      )}
      <Banner />
      <ThinkDifferent />
      <Footer />
    </>
  );
};

export default Home;
