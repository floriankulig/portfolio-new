import { Curtain } from "components/layout/Curtain";
import { getProjectByID } from "helpers";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";

const Header = dynamic(
  () => import("components/shared").then((mod) => mod.Header),
  { ssr: false }
);

const ProjectDetailPage = () => {
  const router = useRouter();
  const projectID = router.query["project-slug"] as string;
  const project = getProjectByID(projectID)!;
  return (
    <>
      <Curtain />
      <Header />
      {project?.title}
      {project?.technologies}
      <Image
        src={"/" + project?.image}
        // width={1920}
        // height={1080}
        alt={project?.title}
        style={{ objectFit: "cover" }}
        fill
      />
      <div
        style={{ background: "red", marginTop: "100px", height: "300vh" }}
      ></div>
    </>
  );
};

export default ProjectDetailPage;
