import { Curtain } from "components/layout/Curtain";
import { ProjectsHeader, ProjectsList } from "components/projects";
import { LayoutGroup } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";

const Header = dynamic(
  () => import("components/shared").then((mod) => mod.Header),
  { ssr: false }
);

const ProjectsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <Curtain />
      <Header />
      <LayoutGroup>
        <ProjectsHeader
          selectedChips={selectedCategories}
          setSelectedChips={setSelectedCategories}
        />
        <ProjectsList />
      </LayoutGroup>
    </>
  );
};

export default ProjectsPage;
