import { Curtain } from "components/layout/Curtain";
import { Footer } from "components/layout/footer/Footer";
import { Header } from "components/layout/header";
import { ProjectsHeader, ProjectsList } from "components/work";
import { LayoutGroup } from "framer-motion";
import { useMemo, useState } from "react";
import { PROJECTS } from "ts/content";

const ProjectsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredProjects = useMemo(
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
        <ProjectsList filteredProjects={filteredProjects} />
      </LayoutGroup>
      <Footer />
    </>
  );
};

export default ProjectsPage;
