"use client";

import React from "react";
import Image from "next/image";

interface Project {
  name: string;
  technologies: string[];
  concepts: string[];
  contributors: string[];
  description: string;
  imageUrl: string;
};

const imageHeight = 200;

const ProjectCard = ({name, technologies, concepts, contributors, description, imageUrl}: Project) => {
  return (
    <div className="transition ease-in-out delay-150 bg-white shadow-lg hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 hover:text-white duration-300 ...">
      <div className="relative w-full" style={{ height: `${imageHeight}px` }}>
        <Image
              src={imageUrl}
              alt={name}
              sizes="(max-width: 640px) 100vw, 640px"
              fill
              style={{ objectFit: "cover" }}
              className="bg-coverrounded-t-lg"
            />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-base">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {contributors}
          </span>
        </div>
    </div>
  );
}

export default ProjectCard;