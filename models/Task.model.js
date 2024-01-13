const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
},{
    versionKey: false
});

const TaskModel = mongoose.model('task',taskSchema)

module.exports = {
    TaskModel
};
