import { Curtain } from "components/layout/Curtain";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Header = dynamic(
  () => import("components/shared").then((mod) => mod.Header),
  { ssr: false }
);

const ContactPage = () => {
  return (
    <>
      <Curtain />
      <Header />
      <div
        style={{ background: "red", marginTop: "100px", height: "300vh" }}
      ></div>
    </>
  );
};

export default ContactPage;
