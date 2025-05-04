import Project from '../models/projects.js';
import debug from 'debug';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const logger = debug('back:controller:projects');
const BASE_URL = `http://${process.env.DOMAIN}:${process.env.BACK_PORT}`;

const uplodUrl = 'api/uploads';


export const getProjects = async (req, res) => {
  logger('get projects request received');
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    const formattedProjects = projects.map(project => ({
      ...project.toObject(),
      thumbnailUrl: project.thumbnail ? `${BASE_URL}/${uplodUrl}/${project.thumbnail}` : null,
      images: project.images ? project.images.map(image => `${BASE_URL}/${uplodUrl}/${image}`) : [],
    }));

    logger(formattedProjects);
    res.json(formattedProjects);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const getProjectById = async (req, res) => {
  logger('get project by id request received');
  try {
    const id = req.params.id;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: `Project with id: ${id} not found` });
    }

    const formattedProject = {
      ...project.toObject(),
      thumbnailUrl: project.thumbnail ? `${BASE_URL}/${uplodUrl}/${project.thumbnail}` : null,
      images: project.images ? project.images.map(image => `${BASE_URL}/${uplodUrl}/${image}`) : [],
    };

    res.json(formattedProject);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const createProject = async (req, res) => {
  logger('create project request received', req.body);
  try {
    const {
      title,
      introDescription,
      fullDescription,
      keywords,
    } = req.body;

    const thumbnail = req.files?.thumbnail?.[0]?.filename;
    const images = req.files?.images?.map(file => file.filename) || [];

    logger('project data images', images);

    const newProject = new Project({
      title,
      introDescription,
      fullDescription,
      keywords: keywords?.split(',').map(k => k.trim()).slice(0, 10),
      thumbnail,
      images
    });

    logger('new project created', newProject);

    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Error while creating project : ', err });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updatedFields = {
      ...req.body,
    };

    logger('Data from project to update', req.body);

    let existingImages = [];
    if (req.body.existingImages) {
      try {
        const parsed = JSON.parse(req.body.existingImages);

        if (!Array.isArray(parsed)) {
          return res.status(400).json({ error: 'existingImages must be an array of URLs' });
        }

        existingImages = parsed.map((url) => {
          try {
            const parts = url.split('/');
            return parts[parts.length - 1];
          } catch {
            return null;
          }
        }).filter(Boolean);

        logger('existing images filenames:', existingImages);
      } catch (err) {
        return res.status(400).json({ error: 'Invalid existingImages format', err });
      }
    }

    if (req.files?.thumbnail) {
      updatedFields.thumbnail = req.files.thumbnail[0].filename;
    }

    const newImages = req.files?.images
      ? req.files.images.map((file) => file.filename)
      : [];

    updatedFields.images = [...existingImages, ...newImages];

    if (updatedFields.keywords && typeof updatedFields.keywords === 'string') {
      updatedFields.keywords = updatedFields.keywords
        .split(',')
        .map((k) => k.trim())
        .slice(0, 10);
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });

    res.json(project);
  } catch (err) {
    logger(err);
    res.status(400).json({ error: 'Error while updating project', details: err.message });
  }
};


export const deleteProject = async (req, res) => {
  logger('req in delete : ', req);
  try {
    const id = req.params.id;
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {return res.status(404).json({ error: `Project with id : ${id} not found` });}
    res.json({ message: `Project with id : ${id} successfully removed` });
  } catch (err) {
    res.status(500).json({ error: 'Server error : ', err });
  }
};