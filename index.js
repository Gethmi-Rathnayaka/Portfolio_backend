const express = require('express'); //create an express app
const cors = require('cors');
const app = express();
const port = 5000; //backend running in port 5000

require('dotenv').config();
const Project = require('./Project');
const Blog = require('./Blog');
const { message } = require('statuses');

app.use(cors());
app.use(express.json()); //library to parse json data

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        console.log(projects);
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/blogs', async (req, res) => {
  try {
      const blogs = await Blog.find();
      console.log(blogs);
      res.json(blogs);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

//create an endpoint for a project
app.post('/projects', async (req, res) => {
  console.log(req.body);
  res.send("Creating a project");

  const project = new Project(req.body); // Create a new instance of Project with req.body
  try {
      const newProject = await project.save(); // Save the instance, not the class
      res.status(201).json(newProject);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

//create an endpoint for updating a project by id
app.patch('/projects/:id', async (req, res) => {
  try {
      const project = await Project.findById(req.params.id);
      if (project) {
        project.set(req.body);
        const updatedProject = await project.save();
        res.json(updatedProject);
      } else{
        res.status(404).json({message: 'Project not found'});
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.delete('/projects/:id', async (req, res) => {
  try {
      const project = await Project.findByIdAndDelete(req.params.id);

      if (project) {
        res.json({ message: "Project deleted" });
      } else {
        res.status(404).json({ message: "Project not found" });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
