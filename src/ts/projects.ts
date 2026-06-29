import { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "neural-navi",
    title: "Neural Navi",
    featureImage: "NeuralNaviMock.png",
    projectBackground:
      "For this project, I combined my <b>long-standing passion for automotive engineering</b> with the academic requirements of my university studies. What started as a student research project quickly evolved into a comprehensive system for capturing and analyzing driving data to produce machine learning model outputs. The goal was to develop <b>a copilot that intelligently helps drivers make informed decisions</b> to make driving safer. Supervised by a CV/ADAS project manager at the Bosch Center for AI and additionally mentored by the faculty dean, who issued a recommendation letter.",
    featureDescription:
      "A driver-assistance system with multimodal, real-time risk analysis running end-to-end on a Raspberry Pi.",
    gradient: "linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)",
    technologies: [
      "PyTorch",
      "Computer Vision",
      "Model Quantization",
      "CAN / OBD-II",
    ],
    categories: ["data", "development"],
    keywords: ["Edge Inference", "Multimodal Fusion"],
    date: "Oct 2024 - Jul 2025",
    services: ["Research", "Development", "Testing"],
    sections: {
      parallaxImages: {
        bgImage: "plates.jpg",
        mainImage: "NeuralNavi Main.png",
      },
    },
    github: "https://github.com/floriankulig/neural-navi",
    externalLink:
      "https://github.com/floriankulig/neural-navi/raw/refs/heads/master/paper_dhbw.pdf",
  },
  {
    id: "minibev",
    title: "MiniBEV",
    featureImage: "MiniBEVMock.png",
    projectBackground:
      "An ongoing, self-directed exploration of efficient bird's-eye-view perception on the nuScenes mini split. I fuse several camera views into a unified 3D scene representation and experiment with <b>alternative architectures (state-space models, JEPA)</b>, pushing inference efficiency through <b>custom kernels</b>.",
    featureDescription:
      "A compact bird's-eye-view model that fuses multiple cameras into a 3D representation of the environment.",
    gradient: "linear-gradient(135deg, #ffa527 0%, #3695d8 100%)",
    technologies: [
      "PyTorch",
      "Computer Vision",
      "Multi-Camera Fusion",
      "GPU Kernels",
    ],
    categories: ["data", "development"],
    keywords: ["Bird's-Eye View", "Autonomous Driving"],
    date: "May 2026 - ongoing",
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
    id: "hsc",
    title: "HSC Mobile Wood Processing Center",
    featureImage: "Zolnhofer HSC.jpg",
    projectBackground:
      "A one-of-a-kind <b>truck-mounted wood-processing center</b> — chainsaw, hydraulic splitter, crane and material handling in a single mobile unit, with only <b>four units worldwide</b>. I <b>adapt the PLC control software and CAN bus communication</b> between its subsystems: integrating new hardware, tuning hydraulic and sensor parameters, and keeping safety-critical functions like deadman switches reliable. With machinery this rare there's no documentation or support to lean on — every change starts with reverse-engineering how the crane, splitter and saw interact. Weekend work for a family business run by relatives.",
    featureDescription:
      "Safety-critical embedded software for an industrial mobile wood-processing machine — four units deployed worldwide.",
    gradient: "linear-gradient(135deg, #B0703A 0%, #5C6B73 100%)",
    technologies: ["PLC", "CAN Bus", "Structured Text", "C"],
    categories: ["development"],
    keywords: ["Embedded", "Safety-Critical"],
    date: "Jan 2026 - ongoing",
    client: "Zolnhofer",
    clientLink: "https://www.zolnhofer.de/start.html",
  },
  {
    id: "chd-classifier",
    title: "CHD Classifier Evaluation",
    featureImage: "CHDClassifierMock.png",
    projectBackground:
      "Coronary heart disease (CHD) is a leading cause of death globally, making early risk assessment critical for preventive healthcare. This project served as an opportunity to <b>deepen my ML fundamentals</b> through comprehensive, hands-on application. The goal was building an <b>end-to-end ML pipeline</b> while mastering core concepts like <b>model evaluation, hyperparameter optimization, and feature engineering</b> to develop practical ML skills.",
    featureDescription:
      "An evaluation of machine learning models for classifying coronary heart disease using optimizations.",
    technologies: [
      "Jupyter Notebook",
      "Machine Learning",
      "Scikit-Learn",
      "Feature Engineering",
    ],
    categories: ["data", "design"],
    keywords: ["Machine Learning", "Jupyter Notebook"],
    date: "May 2025",
    gradient: "linear-gradient(135deg, #67D1AC 0%, #D1F3AE 100%)",
    github: "https://github.com/floriankulig/chd-classifier",
    sections: {
      parallaxImages: {
        bgImage: "plates.jpg",
        mainImage: "CHDClassifier Main.png",
      },
    },
  },
  {
    id: "munich-bikes",
    title: "Munich's Bicycle Traffic",
    featureImage: "MunBikeMock.jpg",
    projectBackground:
      "This data analysis project processes and visualizes bicycle traffic data of Munich's counting stations from 2008 to 2024. The project <b>transforms complex traffic data into accessible insights</b> through an interactive dashboard and static visualizations, making urban mobility patterns <b>understandable for non-technical stakeholders.</b>",
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
];
