export interface Project {
  id: string;
  title: string;
  featureDescription: string;
  projectBackground: string;
  image: string;
  technologies: string[];
  technologiesFeatured: number;
  externalLink?: string;
  github?: string;
  categories?: string[];
}

export interface ProjectCategory {
  id: string;
  title: string;
  legerTitle: string;
  color: string;
}

export interface FeaturedProject extends Project {}

const PROJECTS: Project[] = [
  {
    id: "jvis",
    title: "Job Manager",
    image: "JvisMock.png",
    projectBackground:
      "This project was developed as a part of my bachelor's thesis. The goal was to create a tool for managing and planning contracting work in the forestry business. The application is built with React and Firebase, and it includes features such as a map view, a calendar view, and a task list. The application is currently in use by a small company in Finland.",
    featureDescription:
      "A tool for managing and planning contracting \n work in the forestry business.",
    technologies: ["React", "Firebase"],
    categories: ["development", "design"],
    technologiesFeatured: 2,
  },
  {
    id: "testiply",
    title: "Testiply",
    image: "TestiplyMock.png",
    projectBackground:
      "This project was developed as a part of my bachelor's thesis. The goal was to create a tool for managing and planning contracting work in the forestry business. The application is built with React and Firebase, and it includes features such as a map view, a calendar view, and a task list. The application is currently in use by a small company in Finland.",
    featureDescription:
      "A platform for sharing beta applications with a feedback \n mechanism connecting testers and developers.",
    technologies: ["Interaction", "React", "MongoDB", "NodeJS"],
    technologiesFeatured: 2,
    categories: ["development", "design"],
    externalLink: "https://testiply.vercel.app",
    github: "",
  },
  {
    id: "sorting-algorithms",
    title: "Sorting Algorithms",
    image: "SortVisMock.png",
    projectBackground:
      "This project was developed as a part of my bachelor's thesis. The goal was to create a tool for managing and planning contracting work in the forestry business. The application is built with React and Firebase, and it includes features such as a map view, a calendar view, and a task list. The application is currently in use by a small company in Finland.",
    featureDescription:
      "An application that visualizes the most popular sorting \n algorithms, including documentation of their methodology.",
    technologies: ["Visualization", "Python"],
    categories: ["development"],
    technologiesFeatured: 2,
    github: "",
  },
];

const FEATURED_PROJECTS: FeaturedProject[] = PROJECTS.slice(
  0,
  3
) as FeaturedProject[];

const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    id: "development",
    title: "Development",
    color: "#87CEEB",
    legerTitle: "Shit that works.",
  },
  {
    id: "data-science",
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

export { FEATURED_PROJECTS, PROJECTS, PROJECT_CATEGORIES };
