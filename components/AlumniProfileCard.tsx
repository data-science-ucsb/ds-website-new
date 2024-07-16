import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AlumniCardProps {
  name: string;
  gradYear: string;
  major: string;
  job: string;
  imageUrl: string;
  linkedIn: string;
}

const AlumniCard = ({
  name,
  gradYear,
  major,
  job,
  imageUrl,
  linkedIn,
}: AlumniCardProps) => {
  return (
    <a href={linkedIn} target="_blank">
      <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-lg hover:-translate-y-1 hover:scale-100 hover:bg-blue-600 hover:text-stone-50 duration-300 ">
        <div className="w-48 h-48 relative overflow-hidden rounded-full">
            <Image
              src={imageUrl}
              alt={name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
            />
        </div>
        <h3 className="text-lg font-semibold mt-4">{name}</h3>
        <p className="text-sm">{gradYear}</p>
        <p className="text-center mt-2">{major}</p>
        <p className="text-center mt-2">{job}</p>
      </div>
    </a>
  );
};

export default AlumniCard;
