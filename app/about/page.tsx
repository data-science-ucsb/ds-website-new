import { BoardProfileCard } from "@/components/BoardProfileCard";
import {
  executiveTeam,
  marketingAndOperationsTeam,
  techDevTeam,
} from "@/app/data/board";


const AboutPage = () => {
  // Combine all teams into one array
  const allMembers = [
    ...executiveTeam,
    ...techDevTeam,
    ...marketingAndOperationsTeam,
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Meet the Data Science UCSB Officers
      </h1>
      
      {/* Using Flexbox instead of Grid to center last row items */}
      <div className="flex flex-wrap justify-center gap-8">
        {allMembers.map((member, index) => (
          <div key={index} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[400px]">
            <BoardProfileCard
              name={member.name}
              role={member.role}
              major={"🎓 " + member.major}
              position={""}
              interests={""}
              imageUrl={member.imageUrl}
              linkedIn={member.linkedIn}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;