export interface BoardMember {
  name: string;
  role: string;
  major: string;
  position: string;
  interests: string;
  imageUrl: string;
  linkedIn: string;
}

export const executiveTeam: BoardMember[] = [
  {
    name: "Srinidhi Sathish",
    role: "President",
    major: "Computer Science",
    position: "",
    interests: "",
    imageUrl: "/images/board/Srin-Sathish.png",
    linkedIn: "https://www.linkedin.com/in/srinidhi-sathish-44457625b/"
  },
  {
    name: "Mitali Gaidhani",
    role: "Internal Vice President",
    major: "Computer Science",
    position: "",
    interests: "",
    imageUrl: "/images/board/mitalinew.jpg",
    linkedIn: "https://www.linkedin.com/in/mitali-gaidhani/"
  },
  {
    name: "Aakash Senthilnathan",
    role: "External Vice President",
    major: "Statistics & Data Science",
    position: "",
    interests: "",
    imageUrl: "/images/board/AakashS.jpg",
    linkedIn: "https://www.linkedin.com/in/aakashsenthilnathan/"
  },
  {
    name: "Makala Mesina-Forster",
    role: "Marketing Vice President",
    major: "Statistics & Data Science",
    position: "",
    interests: "",
    imageUrl: "/images/board/Makala_Mesina-Forester.jpg",
    linkedIn: "https://www.linkedin.com/in/makala-mesina-forester-617013272/"
  },
];

export const techDevTeam: BoardMember[] = [
  {
    name: "Clement Boiteux",
    role: "Director of Technical Development",
    major: "Computer Engineering",
    position: "",
    interests: "",
    imageUrl: "/images/board/clementnew.jpg",
    linkedIn: "https://www.linkedin.com/in/clement-boiteux/"
  },
  {
    name: "Kayura Narayanan",
    role: "Director of Technical Development",
    major: "Statistics & Data Science, Applied Mathematics",
    position: "",
    interests: "",
    imageUrl: "/images/board/Kayura-Narayanan.jpeg",
    linkedIn: "https://www.linkedin.com/in/kayura-narayanan/"
  },
  {
    name: "Jakob Ramirez",
    role: "Director of Technical Development",
    major: "Statistics & Data Science",
    position: "",
    interests: "",
    imageUrl: "/images/board/jakob-new.png",
    linkedIn: "https://www.linkedin.com/in/jakobramirezinfo/"
  },
  {
    name: "Kishan Goli",
    role: "Director of Website Development",
    major: "Statistics & Data Science",
    position: "",
    interests: "Poker, Music",
    imageUrl: "/images/board/kishannew.png",
    linkedIn: "https://www.linkedin.com/in/kishangoli/"
  },
  
];

export const marketingAndOperationsTeam: BoardMember[] = [
  {
    name: "Satvik Talchuru",
    role: "Director of Operations",
    major: "Statistics & Data Science, Economics",
    position: "",
    interests: "",
    imageUrl: "/images/board/Satvik-Talchuru.png",
    linkedIn: "https://www.linkedin.com/in/satviktalchuru/"
  },
  {
    name: "Nini Yen",
    role: "Director of Professional Development",
    major: "Computer Science",
    position: "",
    interests: "",
    imageUrl: "/images/board/nininew.png",
    linkedIn: "https://www.linkedin.com/in/hsin-ni-yen/"
  },
  {
    name: "Rachna Bokka",
    role: "Director of Industry Relations",
    major: "Statistics & Data Science",
    position: "",
    interests: "",
    imageUrl: "/images/board/rachnanew.jpg",
    linkedIn: "https://www.linkedin.com/in/rachna-bokka-406a04229/"
  },
  {
    name: "Lance Sanchez",
    role: "Director of Industry Relations",
    major: "Statistics & Data Science",
    position: "",
    interests: "",
    imageUrl: "/images/board/Lance-Sanchez.jpeg",
    linkedIn: "https://www.linkedin.com/in/lancesanchez2103/"
  },
  {
    name: "Elijah Shackleford",
    role: "Director of Events",
    major: "Statistics & Data Science, Communications",
    position: "",
    interests: "",
    imageUrl: "/images/board/Elijah-Shackleford.jpeg",
    linkedIn: "https://www.linkedin.com/in/elijah-shackleford-247393359/"
  },
  {
    name: "Jocelyn Lee",
    role: "Director of Events",
    major: "Statistics & Data Science",
    position: "",
    interests: "",
    imageUrl: "/images/board/Jocelyn-Lee.jpg",
    linkedIn: "https://www.linkedin.com/in/jocelyn-lee-2a6436326/"
  },
  {
    name: "Irayna Lin",
    role: "Director of Communications",
    major: "Statistics & Data Science",
    position: "",
    interests: "",
    imageUrl: "/images/board/Irayna-Lin.jpeg",
    linkedIn: "https://www.linkedin.com/in/irayna-lin/"
  },
  {
    name: "Catherine Li",
    role: "Director of Design",
    major: "Communications",
    position: "",
    interests: "",
    imageUrl: "/images/board/Catherine-Li.jpg",
    linkedIn: "https://www.linkedin.com/in/catherineliyin/"
  },
];

export const boardMembers = [
  ...executiveTeam,
  ...techDevTeam,
  ...marketingAndOperationsTeam,
];

export default boardMembers;
