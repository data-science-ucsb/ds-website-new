import Image from "next/image";

interface Event {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

const imageHeight = 200;

const EventCard = ({ title, description, date, imageUrl }: Event) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
    <div className="relative w-full" style={{ height: `${imageHeight}px` }}>
      <Image
        src={imageUrl}
        alt={title}
        sizes="(max-width: 640px) 100vw, 640px"
        fill
        style={{ objectFit: "cover" }}
        className="bg-coverrounded-t-lg"
      />
    </div>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        {date}
      </span>
    </div>
  </div>
);

export default EventCard;
