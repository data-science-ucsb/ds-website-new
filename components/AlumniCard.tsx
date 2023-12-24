import React from "react";
import Image from "next/image";

interface AlumniCardProps {
  name: string;
  gradYear: string;
  description: string;
  imageUrl: string;
}

const AlumniCard = ({
  name,
  gradYear,
  description,
  imageUrl,
}: AlumniCardProps) => {
  return (
    <div className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
      <Image
        src={imageUrl}
        alt={name}
        width={150}
        height={150}
        className="rounded-full"
      />
      <h3 className="text-lg font-semibold mt-4">{name}</h3>
      <p className="text-sm text-gray-500">{gradYear}</p>
      <p className="text-center text-gray-700 mt-2">{description}</p>
    </div>
  );
};

export default AlumniCard;
