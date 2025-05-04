import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStatsStore from '../../stores/statsStore';
import './Stats.css';

export default function Stats() {
  const { stats, fetchStatsData } = useStatsStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStatsData();
  }, []);

  if (!stats) return <p>Chargement des statistiques...</p>;

  const statsList = [
    { label: 'Nombre total de projets', value: stats.totalProjects },
    { label: 'Longueur moyenne des descriptions (mots)', value: stats.avgFullDescriptionLength },
    { label: 'Nombre maximum d\'images', value: stats.maxImages },
    { label: 'Nombre moyen de mots-clés', value: stats.avgKeywords },
    { label: 'Nombre max de mots-clés', value: stats.maxKeywords },
  ];

  return (
    <div className="page">
      <button className="button-secondary back-button" onClick={() => navigate('/')}>Retour</button>
      <h1 className="title">Statistiques des projets</h1>
      <div className="grid">
        {statsList.map((stat, index) => (
          <div key={index} className="card">
            <h3>{stat.label}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
