import React, { useState, useEffect } from 'react';
import ProjectCarousel from '../../components/projects/caroussel/ProjectCarousel';
import ProjectPopup from '../../components/projects/popup/ProjectPopup';
import ProjectFormPopup from '../../components/projects/form/ProjectFormPopup';
import ContactPopup from '../../components/contact/ContactPopup';
import useUserStore from '../../stores/userStore';
import useProjectStore from '../../stores/projectStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import background from '../../assets/background.png'
import './Home.css';
import gitlab from '../../assets/gitlab.svg';
import github from '../../assets/github.svg';

function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const { fetchProjects } = useProjectStore();
  const { user } = useUserStore();
  const handleFormSuccess = () => {
    fetchProjects();
    setShowForm(false);
  };

  useEffect(() => {
    const orb = document.getElementById("backgroundOrb");

    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 40;
      if (orb) {
        orb.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="head-section">
        <h1 className="title .sansation-light-italic">Julien Issert</h1>
        <div className="profile-links">
              <a href="https://github.com/julienissert" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="GitHub" />
              </a>
              <a href="https://gitlab.com/julien.issert" target="_blank" rel="noopener noreferrer">
                <img src={gitlab} alt="GitLab" />
              </a>
              <button className="button-primary" onClick={() => setShowContact(true)}>Contacter</button>
            </div>
      </div>
        
      <div className="page">
        <img
          src={background}
          alt=""
          className="background-orb"
          id="backgroundOrb"
        />

        <section className="profile-section">
          <h2 className="sansation-regular">FULLSTACK DEVELOPPER</h2>
          <h2 className="sansation-bold-italic">DevOps and cloud enthusiast</h2>
        </section>

        <section className="project-section">
        <div className="project-header">
          <div className="project-title-container">
            <h2 className="project-title">Mes Projets</h2>
            {user && user.role === 'admin' && (
              <button className="button-primary" onClick={() => setShowForm(!showForm)} >
                {showForm ? 'Retour' : <FontAwesomeIcon icon={faPlus} />}
              </button>
            )}
          </div>
        </div>

          {user && user.role === 'admin' && showForm && (
            <div className="form-wrapper">
              <ProjectFormPopup
                onSuccess={handleFormSuccess}
                onClose={() => setShowForm(false)}
              />
            </div>
          )}

        </section>

        <ProjectCarousel />
        <ProjectPopup />

        {showContact && <ContactPopup onClose={() => setShowContact(false)} />}
      </div>
    </>
    
  );
}

export default Home;