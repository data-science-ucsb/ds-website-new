export interface BoardMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedIn: string;
}

export const executiveTeam: BoardMember[] = [
  {
    name: "Krish Agarwal",
    role: "Co-president",
    bio: "Hey everyone! My name is Krish Agarwal and I am a fourth year Computer Science major from the Bay Area. I enjoy playing Badminton and Volleyball, collecting colognes, and keeping up with anything kpop/kdrama related. I have been a part of the club since my freshman year and I joined to gain real life data science experience outside of the classroom but I have also been able to find a community and make close friends through my time as an officer.",
    imageUrl: "/images/board/krish-agarwal.jpg",
    linkedIn: "https://www.linkedin.com/in/kshitij-ucsb/",
  },
  {
    name: "Samantha Su",
    role: "Co-president",
    bio: "Hi, I’m Sam, and I’m thrilled to serve as the Co-President for the upcoming year! Data Science UCSB has been a transformative experience in my college career, igniting my passion for giving back to our community through human-centric approaches that drive valuable impact. I’m excited to meet all the members and collaborate on awesome data-related projects! Feel free to reach out on Discord or Instagram if you’d like to chat!",
    imageUrl: "/images/board/samantha-su.jpg",
    linkedIn: "https://www.linkedin.com/in/samanthasu516/"
  },
];

export const marketingAndOperationsTeam: BoardMember[] = [
  {
    name: "Diya Vij",
    role: "Director of Operations",
    bio: "Hi! I’m a second year Statistics and Data Science major & Math minor from the Bay Area. I joined the Data Science club to work on projects to practice programming and working with data sets, and meet a like-minded community of people. Excited to meet you all!",
    imageUrl: "/images/board/diya-vij.jpg",
    linkedIn: "https://www.linkedin.com/in/diya-vij-916a30167/"
  },
  {
    name: "Jeffrey Cao",
    role: "Director of Professional Development",
    bio: "Hello! I am a third year Computer Science Major from the Bay Area. I enjoy cooking, anime, and hanging out with friends. I joined Data Science to explore my interests in the intersections of technology and humanities. Since then, I’ve gained a lot of valuable technical experience, as well as a place to call home. I’m looking forward to meeting everyone throughout the year!",
    imageUrl: "/images/board/jeffrey-cao.jpg",
    linkedIn: "https://www.linkedin.com/in/sparklyjeff/"
  },
  {
    name: "Srinidhi Sathish",
    role: "Director of Communications",
    bio: "Hi! I’m a 2nd year Statistics & Data Science major from San Jose. I joined the club in order to develop my data science skills, work on projects, and be a part of a friendly and supportive community. In my free time, I enjoy hiking, playing soccer, and reading!",
    imageUrl: "/images/board/srinidhi-sathish.jpg",
    linkedIn: "https://www.linkedin.com/in/srinidhi-sathish-44457625b/"
  },
  {
    name: "Chloe Tse",
    role: "Director of Design",
    bio: "Hello! I’m from the Bay Area and I love exploring new restaurants. I joined DS Club to meet new people and enhance my professional skill set. I am interested in pursuing a career in Management Consulting or Product Management. I am excited to explore creative opportunities as the Director of Design this year.",
    imageUrl: "/images/board/chloe-tse.jpg",
    linkedIn: "https://www.linkedin.com/in/chloetsehy/" 
  },
  {
    name: "Irena Wong",
    role: "Director of Events",
    bio: "Hi! I’m Irena, a third-year pursuing Statistics and Data Science with a minor in Applied Psychology. I’m so excited to serve as your Director of Events, and I strive to build a tight-knit community amongst our members through various events and socials. Having grown up in the Bay Area, I learned to love technology and writing, discovering data science as a way of using code to tell stories about data. In the future, I aspire to further explore machine learning in order to draw insights about the world around me. But for now, I can’t wait to meet all of you and help create lasting memories :)",
    imageUrl: "/images/board/irena-wong.jpg",
    linkedIn: "https://www.linkedin.com/in/irenawong/"
  },
  {
    name: "Winbert Zhang",
    role: "Director of Finance",
    bio: "Hi everyone, I’m a third year Computer Science major from the Bay Area. Some of my hobbies include cooking, hiking, and board games. I joined Data Science club to learn more about data science and join a community of friendly and curious people with similar interests.",
    imageUrl: "/images/board/winbert-zhang.jpg",
    linkedIn: "https://www.linkedin.com/in/winbert/"
  },
];

export const techDevTeam: BoardMember[] = [
  {
    name: "Mateo Wang",
    role: "Project Group Director",
    bio: "Hi! I’m a fourth-year CS major at UCSB from San Jose. I have a deep passion for all things data science and web development. The way I approach learning and solving problems is diving headfirst: understand the landscape of what you’re trying to learn or create and just do it, learning as you go. When I’m not working on side projects or cramming homework last minute, you can find me improvising on the dorm lounge pianos or running on the beautiful SB beaches!",
    imageUrl: "/images/board/mateo-wang.jpg",
    linkedIn: "https://www.linkedin.com/in/mateo-wang/"
  },
  {
    name: "Tanay Biradar",
    role: "Director of Technical Development",
    bio: "I’m a 2nd year CS major who loves building cool things with computers! I’ve spent years writing + deploying full-stack web apps and training ML models to fly planes. My interest in data privacy has led me to build and maintain servers for a homelab. I also love teaching and getting others as excited about CS as I do!",
    imageUrl: "/images/board/tanay-biradar.jpg",
    linkedIn: "https://www.linkedin.com/in/tanayb11/"
  },
  {
    name: "Mitali Gaidhani",
    role: "Director of Technical Development",
    bio: "I’m a second year Computing (CCS) major from the Bay Area. I’m interested in interdisciplinary applications of data science. More specifically, leveraging machine learning to make valuable and innovative contributions to other disciplines. In my free time, I enjoy baking, painting, and any other creative activities. I’m excited to meet the UCSB Data Science community this year!",
    imageUrl: "/images/board/mitali-gaidhani.jpg",
    linkedIn: "https://www.linkedin.com/in/mitali-gaidhani/"
  },
  {
    name: "Daniel Naylor",
    role: "Director of Technical Development",
    bio: "I’m a CCS student interested in mathematics. My focus is largely applied math, especially in fields such as statistics, machine learning, and computer science. I have a passion for both learning and teaching, having worked extensively as a tutor, and I plan on applying these skills in applied math research throughout the coming school years.",
    imageUrl: "/images/board/daniel-naylor.jpg",
    linkedIn: "https://www.linkedin.com/in/daniel-t-naylor/"
  },
];

export const interns: BoardMember[] = [ 
  {
    name: "Sterling Hsu",
    role: "Events Intern",
    bio: "I’m a first-year CS major who loves learning about how we can use software to help optimize our lives, in every form from personal assistants to government-level data analysis programs. That mission’s led me to the very fun field of machine learning, where I hope to do some great research work. I’m also super interested in the history of computers, the best ways to use them, and being a real nerd about both!",
    imageUrl: "/images/board/sterling-hsu.png",
    linkedIn: "https://www.linkedin.com/in/sterlinghsu/" 
  },
  {
    name: "Aliza Samad",
    role: "Outreach Intern",
    bio: "I’m a first year Stats & DS major interested in learning more about the intersection of data analytics and business administration! I hope that my interest in business analytics as well as the experience I will gain as outreach intern will help prepare me for a future career in business I don’t have much programming experience, but I am excited to develop some of those skills this year with the club through the various projects that will be offered in the coming quarters.",
    imageUrl: "/images/board/aliza-samad.png",
    linkedIn: "https://www.linkedin.com/in/aliza-samad-data-analyst/" 
  },
  {
    name: "Lance Sanchez",
    role: "Coding Intern",
    bio: "I am a 1st-year Statistics and Data Science major interested specifically in big data in healthcare. I am excited to learn something new every day about data science during my time here at UCSB and the Data Science Club. I also enjoy data visualization and writing about data, leading me to become interested in data journalism. I hope to become more knowledgeable in my field and hopefully, one day be able to teach others about the fascinating world of data science in near the future! I listen to many genres of music, but my favorite song to chill to is probably From the Start by Laufey!",
    imageUrl: "/images/board/lance-sanchez.png",
    linkedIn: "https://www.linkedin.com/in/rolando-sanchez-iii-3bb6b227b/"
  },
  {
    name: "Clement Boiteux",
    role: "Web Development Intern",
    bio: "Hi, I’m Clement and I’m a first-year Computer Engineering major from San Jose who's passionate about using technology to solve problems and simplify our lives. My 3 most favorite programming languages are Java, Python, and C++. I’m interested in discovering the intersection of AI and system software to build smarter computers. I'm also very excited to learn web dev technologies to improve the website so users have a better experience! My most favorite foods are ramen, boba, and ice cream. In my free time, I like watching movies, playing 8-ball, and biking.",
    imageUrl: "/images/board/clement-boiteux.png",
    linkedIn: "https://www.linkedin.com/in/clement-boiteux/"
  },
];

export const boardMembers = [
  ...executiveTeam,
  ...marketingAndOperationsTeam,
  ...techDevTeam,
  ...interns
];

export default boardMembers;
