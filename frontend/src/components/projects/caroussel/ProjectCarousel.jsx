import React, { useEffect } from 'react';
import useProjectStore from '../../../stores/projectStore';
import ProjectCard from '../cards/ProjectCard';
import './ProjectCarousel.css';

function ProjectCarousel() {
  const { projects, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="carousel-wrapper">
      <div className="grid">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectCarousel;
