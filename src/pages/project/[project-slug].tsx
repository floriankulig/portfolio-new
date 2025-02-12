import { Curtain } from "components/layout/Curtain";
import {
  Description,
  ParallaxImages,
  ProjectDetailHead,
} from "components/project-detail";
import { getProjectByID } from "helpers";
import { Project } from "ts/types";
import { PROJECTS } from "ts/content";

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { Header } from "components/layout/header";
import { Footer } from "components/layout/footer/Footer";
import { MoreInfoComing } from "components/work";

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
  const { id, sections, title, stillDeveloping } = project;
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
      ></div>
      <Header />
      <ProjectDetailHead project={project} />
      <Description
        label="Project Background"
        description={project.projectBackground}
      />
      {sections?.parallaxImages && (
        <ParallaxImages
          projectName={title}
          parallaxImages={sections?.parallaxImages}
        />
      )}
      <MoreInfoComing stillDeveloping={stillDeveloping} />
      <Footer />
    </>
  );
};

export default ProjectDetailPage;
