import image1 from "../assets/images/iphone1.png";
import image2 from "../assets/images/iphone2.png";
import image3 from "../assets/images/iphone3.png";
import image4 from "../assets/images/image4.png";
import blackIcon1 from "../assets/images/black-icon-1.png";
import blackIcon2 from "../assets/images/black-icon-2.png";
import blackIcon3 from "../assets/images/black-icon-3.png";
import blackIcon4 from "../assets/images/black-icon-4.png";
import blackIcon5 from "../assets/images/black-icon-5.png";
import blackIcon6 from "../assets/images/black-icon-6.png";
import greenIcon1 from "../assets/images/green-icon-1.png";
import greenIcon2 from "../assets/images/green-icon-2.png";
import greenIcon3 from "../assets/images/green-icon-3.png";
import greenIcon4 from "../assets/images/green-icon-4.png";
import greenIcon5 from "../assets/images/green-icon-5.png";
import greenIcon6 from "../assets/images/green-icon-6.png";

export const coreComponentsData = [
  {
    title: "Document Management",
    admins:
      "Admin users have capabilities to create, manage, and update documentation with robust search and filtering to ensure relevancy and timeliness.",
    users: "General users can access, read, and download up-to-date EH&S documents critical to their roles and responsibilities.",
    image: image1,
  },
  {
    title: "Safety Training",
    admins:
      "Admin users can curate and customize training modules, develop quizzes to assess knowledge retention, and track employee training progress.",
    users:
      "Employees can readily access training content, complete assessments, and receive instant feedback, empowering them to engage actively with safety protocols.",
    image: image2,
  },
  {
    title: "Incident Reporting",
    admins: "Admin users can manage incident reports, analyze data trends, and implement preventive measures based on insightful analytics.",
    users: "Employees can report incidents and near-misses through a user-friendly interface, contributing to a proactive safety culture.",
    image: image3,
  },
  {
    title: "User Management",
    admins:
      "Admins have oversight of user profiles, with the ability to monitor and manage access rights and user activities within the EH&S system.",
    users: "",
    image: image4,
  },
];

// export const digiCardsData = [
//   {
//     blackIcon: blackIcon1,
//     greenIcon: greenIcon1,
//     title: "Enhanced Accessibility",
//     text: "Digital platforms ensure that essential safety documents, training modules, and reporting tools are readily available to all stakeholders, irrespective of their location.",
//   },
//   {
//     blackIcon: blackIcon2,
//     greenIcon: greenIcon2,
//     title: "Improved Compliance and Risk Management",
//     text: "Automating compliance tasks reduces human error and provides a defensible audit trail. Risk assessments are dynamic, incorporating real-time data to make informed decisions.",
//   },
//   {
//     blackIcon: blackIcon3,
//     greenIcon: greenIcon3,
//     title: "Efficient Training and Development",
//     text: "Digitally managed training programs offer interactive and adaptive learning experiences, leading to higher engagement and retention rates.",
//   },
//   {
//     blackIcon: blackIcon4,
//     greenIcon: greenIcon4,
//     title: "Proactive Incident Management",
//     text: "A streamlined incident reporting system facilitates quick response times and more effective incident investigations and resolutions.",
//   },
//   {
//     blackIcon: blackIcon5,
//     greenIcon: greenIcon5,
//     title: "Data-Driven Insights",
//     text: "The aggregation of EH&S data in a centralized platform empowers organizations to derive actionable insights and foresight, driving continuous improvement.",
//   },
//   {
//     blackIcon: blackIcon6,
//     greenIcon: greenIcon6,
//     title: "Cost Reduction",
//     text: "By reducing the reliance on paper, minimizing administrative overhead, and optimizing resource allocation, digital EH&S platforms can significantly cut costs.",
//   },
// ];

export const digiCardsData = [
  {
    blackIcon: blackIcon1,
    greenIcon: greenIcon1,
    title: "Enhanced \nAccessibility ",
    text: "Digital platforms ensure that\n essential safety documents, training\n modules, and reporting tools are\n readily available to all stakeholders,\n irrespective of their location.",
  },
  {
    blackIcon: blackIcon2,
    greenIcon: greenIcon2,
    title: "Improved Compliance and\n Risk Management",
    text: "Automating compliance tasks reduces\n human error and provides a defensible\n audit trail. Risk assessments are\n dynamic, incorporating real-time data\n to make informed decisions.",
  },
  {
    blackIcon: blackIcon3,
    greenIcon: greenIcon3,
    title: "Efficient Training and\n Development",
    text: "Digitally managed training programs\n offer interactive and adaptive learning\n experiences, leading to higher\n engagement and retention rates.",
  },
  {
    blackIcon: blackIcon4,
    greenIcon: greenIcon4,
    title: "Proactive Incident\nManagement",
    text: "A streamlined incident reporting\n system facilitates quick response\n times and more effective incident\n investigations and resolutions.",
  },
  {
    blackIcon: blackIcon5,
    greenIcon: greenIcon5,
    title: "Data-Driven\nInsights",
    text: "The aggregation of EH&S data in a\n centralized platform empowers\n organizations to derive actionable\n insights and foresight, driving\n continuous improvement.",
  },
  {
    blackIcon: blackIcon6,
    greenIcon: greenIcon6,
    title: "Cost\nReduction",
    text: "By reducing the reliance on paper,\n minimizing administrative overhead,\n and optimizing resource allocation,\n digital EH&S platforms can\n significantly cut costs.",
  },
];

export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
