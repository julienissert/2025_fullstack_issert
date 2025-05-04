import React, { useState } from 'react';
import useProjectStore from '../../../stores/projectStore';
import './ProjectCard.css';

function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false);
  const { setSelectedProject } = useProjectStore();

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleViewDetail = (e) => {
    e.stopPropagation();
    setSelectedProject(project);
  };

  return (
    <div className='project-card'>
      <div className={`flip-card project-card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={project.thumbnailUrl} alt={project.title} />
            <h3>{project.title}</h3>
          </div>
          <div className="flip-card-back">
            <p>{project.introDescription}</p>

            {project.keywords && project.keywords.length > 0 && (
              <ul className="keywords-list">
                {project.keywords
                  .filter(k => k.trim() !== "")
                  .map((keyword, index) => (
                    <li key={index} className="keyword-item">
                      {keyword}
                    </li>
                  ))}
              </ul>
            )}
            
            <button className="button-secondary" onClick={handleViewDetail}>Voir détail</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
