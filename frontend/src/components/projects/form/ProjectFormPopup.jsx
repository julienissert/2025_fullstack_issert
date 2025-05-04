import React, { useState, useEffect } from 'react';
import useProjectStore from '../../../stores/projectStore';
import './ProjectFormPopup.css';

function ProjectFormPopup({ onClose, onSuccess, project = null }) {
  const { addProject, editProject } = useProjectStore();

  const [title, setTitle] = useState('');
  const [introDescription, setIntroDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);


  useEffect(() => {
    if (project) {
      setTitle(project.title || '');
      setIntroDescription(project.introDescription || '');
      setFullDescription(project.fullDescription || '');
      setKeywords((project.keywords || []).join(', '));
      setExistingImages(project.images || []);
    }
  }, [project]);

  const handleImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('introDescription', introDescription);
    formData.append('fullDescription', fullDescription);
    formData.append('keywords', keywords);

    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    images.forEach((image) => {
      formData.append('images', image);
    });

    if (project) {
      formData.append('existingImages', JSON.stringify(existingImages));
      await editProject(project._id, formData);
    } else {
      await addProject(formData);
    }

    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="project-form-popup-overlay">
      <div className="project-form-popup">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{project ? 'Modifier le projet' : 'Ajouter un projet'}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description courte"
            value={introDescription}
            onChange={(e) => setIntroDescription(e.target.value)}
            required
          />
          <textarea
            placeholder="Description complète"
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Mots-clés (séparés par des virgules)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />

          <label>Image miniature (thumbnail) :</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />

          <label>Images existantes :</label>
          {existingImages.length > 0 ? (
            <ul className="image-list">
              {existingImages.map((img, idx) => (
                <li key={idx}>
                  {typeof img === 'string' ? img : img.name}
                  <button type="button" onClick={() => removeExistingImage(idx)}>Supprimer</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune image existante</p>
          )}

          <label>Ajouter de nouvelles images :</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagesChange}
          />

          {images.length > 0 && (
            <ul className="image-list">
              {images.map((img, idx) => (
                <li key={idx}>
                  {img.name}
                  <button type="button" onClick={() => removeImage(idx)}>Supprimer</button>
                </li>
              ))}
            </ul>
          )}

          <button type="submit">{project ? 'Mettre à jour' : 'Enregistrer'}</button>
        </form>
      </div>
    </div>
  );
}

export default ProjectFormPopup;