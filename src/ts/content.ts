import { FeaturedProject, Project, ProjectCategory } from "./types";

const PROJECTS: Project[] = [
  {
    id: "jvis",
    title: "Job Manager",
    featureImage: "JvisMock.png",
    projectBackground:
      "This project was developed as a part of my bachelor's thesis. The goal was to create a tool for managing and planning contracting work in the forestry business. The application is built with React and Firebase, and it includes features such as a map view, a calendar view, and a task list. The application is currently in use by a small company in Finland.",
    featureDescription:
      "A tool for managing and planning contracting work in the forestry business.",
    gradient:
      "linear-gradient(135deg,rgb(80, 224, 138) 0%,rgb(58, 142, 184) 100%)",
    technologies: ["React", "NextJS", "Firebase", "TypeScript"],
    categories: ["development", "design"],
    keywords: ["React", "Firebase"],
    date: "June 2023",
    client: "Zolnhofer",
    services: ["Concept", "Design", "Development"],
  },
  {
    id: "testiply",
    title: "Testiply",
    featureImage: "TestiplyMock.png",
    projectBackground:
      "This project was developed as a part of my bachelor's thesis. The goal was to create a tool for managing and planning contracting work in the forestry business. The application is built with React and Firebase, and it includes features such as a map view, a calendar view, and a task list. The application is currently in use by a small company in Finland.",
    featureDescription:
      "A platform for sharing beta applications with a feedback mechanism connecting testers and developers.",
    gradient: "linear-gradient(135deg, #a431d6 0%, #3b38d6 100%)",
    technologies: ["React", "MongoDB", "Express", "Interaction"],
    keywords: ["React", "Interaction"],
    categories: ["development", "design"],
    date: "Dec 2021 - Feb 2022",
    externalLink: "https://testiply.vercel.app",
    github: "https://github.com/floriankulig/testiply",
  },
  {
    id: "sorting-algorithms",
    title: "Sorting Algorithms",
    featureImage: "SortVisMock.png",
    projectBackground:
      "This project was developed as a part of my bachelor's thesis. The goal was to create a tool for managing and planning contracting work in the forestry business. The application is built with React and Firebase, and it includes features such as a map view, a calendar view, and a task list. The application is currently in use by a small company in Finland.",
    featureDescription:
      "An application that visualizes the most popular sorting algorithms, including documentation of their methodology.",
    technologies: ["Python", "Visualization", "Tkinter"],
    categories: ["development"],
    keywords: ["Python", "Visualization"],
    date: "March 2020",
    gradient: "linear-gradient(135deg, #3357C1 0%, #3392C1 100%)",
    github: "https://github.com/floriankulig/SortingVisualizer",
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
