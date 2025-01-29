import { FeaturedProject, Project, ProjectCategory } from "./types";

const PROJECTS: Project[] = [
  {
    id: "jvis",
    title: "Job Manager",
    featureImage: "JvisMock.png",
    projectBackground:
      "For this project, I was contacted by a medium-sized wood processing company that wanted to digitize its order management and route planning processes. The company, which specializes in mobile firewood processing, previously managed all orders and routes using various Excel spreadsheets and handwritten notes - a system that was increasingly reaching its limits as the business grew.",
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
      'What started as a simple student coding challenge to "build a cool app" evolved into an ambitious attempt in creating a platform connecting developers with beta testers. Working in a team for the first time, we transformed this open-ended prompt into a practical solution for a common developer need: organizing and managing beta feedback effectively.',
    featureDescription:
      "A platform for sharing beta applications with a feedback mechanism connecting testers and developers.",
    gradient: "linear-gradient(135deg, #a431d6 0%, #3b38d6 100%)",
    technologies: ["React", "NextJS", "MongoDB", "Express"],
    keywords: ["React", "Interaction"],
    categories: ["development", "design"],
    date: "Dec 2021 - Feb 2022",
    roles: [
      {
        name: "Noel Mayr",
        responsibilities: ["Backend"],
      },
      {
        name: "Florian Kulig",
        responsibilities: ["Frontend", "Design"],
      },
    ],
    externalLink: "https://testiply.vercel.app",
    github: "https://github.com/floriankulig/testiply",
  },
  {
    id: "sorting-algorithms",
    title: "Sorting Algorithms Visualizer",
    featureImage: "SortVisMock.png",
    projectBackground:
      "My first coding project. I set out to create an interactive visualization tool for sorting algorithms. The goal of this project is twofold: to master the fundamentals of programming and to create an educational tool which makes complex algorithms more accessible through visualization.",
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
