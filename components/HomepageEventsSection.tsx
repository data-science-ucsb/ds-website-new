import Image from "next/image";

interface EventSectionProps {
  title: string;
  description: string;
  imageUrl: string;
}

const HomepageEventsSection = ({
  title,
  description,
  imageUrl,
}: EventSectionProps) => {
  return (
    <div className="flex flex-col md:flex-row p-6 rounded-lg mb-6">
      <div className="md:flex-1 md:pr-8 mb-4 md:mb-0">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
        <div className="w-12 h-1 bg-blue-500 mb-4"></div>
        <p className="text-gray-500 mb-2 text-lg">{description}</p>
      </div>
      <div className="md:w-1/2">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={300}
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default HomepageEventsSection;
