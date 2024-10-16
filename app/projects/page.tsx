// import React from "react";
// import { projects } from "../data/projects";
// import ProjectCard from "@/components/ProjectCard";

// const Projects = () => {
//   return (
//     <div>
//       {projects.map((project, index) => (
//         <div key={index} className="w-full md:w-1/2 p-4">
//           <ProjectCard
//             title={project.title}
//             projectUrl={project.projectUrl}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Projects;

import React from 'react';
import ProjectCard from '@/components/ProjectCard'; // Adjust the import path as necessary
import { projects } from '../data/projects';

const ProjectGallery = () => {
  
  return (
    <div className="flex flex-wrap -mx-2"> {/* Adjust margin to control spacing */}
      {projects.map((project, index) => (
        <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-2"> {/* Adjust padding to control spacing */}
          <ProjectCard
            title={project.title}
            projectUrl={project.projectUrl}
            description={project.description}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectGallery;