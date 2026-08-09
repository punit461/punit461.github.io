import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTrophy,
  FaUsers,
  FaEye,
  FaServer,
  FaDatabase,
  FaRobot,
  FaMagnifyingGlassChart,
  FaVialCircleCheck,
  FaCertificate,
  FaRocket,
} from "react-icons/fa6";
import {
  SiLangchain,
  SiHuggingface,
  SiOllama,
  SiMeta,
  SiPytorch,
  SiTensorflow,
  SiOpencv,
  SiPython,
  SiFastapi,
  SiFlask,
  SiDocker,
  SiNginx,
  SiGooglecloud,
  SiLinux,
  SiTypescript,
  SiJavascript,
  SiJupyter,
  SiSelenium,
  SiApachejmeter,
  SiPostman,
  SiOpenjdk,
} from "react-icons/si";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import { TbVectorTriangle, TbPlugConnected, TbSql, TbFaceId } from "react-icons/tb";
import projectsData from "../content/projects.json";
import type {
  PersonalInfo,
  Stat,
  Milestone,
  SkillGroup,
  Project,
  Experience,
  Education,
  Award,
  Certification,
} from "../types";

export const personalInfo: PersonalInfo = {
  name: "Punit Bharadwaj",
  firstName: "Punit",
  lastName: "Bharadwaj",
  role: "AI/ML Engineer",
  roles: [
    "AI/ML Engineer",
    "GenAI & Agentic Systems Developer",
    "Computer Vision Engineer",
    "Python Developer",
  ],
  tagline: "Building tomorrow's AI today.",
  bio: "AI/ML Engineer with 4+ years building intelligent systems across generative AI, computer vision, and automation — currently working on RAG, agentic AI, and vision models for retail and manufacturing.",
  longBio: [
    "I'm an AI/ML Engineer based in Bengaluru with 4+ years of experience building intelligent systems across generative AI, computer vision, and automation. I came into software from mechanical engineering by way of testing — which is still why I care more than most about whether a thing actually holds up in production.",
    "Today that means retrieval-augmented generation, agentic AI systems, and Model Context Protocol work, alongside computer vision: YOLO and RT-DETR models for real-time detection in manufacturing, facial-recognition attendance built on FastAPI and DeepFace, and retail analytics tracking entry/exit, heatmaps, and dwell time.",
    "Before this I spent four years in quality engineering — building Python and Selenium automation frameworks, running performance and accessibility testing, and leading a test team. That background is why the models I ship arrive with tests, pipelines, and a plan for what happens when they fail.",
  ],
  email: "punit461bhardwaj@gmail.com",
  location: "Bengaluru, India",
  avatar: "/profile-pic.jpg",

  // TODO(punit): optional fields — the UI hides each one cleanly while unset.
  //   resumeUrl:  drop a resume at public/resume.pdf and set this to "/resume.pdf"
  //               to reveal the Download Resume buttons in the hero and navbar.
  //   aboutImage: a second photo for the About section, which still shows the
  //               monogram. profile-pic.jpg is only 400x400 and the About frame
  //               renders much larger than the hero's, so it would look soft
  //               there — point this at a higher-resolution shot when you have one.

  socials: [
    { label: "GitHub", href: "https://github.com/punit461", icon: FaGithub },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/punit461bhardwaj",
      icon: FaLinkedin,
    },
    {
      label: "Email",
      href: "mailto:punit461bhardwaj@gmail.com",
      icon: FaEnvelope,
    },
  ],
};

export const stats: Stat[] = [
  { id: "experience", label: "Years Experience", value: 4, suffix: "+" },
  { id: "support", label: "Support Efficiency Gain", value: 40, suffix: "%" },
  { id: "tools", label: "Tools Shipped in ToolZoneX", value: 100, suffix: "+" },
  { id: "projects", label: "Open-Source Projects", value: 8 },
];

export const milestones: Milestone[] = [
  { year: "2018", label: "Graduated BE Mechanical Engineering, AMC Engineering College" },
  { year: "2021", label: "Joined NSP as an intern, then Software Test Engineer" },
  { year: "2023", label: "Promoted to Senior Software Test Engineer" },
  { year: "2024", label: "Stepped up to Test Lead and won the Innovative Visionary Award" },
  { year: "2025", label: "Moved into AI full time — GenAI, computer vision, agentic systems" },
];

// Proficiency meters are intentionally unset — add `level: 0-100` to any skill
// below to reveal its meter in the UI.
export const skillGroups: SkillGroup[] = [
  {
    category: "AI & LLMs",
    description: "Agents, retrieval, and the models behind them.",
    skills: [
      { name: "LangChain", icon: SiLangchain, description: "Multi-agent workflows & tool use" },
      { name: "Hugging Face", icon: SiHuggingface, description: "Model hosting & fine-tuning" },
      { name: "RAG", icon: FaDatabase, description: "Retrieval-augmented generation pipelines" },
      { name: "Vector DBs", icon: TbVectorTriangle, description: "Embedding storage & similarity search" },
      { name: "LLaMA", icon: SiMeta, description: "Open-weight model deployment" },
      { name: "Ollama", icon: SiOllama, description: "Local LLM inference" },
      { name: "Agentic AI", icon: FaRobot, description: "Multi-agent systems & tool-calling" },
      { name: "MCP", icon: TbPlugConnected, description: "Model Context Protocol integrations" },
      { name: "Text-to-SQL", icon: TbSql, description: "Natural-language querying over databases" },
    ],
  },
  {
    category: "Computer Vision",
    description: "Teaching systems to see, then making it fast.",
    skills: [
      { name: "YOLO", icon: FaEye, description: "Real-time detection & classification" },
      { name: "RT-DETR", icon: FaMagnifyingGlassChart, description: "Transformer-based detection" },
      { name: "DeepFace", icon: TbFaceId, description: "Facial recognition & attendance systems" },
      { name: "OpenCV", icon: SiOpencv, description: "Image processing & visual automation" },
      { name: "PyTorch", icon: SiPytorch, description: "Model training & experimentation" },
      { name: "TensorFlow", icon: SiTensorflow, description: "Production model pipelines" },
    ],
  },
  {
    category: "Backend",
    description: "APIs that carry the models to real users.",
    skills: [
      { name: "FastAPI", icon: SiFastapi, description: "High-performance async ML APIs" },
      { name: "Flask", icon: SiFlask, description: "Lightweight service endpoints" },
      { name: "REST APIs", icon: FaServer, description: "AI integration with existing systems" },
      { name: "Linux", icon: SiLinux, description: "Systems administration & tooling" },
    ],
  },
  {
    category: "Cloud & MLOps",
    description: "Getting it deployed, and keeping it up.",
    skills: [
      { name: "Azure", icon: VscAzure, description: "Cloud deployment & AI services" },
      { name: "Azure DevOps", icon: VscAzureDevops, description: "Pipelines, boards & releases" },
      { name: "GCP", icon: SiGooglecloud, description: "Managed compute & storage" },
      { name: "Docker", icon: SiDocker, description: "Reproducible ML environments" },
      { name: "Nginx", icon: SiNginx, description: "Load balancing & reverse proxying" },
    ],
  },
  {
    category: "Testing & Automation",
    description: "Four years of making sure things actually work.",
    skills: [
      { name: "Selenium", icon: SiSelenium, description: "GUI automation frameworks & Grid" },
      { name: "JMeter", icon: SiApachejmeter, description: "Performance & load testing" },
      { name: "API Testing", icon: FaVialCircleCheck, description: "SoapUI, ReadyAPI & REST suites" },
      { name: "Postman", icon: SiPostman, description: "API exploration & collections" },
      { name: "Java", icon: SiOpenjdk, description: "TestNG, Maven & Cucumber frameworks" },
    ],
  },
  {
    category: "Languages",
    description: "The tools the rest of it is written in.",
    skills: [
      { name: "Python", icon: SiPython, description: "ML, services & automation" },
      { name: "TypeScript", icon: SiTypescript, description: "Type-safe web applications" },
      { name: "JavaScript", icon: SiJavascript, description: "Interactive front-end work" },
      { name: "Jupyter", icon: SiJupyter, description: "Research, notebooks & teaching" },
    ],
  },
];

/**
 * Sourced from src/content/projects.json so the static page generator in
 * scripts/build-static.mjs renders the same list without duplicating it.
 */
export const projects: Project[] = projectsData as Project[];

export const experiences: Experience[] = [
  {
    id: "nsp-data-analyst",
    company: "NSP",
    role: "Data Analyst",
    duration: "Apr 2025 — Present",
    location: "Bengaluru, India",
    description:
      "Moved into AI full time, working across generative AI, machine learning, and computer vision.",
    tech: ["Python", "FastAPI", "RAG", "Agentic AI", "MCP", "YOLO", "DeepFace"],
    achievements: [
      "Building RAG pipelines, agentic AI systems, and Model Context Protocol integrations",
      "Shipped computer vision POCs including dent and scratch detection with YOLO",
      "Built a facial-recognition attendance system on FastAPI and DeepFace",
      "Developing a text-to-SQL agentic system for natural-language querying over databases",
    ],
  },
  {
    id: "nsp-test-lead",
    company: "NSP",
    role: "Test Lead",
    duration: "Apr 2024 — Mar 2025",
    location: "Bengaluru, India",
    description:
      "Led the test function, then moved the role toward development and generative AI.",
    tech: ["Python", "RAG", "Multi-Agent Systems", "NLP", "YOLO", "RT-DETR"],
    achievements: [
      "Designed and deployed RAG chatbots tailored to different business needs",
      "Built multi-agent systems including an AI email assistant trained on internal company knowledge",
      "Trained YOLO and RT-DETR models for real-time battery detection in manufacturing",
      "Engineered retail analytics for customer entry/exit, store heatmaps, and dwell time",
      "Built a visual regression tool comparing web snapshots across releases",
    ],
  },
  {
    id: "nsp-senior-test",
    company: "NSP",
    role: "Senior Software Test Engineer",
    duration: "Apr 2023 — Mar 2024",
    location: "Bengaluru, India",
    description:
      "Built the automation frameworks adopted across multiple project teams.",
    tech: ["Python", "Java", "Selenium", "Allure", "JMeter", "CI/CD"],
    achievements: [
      "Designed automation frameworks with Python, Java, Selenium, Requests, Allure and the Page Object Model",
      "Integrated frameworks into CI/CD pipelines with automated report sharing to stakeholders",
      "Ran hands-on training on Selenium 4, Python, and modern QA practices to lift team capability",
      "Introduced performance testing with JMeter alongside security and accessibility work",
    ],
  },
  {
    id: "nsp-test-engineer",
    company: "NSP",
    role: "Software Test Engineer",
    duration: "Sep 2021 — Apr 2023",
    location: "Bengaluru, India",
    description:
      "Manual, API, and automation testing across Agile delivery teams.",
    tech: ["SoapUI", "ReadyAPI", "Python", "Bitbucket"],
    achievements: [
      "Wrote a migration script moving the team off paid ReadyAPI to SoapUI, cutting licence costs across multiple devices",
      "Developed reusable scripts that improved testing efficiency and consistency",
      "Implemented automation pipelines to streamline testing and deployment",
    ],
  },
  {
    id: "nsp-intern",
    company: "NSP",
    role: "Intern",
    duration: "Jul 2021 — Aug 2021",
    location: "Bengaluru, India",
    description:
      "Trained on the Aria Systems billing platform, web services, and automation frameworks.",
    tech: ["Java", "Selenium", "TestNG", "SoapUI", "WebdriverIO"],
    achievements: [
      "Converted manual SoapUI scripts into automated tests with Java, Selenium and TestNG",
      "Added parallel cross-browser execution to the existing framework using Selenium Grid",
      "Delivered a proof of concept with JavaScript, WebdriverIO, Mocha, Chai and Allure",
    ],
  },
  {
    id: "zestmoney",
    company: "ZestMoney",
    role: "Collections Associate",
    duration: "Oct 2019 — Nov 2020",
    location: "Bengaluru, India",
    description:
      "Started in collections operations and ended up automating most of the team's repetitive work.",
    tech: ["Python", "Selenium", "Tkinter", "Salesforce"],
    achievements: [
      "Built Python and Selenium automation to bulk-send payment links and messages through Salesforce CRM",
      "Wrapped it in a Tkinter GUI so non-technical teammates could run it themselves",
      "Automation drove a 68% increase in team productivity and pushed company-wide adoption of automation",
    ],
  },
  {
    id: "ventures",
    company: "HomeBox · Flying Indian 20 · Iron Stag India",
    role: "Founder",
    duration: "2019 — 2021",
    location: "Bengaluru, India",
    description:
      "Founded and ran three small businesses alongside studying and early tech roles.",
    tech: ["Operations", "Logistics", "E-commerce", "Web"],
    achievements: [
      "HomeBox: built the site, database and ops system for a lockdown storage and delivery service — 1,000+ orders and ₹10.8 lakhs in revenue",
      "Flying Indian 20: custom apparel printing serving 20+ clients across 87+ orders",
      "Iron Stag India: premium wooden clocks and décor, 50+ units sold offline plus Flipkart and Amazon listings",
    ],
  },
];

export const education: Education[] = [
  {
    id: "edu-amc",
    school: "AMC Engineering College",
    degree: "BE, Mechanical Engineering",
    duration: "2014 — 2018",
    location: "Bengaluru, India",
    description:
      "Graduated in mechanical engineering, then moved into software through testing and automation.",
  },
  {
    id: "edu-jain",
    school: "Sri Bhagawan Mahaveer Jain College",
    degree: "Pre-University, Computer Science",
    duration: "2012 — 2014",
    location: "Bengaluru, India",
  },
];

export const awards: Award[] = [
  {
    id: "award-nsplus-visionary",
    title: "Innovative Visionary Award",
    organization: "NSPLUS Technologies",
    date: "2024",
    description:
      "Recognized for innovation in applied AI work delivered at NSPLUS Technologies.",
    icon: FaTrophy,
  },
  {
    id: "award-collaboration",
    title: "Collaboration Excellence",
    organization: "NSPLUS Technologies",
    description:
      "Recognized for team leadership and knowledge transfer across the engineering team.",
    icon: FaUsers,
  },
];

// TODO(punit): issuers and dates weren't on the LinkedIn export for most of
// these — add `organization`, `date`, and `credentialUrl` where you have them
// and the UI fills those details in automatically.
export const certifications: Certification[] = [
  {
    id: "cert-awsome-day",
    name: "AWSome Day Online Conference",
    organization: "Amazon Web Services",
    icon: FaRocket,
  },
  {
    id: "cert-sentiment-analysis",
    name: "Sentiment Analysis using Python",
    icon: FaCertificate,
  },
  {
    id: "cert-scrum-foundation",
    name: "Scrum Foundation Course",
    icon: FaCertificate,
  },
  {
    id: "cert-it-troubleshooting",
    name: "Advanced IT Troubleshooting for Helpdesk Support Technicians",
    icon: FaCertificate,
  },
  {
    id: "cert-wordpress",
    name: "WordPress Website Developer Course",
    icon: FaCertificate,
  },
];
