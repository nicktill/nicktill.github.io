import GradeMyAid from "../assets/img/GradeMyAid.png";
import CryptoTracker from "../assets/img/CryptoTracker.png";
import YTRecap from "../assets/img/ytlight.png";
import Translator from "../assets/img/translator.png";
import Portfolio from "../assets/img/portfolio.png";

const data = [
  {
    id: 1,
    title: "YTRecap",
    image: YTRecap,
    description:
      "YTRecap is a web app that summarizes YouTube videos in seconds, regardless of their length by using the videos closed captions and other meta data and passing them to an NLP large language model (https://ytrecap.org)",
    projectUrl: "https://ytrecap.org",
    githubUrl: "https://github.com/nicktill/ytrecap",
  },
  {
    id: 2,
    title: "GradeMyAid",
    image: GradeMyAid,
    description:
      "GradeMyAid is a webapp that compares FAFSA scholarship data among various institutions, enabling users to assess and compare their awards to others, providing insights into each school's offerings. (https://grademyaid.com)",
    projectUrl: "https://grademyaid.com",
    githubUrl: "https://github.com/nicktill/cs1530-finance-group",
  },
  {
    id: 3,
    title: "CryptoTracker",
    image: CryptoTracker,
    description:
      "A comprehensive dashboard for tracking cryptocurrency prices and market data (including the option to sort by market cap, price, volume, and highest/lowest price change)",
    projectUrl: "https://crypto-tracker-nicktill.vercel.app/",
    githubUrl: "https://github.com/nicktill/crypto-tracker",
  },
  {
    id: 4,
    title: "Translator",
    image: Translator,
    description:
      "A simple web app that translates text between fifty+ languages with text-to-speech support for all languages",
    projectUrl: "https://translator-app-nicktill.vercel.app/",
    githubUrl: "https://github.com/nicktill/translator-app",
  },
  {
    id: 5,
    title: "Portfolio Website",
    image: Portfolio,
    description:
      "Personal Portfolio Website Showcasing Projects (this site), this website took far too much CSS... but I'm proud of it! 👾 ",
    projectUrl: "https://nicktill.github.io",
    githubUrl: "https://github.com/nicktill/nicktill.github.io",
  },
];

export default data;
