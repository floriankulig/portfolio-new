import { Curtain } from "components/layout/Curtain";
import { Description, ProjectDetailHead } from "components/project-detail";
import { getProjectByID } from "helpers";
import dynamic from "next/dynamic";
import { Project } from "ts/types";
import { PROJECTS } from "ts/content";

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";

const Header = dynamic(
  () => import("components/shared").then((mod) => mod.Header),
  { ssr: false }
);

export const getStaticPaths = (async () => {
  const paths = PROJECTS.map((project) => ({
    params: { "project-slug": project.id },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const projectID = context.params!["project-slug"] as string;
  const fetchedProject = getProjectByID(projectID)!;
  return { props: { project: fetchedProject } };
}) satisfies GetStaticProps<{
  project: Project;
}>;

const ProjectDetailPage = ({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
