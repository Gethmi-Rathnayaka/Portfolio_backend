const mongoose = require('./db');

const projectSchema = new mongoose.Schema({
    p_id: String,
    name: String,
    description: String,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
