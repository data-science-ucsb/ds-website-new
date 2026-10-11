import { BoardProfileCard } from "@/components/BoardProfileCard";
import { boardMembers } from "@/app/data/board";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">2026–27 Board</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Meet the Data Science UCSB Officers</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {boardMembers.map((member) => (
          <div key={member.name} className="w-full max-w-[400px] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
            <BoardProfileCard {...member} />
          </div>
        ))}
      </div>
    </div>
  );
}
