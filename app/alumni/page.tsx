import AlumniCard from "@/components/AlumniCard";
import alumniData from "@/data/alumni";

const Alumni = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Data Science UCSB Alumni
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {alumniData.map((alumni, index) => (
          <AlumniCard
            key={index}
            name={alumni.name}
            gradYear={alumni.gradYear}
            description={alumni.description}
            imageUrl={alumni.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Alumni;
