import {
  Banner,
  Hero,
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
      <Header />
      <Hero />
      <ProjectsIntro />
      <ProjectsSlide />
      <Banner />
      <ThinkDifferent />
    </>
  );
};

export default Home;
