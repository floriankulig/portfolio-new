import {
  Hero,
  Quote,
  Motivation,
  Approach,
  Contact,
  Footer,
} from "components/home";
import { Curtain, Header } from "components/layout";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Curtain noExit={router.route.includes("project")} />
      <Header />
      <Hero />
      <Quote />
      {/*<Motivation />
      <Approach />*/}
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
