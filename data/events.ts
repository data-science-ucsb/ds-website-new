import { description } from "./siteMetadata";

const events = [
  {
    title: "Fall 2024 Data Science UCSB Career Fair",
    description: "We're going to host our 3rd annual Data Science UCSB Career Fair!",
    longDescription: "We will host this event virtually on October 25, 2024 from 10am-4pm. For more details about event logistics and pricing, go to the Career Fair tab!",
    date: "October 25, 2024",
    imageUrl: "/images/careerfair24/2024-career-fair-logo.png",
    expandedImage: "/images/careerfair24/2024-career-fair-logo.png"
  },
  {
    title: "Fall 2023 Data Science UCSB Career Fair",
    description:
      "We hosted our second annual Data Science UCSB Career Fair over Zoom!",
    longDescription: "This year, we hosted Data Science UCSB's 2nd annual career fair over Zoom. The companies that attended were Contentstack, Bloom Energy, AppFolio, Pacific Life, AT&T, and Capital Insurance Group.\n\n Students got to participate in information sessions as well as 1-on-1's with recruiters from each of the companies.\n\n We took a lot of the learnings we gained from our first year hosting our career fair and this is our most successful and organized career fair ever. We cannot wait to continue hosting more in future years!\n\n Thank you to everyone who came out!",
    date: "October 20, 2023",
    imageUrl: "/images/careerfair23/2023-career-fair.jpeg",
    expandedImage: "/images/careerfair23/f23-career-fair-pl-info-sesh.png"
  },
  {
    title: "Fall 2023 Data Science UCSB Welcome Social",
    description:
      "We hosted our welcome social on the student health lawn with free pizza and soda!",
    longDescription: "For our first social of the year, Data Science UCSB welcomed our members to pizza on Sunday October 7th from 4pm - 6pm. Members got the chance to get one another outside of the academic realm and make new connections in a social atmosphere.\n\n Thank you to all of our members that came out to this event!",
    date: "October 07, 2023",
    imageUrl: "/images/blog2023-24/f23-welcome-social.png",
    expandedImage: "/images/blog2023-24/f23-welcome-social.png"
  },
  {
    title: "Date-A Science 2023",
    description: "Speed dating event for our new members!",
    longDescription: "We got a chance to meet our incoming members and bond with our staff! Members got the opportunity to make new friends and win prizes from Bingo! We hope to meet with you guys in-person once school starts.",
    date: "September 03, 2023",
    imageUrl: "/images/date-a-science-2023.png",
    expandedImage: "/images/date-a-science-2023.png"
  },
  {
    title: "Alumni August 2023",
    description:
      "Weekly panel of UCSB alumni sharing their experiences with data science before and after graduating!",
    longDescription: "Earlier this month, our data science club was fortunate to host a panel of alumni back on campus to share their experiences and provide advice to current students. The panelists were Talah Cummins who is a Senior Product Analyst @ Visa and Co-Founder at PoolUp, Phi Do who is a Data & Graphics Journalist @ LA Times, Erik Vargas who is an Operations Research Analyst @ US Navy, \n\n A key theme was the importance of networking and making connections in the data science community. Our alumni emphasized seeking out mentors both at work and through professional associations. They also recommended networking with alumni from our program, reaching out cold via LinkedIn or email.\n\n In terms of finding that first job, alumni advised students to cast a wide net and apply broadly. Though it can be challenging to get your foot in the door, once you secure that first data science role, doors continue opening in the future. When evaluating job offers, consider opportunities for growth and learning.\n\n We are proud of our accomplished alumni and thank them for giving back to the data science club. Their journey demonstrates the breadth of career paths enabled by a data science education. For current students, their insights help prepare us for the next step after graduation.",
    date: "August 21, 2023",
    imageUrl: "/images/alumni-august-2023-ss0.png",
    expandedImage: "/images/alumni-august-2023-ss0.png"
  },
  {
    title: "Ice Skating Social 2023",
    description:
      "Our end-of-the-year social at the Ice in Paradise skating rink!",
    longDescription: "Members came out on to night a Tuesday niught to enjoy pizza, ice skating, and socializing with their fellow members.\n\n We had a great time skating with everyone and announcing the family standing and prizes! We can't wait to see you all next year!  ",
    date: "May 16, 2023",
    imageUrl: "/images/blog2022-23/ice-skate-cover.jpg",
    expandedImage: "/images/blog2022-23/ice-skate-pic.jpg"
  },
  {
    title: "2023 Project Showcase",
    description: "The 2023 Data Science UCSB Project Showcase was a success!",
    longDescription: "The 2023 Data Science UCSB Project Showcase was a success! To start off the event, our club members presented their data science projects for a chance to win cash prizes from our company sponsors.\n\n Congratulations to  ViewTube, Correkt, AI Art Detector, Movie Character Matching, Emo-Jeneration/TwitterTwin, Pylot, Blendify, Netflix Recommendation System, SlangSwitch, Species Classification, Noteblockit, Optimizing San Diego MTS, SentimentSub, and Sonic Sort for presenting in the showcase! The projects this year were outstanding. Special shoutout to Optimizing San Diego MTS and SlangSwitch for winning the top prizes!\n\n Following the project presentations, we held a catered lunch and a postering session outside Corwin Pavilion for everyone involved. To finish off the day, we held a networking event for all students and faculty interested in data science.\n\n We are so thankful for Evidation Health, Jackpocket, Adstra, and Microsoft for sponsoring this event. See you all in the fall!",
    date: "April 20, 2023",
    imageUrl: "/images/blog2022-23/ds_ps_cover.jpg",
    expandedImage: "/images/blog2022-23/ds_ps_img.jpg"
  },
  {
    title: "2022 Big Little Family Reveal",
    description:
      "Our Big Little program kicked off with the Family Reveal and some friendly competition!",
    longDescription: "The Big Little Family program kicked off on Friday with a reveal and some games to help the families earn some points to show that they are the SUPERIOR family!\n\n The current ranking (post family reveal) is as follows:\n 1. Blue: 20\n 2. Orange: 9\n 2. Purple: 9\n 3. Green: 8\n 3. Beige: 8\n 3. Rainbow: 8\n 4. Red: 6\n 5 Gray: 5\n 6. Gold: 4\n 6. Pink: 4\n 7. Yellow: 3\n\nWe can't wait to see how this friendly family comptetition progresses!!  ",
    date: "November 04, 2022",
    imageUrl: "/images/blog2022-23/f22-big-little-family-reveal-thumbnail.jpg",
    expandedImage: "/images/blog2022-23/f22-big-little-family-reveal.jpg"
  },
  {
    title: "Fall Pizza Social",
    description: "Our first social of the school year!",
    longDescription: "Members came out on a Friday to night to enjoy pizza, refreshments, and socializing with their fellow members.\n\n We had a great time greeting familiar faces as well as people who joined the club for the first time. We are so excited to continue to hold socials and get to know everyone!",
    date: "October 14, 2022",
    imageUrl: "/images/blog2022-23/f22-pizza-social-cover.jpg",
    expandedImage: "/images/blog2022-23/f22-pizza-social-front.png"
  },
  {
    title: "2022 Data Science UCSB Kickoff",
    description:
      "Data Science UCSB's kickoff meeting for the 2022-23 school year in Chem 1179!",
    longDescription: "The 2022 Fall Kickoff was a major success and the turnout was amazing! It was great to see so many new and old faces alike. We are so excited to resume our club operations for the 2022 - 2023 school year!\n\n If you're not already registered for the club, make sure to do so using the big blue 'Register' button in the menu bar on the top right. We will be meeting every Tuesday from 7-9 PM. We can't wait to see you there!",
    date: "October 06, 2022",
    imageUrl: "/images/blog2022-23/2022-kickoff-fall.jpg",
    expandedImage: "/images/blog2022-23/fallkickoff2022image2.jpg"
  },
];

export default events;
