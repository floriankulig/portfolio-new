import { Project } from "./types";

export const PROJECTS: Project[] = [
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
    date: "Oct 2024 - Jul 2025",
    services: ["AI-Research", "Development", "Testing"],
    sections: {
      parallaxImages: {
        bgImage: "plates.jpg",
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
    clientLink: "https://www.zolnhofer.de/start.html",
    services: ["Concept", "Design", "Development"],
    sections: {
      parallaxImages: {
        bgImage: "forest.jpg",
        mainImage: "Jvis Main.png",
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
        // responsibilities: ["Backend"],
        link: "https://github.com/Nollknolle",
      },
      {
        name: "Florian Kulig",
        // responsibilities: ["Frontend", "Design"],
      },
    ],
    externalLink: "https://testiply.vercel.app",
    github: "https://github.com/floriankulig/testiply",
    sections: {
      parallaxImages: {
        bgImage: "swirl.jpg",
        mainImage: "Testiply Main.png",
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
      },
    },
  },
  {
    id: "panache-booth",
    title: "Panache Booth",
    featureImage: "PanacheBoothMock.jpg",
    projectBackground:
      "What began as a university course assignment to create a basic e-commerce platform evolved into an extensive web development project. <b>Working as a team of two</b>, we transformed the initial academic requirements into a fully-featured <b>online shop with a strong focus on user experience</b> and conversion optimization.",
    featureDescription:
      "A fictional peer-to-peer retail shop with a focus on user experience and conversion optimization.",
    gradient: "linear-gradient(135deg, #A74B0A 0%, #DC9765 100%)",
    technologies: ["Angular", "Node", "SQLite", "Express"],
    keywords: ["Angular", "UX & Conversion"],
    categories: ["development", "design"],
    date: "Dec 2023 - Jan 2024",
    roles: [
      {
        name: "Lars Huzel",
        link: "https://github.com/lars-1503",
      },
      {
        name: "Florian Kulig",
      },
    ],
    github: "https://github.com/floriankulig/panache-booth",
    sections: {
      parallaxImages: {
        bgImage: "swirl.jpg",
        mainImage: "PanacheBooth Main.png",
      },
    },
  },

  {
    id: "munich-bikes",
    title: "Munich's Bicycle Traffic",
    featureImage: "MunBikeMock.jpg",
    projectBackground:
      "This data analysis project processes and visualizes bicycle traffic data from Munich's counting stations from 2008 to 2024. The project <b>transforms complex traffic data into accessible insights</b> through an interactive dashboard, making urban mobility patterns <b>understandable for non-technical stakeholders.</b>",
    featureDescription:
      "A series of visualizations, applications and analyses of Munich's cycling data from 2008 to 2024.",
    technologies: ["Python", "Visualization", "Pandas", "Matplotlib"],
    categories: ["data", "design"],
    keywords: ["Data-Science", "Visualization"],
    date: "Jan 2025",
    roles: [
      {
        name: "David Faiß",
        link: "https://github.com/kivi280",
      },
      {
        name: "Florian Kulig",
      },
    ],
    gradient: "linear-gradient(135deg, #3357C1 0%, #3392C1 100%)",
    github: "https://github.com/floriankulig/data-science-vl",
    sections: {
      parallaxImages: {
        bgImage: "eliptic.jpg",
        mainImage: "MunBike Main.png",
      },
    },
  },
];
