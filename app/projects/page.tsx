import React from "react";
import { projects } from "../data/projects";
import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
  return (
    <div className="flex flex-wrap -m-4">
      {projects.map((project, index) => (
        <div key={index} className="w-full md:w-1/2 p-4">
          <ProjectCard
            title={project.title}
            projectUrl={project.projectUrl}
          />
        </div>
      ))}
    </div>
  );
}

export default Projects;