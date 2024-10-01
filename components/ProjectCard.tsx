"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";

interface Project {
  title: string;
  projectUrl: string;
};

const imageHeight = 200;

const ProjectCard = ({title, projectUrl}: Project) => {
  const [eventInfo, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setExpanded(!eventInfo);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div>
      <button onClick={openModal} className="hover:shadow-lg">
        <div className="flex flex-col items-center rounded-lg bg-white p-3 shadow-lg w-full h-full">
          <div className="relative w-full" style={{ height: `${imageHeight}px` }}>
            <Image
              src={projectUrl}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
          <div className="px-6 py-4">
            <p className="md:font-bold">{title}</p>
          </div>
        </div>
      </button>
  
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex justify-center items-center h-full">
          <div className="relative w-full max-w-3xl" style={{ height: '80vh' }}>
            <Image
              src={projectUrl}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProjectCard;