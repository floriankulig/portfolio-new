import { Hero, KeyServices } from "components/home";
import { ProjectsSlide } from "components/home/ProjectsSlide";
import { Curtain } from "components/layout/Curtain";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Header = dynamic(
  () => import("components/shared").then((mod) => mod.Header),
  { ssr: false }
);

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Curtain />
      <Header />
      <Hero />
      <KeyServices></KeyServices>
      <ProjectsSlide></ProjectsSlide>
    </>
  );
};

export default Home;
