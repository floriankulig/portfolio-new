import {
  Banner,
  Hero,
  ProjectsIntro,
  ProjectsSlide,
  ThinkDifferent,
} from "components/home";
import { Curtain } from "components/layout/Curtain";
import dynamic from "next/dynamic";

const Header = dynamic(
  () => import("components/layout/header").then((mod) => mod.StaticHeader),
  { ssr: false }
);

const Home = () => {
  return (
    <>
      <Curtain />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
          width: "100dvw",
        }}
      >
        <Header />
      </div>
      {/* <HeroBanner /> */}
      <Hero />
      <ProjectsIntro />
      <ProjectsSlide />
      <Banner />
      <ThinkDifferent />
    </>
  );
};

export default Home;
