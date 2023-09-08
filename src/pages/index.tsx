import { Curtain } from "components/layout/Curtain";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Curtain />
    </>
  );
};

export default Home;
