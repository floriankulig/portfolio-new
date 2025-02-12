import { FeaturedProject, Project, ProjectCategory } from "./types";
const EMAIL = "florian.kulig@web.de" as const;
const GITHUB = "https://github.com/floriankulig" as const;
const YEARS_OF_EXPERIENCE = new Date().getFullYear() - 2020;

const PROJECTS: Project[] = [
  {
    id: "neural-navi",
    title: "Neural Navi",
    featureImage: "NeuralNaviMock.jpg",
    projectBackground:
      "For this project, I combined my <b>long-standing passion for automotive engineering</b> with the academic requirements of my university studies. What started as a student research project quickly evolved into a comprehensive system for capturing and analyzing driving data to produce machine learning model outputs. The goal is to develop <b>a copilot that intelligently helps drivers make informed decisions</b> to make driving safer.",
    featureDescription:
      "An AI-powered driver CoPilot that improves decision-making for efficient and economic driving.",
    gradient: "linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)",
    technologies: [
      "Python",
      "PyTorch",
      "Computer Vision",
      "OBD-II Diagnostics",
    ],
    categories: ["data", "development"],
    keywords: ["In-Car Use", "Deep Learning"],
    date: "Oct 2024 - Present",
    services: ["AI-Research", "Development", "Testing"],
    sections: {
      parallaxImages: {
        bgImage: "cars.jpg",
        mainImage: "NeuralNavi Main.png",
      },
    },
    github: "https://github.com/floriankulig/neural-navi",
    stillDeveloping: true,
  },
  {
    id: "jvis",
    title: "Job Manager",
    featureImage: "JvisMock.png",
    projectBackground:
      "For this project, I was contacted by a medium-sized wood processing company that wanted to <b>digitize its order management</b> and route planning processes. The company, which specializes in mobile firewood processing, previously managed all orders and routes using various Excel spreadsheets and handwritten notes - a system that was increasingly reaching its limits as the business grew.",
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
    sections: {
      parallaxImages: {
        bgImage: "forest.jpg",
        mainImage: "Jvis Main.png",
        // sideImages: ["JvisSide1.png", "JvisSide2.png"],
      },
    },
  },
  {
    id: "testiply",
    title: "Testiply",
    featureImage: "TestiplyMock.png",
    projectBackground:
      'What started as a simple student coding challenge to "build a cool app" evolved into an ambitious attempt in creating a platform connecting developers with beta testers. <b>Working in a team</b> for the first time, we transformed this open-ended prompt into a practical solution for a common developer need: organizing and managing beta feedback effectively.',
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
    sections: {
      parallaxImages: {
        bgImage: "swirl.jpg",
        mainImage: "Testiply Main.png",
        // sideImages: ["JvisSide1.png", "JvisSide2.png"],
      },
    },
  },
  {
    id: "sorting-algorithms",
    title: "Sorting Algorithm Visualizer",
    featureImage: "SortVisMock.png",
    projectBackground:
      "My first coding project. I set out to create an <b>interactive visualization tool for sorting algorithms</b>. The goal of this project is twofold: to <b>master the fundamentals of programming</b> and to create an educational tool which makes complex algorithms more accessible through visualization.",
    featureDescription:
      "An application that visualizes the most popular sorting algorithms, including documentation of their methodology.",
    technologies: ["Python", "Visualization", "Tkinter"],
    categories: ["development"],
    keywords: ["Python", "Visualization"],
    date: "March 2020",
    gradient: "linear-gradient(135deg, #3357C1 0%, #3392C1 100%)",
    github: "https://github.com/floriankulig/SortingVisualizer",
    sections: {
      parallaxImages: {
        bgImage: "twister.jpg",
        mainImage: "SortVis Main.png",
        // sideImages: ["JvisSide1.png", "JvisSide2.png"],
      },
    },
  },
];

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
