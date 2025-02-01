import {
  Banner,
  Hero,
  HeroBanner,
  ProjectsIntro,
  ProjectsSlide,
  ThinkDifferent,
} from "components/home";
import { Curtain } from "components/layout/Curtain";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Header = dynamic(
  () => import("components/shared").then((mod) => mod.Header),
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
