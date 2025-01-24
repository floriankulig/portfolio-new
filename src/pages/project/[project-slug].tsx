import { Curtain } from "components/layout/Curtain";
import { Description, ProjectDetailHead } from "components/project-detail";
import { getProjectByID } from "helpers";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Project } from "ts/content";

const Header = dynamic(
  () => import("components/shared").then((mod) => mod.Header),
  { ssr: false }
);

const ProjectDetailPage = () => {
  const router = useRouter();
  const projectID = router.query["project-slug"] as string;
  const [project, setProject] = useState<Project>(getProjectByID(projectID)!);

  useEffect(() => {
    const fetchedProject = getProjectByID(projectID);
    if (projectID && fetchedProject) {
      setProject(fetchedProject);
    }
  }, [projectID]);

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
      <ProjectDetailHead project={project} />
      <Description
        label="Project Background"
        description={project.projectBackground}
      />
      <div
        style={{ height: "50vh", marginTop: 50, background: "#88888888" }}
      ></div>
    </>
  );
};

export default ProjectDetailPage;
