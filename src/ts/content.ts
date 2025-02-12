import { FeaturedProject, ProjectCategory } from "./types";
import { PROJECTS } from "./projects";

const EMAIL = "florian.kulig@web.de" as const;
const GITHUB = "https://github.com/floriankulig" as const;
const YEARS_OF_EXPERIENCE = new Date().getFullYear() - 2020;

const FEATURED_PROJECTS_IDS: Array<(typeof PROJECTS)[number]["id"]> = [
  "neural-navi",
  "jvis",
  "sorting-algorithms",
];
const FEATURED_PROJECTS: FeaturedProject[] = FEATURED_PROJECTS_IDS.map((id) => {
  const project = PROJECTS.find((project) => project.id === id);
  if (!project) {
    throw new Error(`Project with ID ${id} not found.`);
  }
  return project;
});

const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    id: "development",
    title: "Development",
    color: "#87CEEB",
    legerTitle: "Shit that works.",
  },
  {
    id: "data",
    title: "Data Science & AI",
    color: "#FF6347",
    legerTitle: "Data digging.",
  },
  {
    id: "design",
    title: "Design",
    color: "#20B2AA",
    legerTitle: "Beautiful stuff.",
  },
];

export {
  EMAIL,
  GITHUB,
  YEARS_OF_EXPERIENCE,
  FEATURED_PROJECTS,
  PROJECTS,
  PROJECT_CATEGORIES,
};
