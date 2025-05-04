import React, { useState } from 'react';
import './ContactPopup.css';

function ContactPopup({ onClose }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const email = 'julien.issert.etu@univ-lemans.fr';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Contact</h2>
        <label>
          Objet :
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Objet de votre message"
          />
        </label>
        <label>
          Message :
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre message"
          />
        </label>
        <div className="buttons">
          <button className="button-primary" onClick={handleSend}>Envoyer</button>
          <button className="close-button"onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
}

export default ContactPopup;
