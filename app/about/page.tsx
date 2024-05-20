import { BoardProfileCard } from "@/components/BoardProfileCard";
import Image from "next/image";
import {
  executiveTeam,
  marketingAndOperationsTeam,
  techDevTeam,
  interns
} from "@/data/board";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Data Science UCSB Officers
      </h1>
      <section>
        <h2 className="text-3xl font-bold text-center mb-16 mt-16">
          Executive Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {executiveTeam.map((member, index) => (
            <BoardProfileCard
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              imageUrl={member.imageUrl}
              linkedIn={member.linkedIn}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-16 mt-16">
          Marketing and Operations Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {marketingAndOperationsTeam.map((member, index) => (
            <BoardProfileCard
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              imageUrl={member.imageUrl}
              linkedIn={member.linkedIn}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-16 mt-16">
          Technical Development Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techDevTeam.map((member, index) => (
            <BoardProfileCard
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              imageUrl={member.imageUrl}
              linkedIn={member.linkedIn}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-16 mt-16">
          Interns
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {interns.map((member, index) => (
            <BoardProfileCard
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              imageUrl={member.imageUrl}
              linkedIn={member.linkedIn}
            />
          ))}
        </div>
      </section>
      <br/> <br/>
      <h1 className="text-4xl font-bold text-center mb-12">
          2023-24 Officers
      </h1>
      <div className="flex justify-center">
        <Image
          src="/images/board/board2023.jpg"
          alt="Data Science UCSB Officers"
          width={1000}
          height={500}
          style={{ objectFit: "cover" }}
          className="rounded-md"
        /> <br/>
      </div>
      <div>
        <p className="text-center">Not pictured: Mateo Wang, Aliza Samad</p>
      </div>
    </div>
  );
};

export default AboutPage;
