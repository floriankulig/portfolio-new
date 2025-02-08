import {
  Banner,
  Hero,
  ProjectsIntro,
  ProjectsSlide,
  ThinkDifferent,
} from "components/home";
import { Curtain } from "components/layout/Curtain";
import { Footer } from "components/layout/footer/Footer";
import { Header, StaticHeader } from "components/layout/header";
import dynamic from "next/dynamic";

const Home = () => {
  return (
    <>
      <Curtain />
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
          width: "100dvw",
        }}
      >
        <StaticHeader />
      </div> */}
      <Header />
      {/* <HeroBanner /> */}
      <Hero />
      <ProjectsIntro />
      <ProjectsSlide />
      <Banner />
      <ThinkDifferent />
      <Footer />
    </>
  );
};

export default Home;
