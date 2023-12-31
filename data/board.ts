export interface BoardMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export const executiveTeam: BoardMember[] = [
  {
    name: "Krish Agarwal",
    role: "Co-president",
    bio: "Hey everyone! My name is Krish Agarwal and I am a fourth year Computer Science major from the Bay Area. I enjoy playing Badminton and Volleyball, collecting colognes, and keeping up with anything kpop/kdrama related. I have been a part of the club since my freshman year and I joined to gain real life data science experience outside of the classroom but I have also been able to find a community and make close friends through my time as an officer.",
    imageUrl: "/images/board/krish-agarwal.jpg",
  },
  {
    name: "Mateo Wang",
    role: "Co-president",
    bio: "Hi! I’m a fourth-year CS major at UCSB from San Jose. I have a deep passion for all things data science and web development. The way I approach learning and solving problems is diving headfirst: understand the landscape of what you’re trying to learn or create and just do it, learning as you go. When I’m not working on side projects or cramming homework last minute, you can find me improvising on the dorm lounge pianos or running on the beautiful SB beaches!",
    imageUrl: "/images/board/mateo-wang.jpg",
  },
  {
    name: "Samantha Su",
    role: "Vice president",
    bio: "Hi, I’m Sam, and I’m thrilled to serve as the VP for the upcoming year! Data Science UCSB has been a transformative experience in my college career, igniting my passion for giving back to our community through human-centric approaches that drive valuable impact. I’m excited to meet all the members and collaborate on awesome data-related projects! Feel free to reach out on Discord or Instagram if you’d like to chat!",
    imageUrl: "/images/board/samantha-su.jpg",
  },
];

export const marketingAndOperationsTeam: BoardMember[] = [
  {
    name: "Diya Vij",
    role: "Director of Operations",
    bio: "Hi! I’m a second year Statistics and Data Science major & Math minor from the Bay Area. I joined the Data Science club to work on projects to practice programming and working with data sets, and meet a like-minded community of people. Excited to meet you all!",
    imageUrl: "/images/board/diya-vij.jpg",
  },
  {
    name: "Jeffrey Cao",
    role: "Director of Professional Development",
    bio: "Hello! I am a third year Computer Science Major from the Bay Area. I enjoy cooking, anime, and hanging out with friends. I joined Data Science to explore my interests in the intersections of technology and humanities. Since then, I’ve gained a lot of valuable technical experience, as well as a place to call home. I’m looking forward to meeting everyone throughout the year!",
    imageUrl: "/images/board/jeffrey-cao.jpg",
  },
  {
    name: "Srinidhi Sathish",
    role: "Director of Communications",
    bio: "Hi! I’m a 2nd year Statistics & Data Science major from San Jose. I joined the club in order to develop my data science skills, work on projects, and be a part of a friendly and supportive community. In my free time, I enjoy hiking, playing soccer, and reading!",
    imageUrl: "/images/board/srinidhi-sathish.jpg",
  },
  {
    name: "Chloe Tse",
    role: "Director of Design",
    bio: "Hello! I’m from the Bay Area and I love exploring new restaurants. I joined DS Club to meet new people and enhance my professional skill set. I am interested in pursuing a career in Management Consulting or Product Management. I am excited to explore creative opportunities as the Director of Design this year.",
    imageUrl: "/images/board/chloe-tse.jpg",
  },
  {
    name: "Irena Wong",
    role: "Director of Events",
    bio: "Hi! I’m Irena, a third-year pursuing Statistics and Data Science with a minor in Applied Psychology. I’m so excited to serve as your Director of Events, and I strive to build a tight-knit community amongst our members through various events and socials. Having grown up in the Bay Area, I learned to love technology and writing, discovering data science as a way of using code to tell stories about data. In the future, I aspire to further explore machine learning in order to draw insights about the world around me. But for now, I can’t wait to meet all of you and help create lasting memories :)",
    imageUrl: "/images/board/irena-wong.jpg",
  },
  {
    name: "Winbert Zhang",
    role: "Director of Finance",
    bio: "Hi everyone, I’m a third year Computer Science major from the Bay Area. Some of my hobbies include cooking, hiking, and board games. I joined Data Science club to learn more about data science and join a community of friendly and curious people with similar interests.",
    imageUrl: "/images/board/winbert-zhang.jpg",
  },
];

export const projectPipelineDirectors: BoardMember[] = [
  {
    name: "Tanay Biradar",
    role: "Project Group",
    bio: "I’m a 2nd year CS major who loves building cool things with computers! I’ve spent years writing + deploying full-stack web apps and training ML models to fly planes. My interest in data privacy has led me to build and maintain servers for a homelab. I also love teaching and getting others as excited about CS as I do!",
    imageUrl: "/images/board/tanay-biradar.jpg",
  },
  {
    name: "Mitali Gaidhani",
    role: "Intermediate Pipeline Director",
    bio: "I’m a second year Computing (CCS) major from the Bay Area. I’m interested in interdisciplinary applications of data science. More specifically, leveraging machine learning to make valuable and innovative contributions to other disciplines. In my free time, I enjoy baking, painting, and any other creative activities. I’m excited to meet the UCSB Data Science community this year!",
    imageUrl: "/images/board/mitali-gaidhani.jpg",
  },
  {
    name: "Daniel Naylor",
    role: "Beginner Pipeline Director",
    bio: "I’m a CCS student interested in mathematics. My focus is largely applied math, especially in fields such as statistics, machine learning, and computer science. I have a passion for both learning and teaching, having worked extensively as a tutor, and I plan on applying these skills in applied math research throughout the coming school years.",
    imageUrl: "/images/board/daniel-naylor.jpg",
  },
];

export const boardMembers = [
  ...executiveTeam,
  ...marketingAndOperationsTeam,
  ...projectPipelineDirectors,
];

export default boardMembers;
