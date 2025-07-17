import Image from "next/image";
import sponsors from "@/app/data/sponsors";

const SponsorsSection = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  
        <h2 className="text-lg leading-6 font-medium text-gray-900 mb-6 text-center">
          We are sponsored by:
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="col-span-2 flex justify-center items-center"
            >
              <Image
                src={sponsor.imageUrl}
                alt={`${sponsor.name} logo`}
                width={200}
                height={200}
              ></Image>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorsSection;
