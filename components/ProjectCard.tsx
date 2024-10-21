"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal'; // Adjust the import path as necessary
import { description } from '@/app/data/siteMetadata';

interface ProjectCardProps {
  title: string;
  projectUrl: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, projectUrl, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-2"> {/* Adjust padding to control spacing */}
      <button onClick={openModal} className="hover:shadow-lg">
        <div className="flex flex-col items-center rounded-lg bg-white p-3 shadow-lg w-full h-full hover:-translate-y-1 hover:scale-100 hover:bg-blue-600 hover:text-stone-50 duration-300 h-100">
          <div className="relative w-full" style={{ height: '200px' }}>
            <Image
              src={projectUrl}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
          <div className="px-6 py-4">
            <p className="md:font-bold">{title}</p>
            <p className="text-base">{description}</p>
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