import AlumniCard from "@/components/AlumniProfileCard";
import alumniData from "@/data/alumni";
import Image from "next/image";

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
      <br/> <br/>
      <h1 className="justify-center text-4xl font-bold text-center mb-12">Alumni Officer Photo 21-22</h1>
      <div className="flex justify-center">
        <br/>
        <Image
          src="/images/officers.png"
          alt="Data Science UCSB Officers"
          width={1000}
          height={500}
          style={{ objectFit: "cover" }}
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default Alumni;
