const express = require('express')
const taskRouter = express.Router()


const {addTodo, getAllTodo, editTodo, deleteTodo } = require("../controllers/task.controller");


taskRouter.post('/addtodo', addTodo);
taskRouter.get('/todos', getAllTodo);
taskRouter.put('/todos/:id', editTodo);
taskRouter.delete('todos/:id', deleteTodo);
 

module.exports={
    taskRouter
}