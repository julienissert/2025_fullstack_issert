import Project from '../models/projects.js';
import debug from 'debug';

const logger = debug('back:controller:stats');

export const getProjectStats = async (req, res) => {
  try {
    const projects = await Project.find();

    const totalProjects = projects.length;

    const avgIntroLength = projects.reduce((acc, p) => acc + (p.intro || '').length, 0) / totalProjects;

    const avgFullLength = projects.reduce((acc, p) => {
      const words = (p.description || '').trim().split(/\s+/).length;
      return acc + words;
    }, 0) / totalProjects;

    const maxImages = Math.max(...projects.map(p => p.images.length));

    const avgKeywords = projects.reduce((acc, p) => acc + (p.keywords?.length || 0), 0) / totalProjects;
    const maxKeywords = Math.max(...projects.map(p => p.fullDescription.length));

    res.json({
      totalProjects,
      avgIntroLength: Math.round(avgIntroLength),
      avgFullDescriptionLength: Math.round(avgFullLength),
      maxImages,
      avgKeywords: avgKeywords.toFixed(1),
      maxKeywords
    });
  } catch (err) {
    logger('Erreur stats projets :', err);
    res.status(500).json({ error: 'Server error' });
  }
};