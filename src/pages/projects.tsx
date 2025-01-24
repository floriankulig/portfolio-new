import { Curtain } from "components/layout/Curtain";
import { ProjectsHeader, ProjectsList } from "components/work";
import { LayoutGroup } from "framer-motion";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { PROJECTS } from "ts/content";

const Header = dynamic(
  () => import("components/shared").then((mod) => mod.Header),
  { ssr: false }
);

const ProjectsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const selectedProjects = useMemo(
    () =>
      PROJECTS.filter(
        (project) =>
          selectedCategories.some((category) =>
            project.categories?.includes(category)
          ) || selectedCategories.length === 0
      ),
    [selectedCategories]
  );

  return (
    <>
      <Curtain />
      <Header />
      <LayoutGroup>
        <ProjectsHeader
          selectedChips={selectedCategories}
          setSelectedChips={setSelectedCategories}
        />
        <ProjectsList selectedProjects={selectedProjects} />
      </LayoutGroup>
    </>
  );
};

export default ProjectsPage;
