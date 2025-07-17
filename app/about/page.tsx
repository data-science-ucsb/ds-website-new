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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allMembers.map((member, index) => (
          <div className="w-full max-w-[500px] mx-auto">
            <BoardProfileCard
              key={index}
              name={member.name}
              role={member.role}
              major={"🎓 " + member.major}
              position={"💼 " + member.position}
              interests={"😀 " + member.interests}
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
