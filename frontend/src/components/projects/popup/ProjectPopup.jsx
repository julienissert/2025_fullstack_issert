import React, { useState } from 'react';
import useProjectStore from '../../../stores/projectStore';
import useUserStore from '../../../stores/userStore';
import ProjectFormPopup from '../form/ProjectFormPopup';
import './ProjectPopup.css';

function ProjectPopup() {
  const {
    selectedProject,
    setSelectedProject,
    deleteProject,
    fetchProjects,
  } = useProjectStore();

  const { user } = useUserStore();

  const [showEditForm, setShowEditForm] = useState(false);
  const [confirmDeleteMode, setConfirmDeleteMode] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');

  if (!selectedProject) return null;

  const { _id, title, fullDescription, images = [] } = selectedProject;
  const cleanTitle = title?.replace(/^"|"$/g, '');
  const cleanDescription = fullDescription?.replace(/^"|"$/g, '');

  const handleDelete = async () => {
    await deleteProject(_id);
    await fetchProjects();
    setSelectedProject(null); // ferme la popup
  };

  const handleEditSuccess = async () => {
    await fetchProjects();
    setShowEditForm(false);
    setSelectedProject(null);
  };

  return (
    <>
      <div className="popup-overlay" onClick={() => setSelectedProject(null)}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <h2>{cleanTitle}</h2>

          <div className="image-carousel">
            {images.length === 0 && <p>Aucune image disponible</p>}
            {images.map((url, index) => (
              <img key={index} src={url} alt={`project-img-${index}`} />
            ))}
          </div>

          <p className="description">{cleanDescription}</p>

          {user?.role === 'admin' && (
            <div className="admin-buttons">
              <button className="button-primary" onClick={() => setShowEditForm(true)}>
                Éditer
              </button>
              {!confirmDeleteMode ? (
                <button
                  className="delete-button"
                  onClick={() => setConfirmDeleteMode(true)}
                >
                  Supprimer
                </button>
              ) : (
                <div className="delete-confirmation">
                  <p>Confirmez la suppression en écrivant : <strong>{cleanTitle}</strong></p>
                  <input
                    type="text"
                    value={confirmInput}
                    onChange={(e) => setConfirmInput(e.target.value)}
                    placeholder="Réécrivez le titre du projet"
                  />
                  <div className="confirm-buttons">
                    <button
                      className="confirm-delete"
                      onClick={handleDelete}
                      disabled={confirmInput !== cleanTitle}
                    >
                      Confirmer
                    </button>
                    <button
                      className="cancel-delete"
                      onClick={() => {
                        setConfirmDeleteMode(false);
                        setConfirmInput('');
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <button className="close-button" onClick={() => setSelectedProject(null)}>
            Fermer
          </button>
        </div>
      </div>

      {showEditForm && (
        <ProjectFormPopup
          project={selectedProject}
          onClose={() => setShowEditForm(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
}

export default ProjectPopup;