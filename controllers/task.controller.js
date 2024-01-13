const{ TaskModel} = require("../models/Task.model");

const addTodo = async (req, res)=>{
    try {
        const newTodo = await TaskModel.create({
            data:req.body.data
        })
        await newTodo.save()
        return res.status(200).json(newTodo)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const getAllTodo = async(req,res)=>{
    try {
        const todos = await TaskModel.find({})
        return res.status(200).json(todos)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const editTodo = async(req,res) =>{
    try {
        await TaskModel.findOneAndUpdate(
            {_id:req.params.id},
            {data:req.body.data}
        )
        const updatedTodo = await TaskModel.findById(req.params.id)
        return res.status(200).json(updatedTodo)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const deleteTodo = async(req,res) =>{
    try {
        const todo = await TaskModel.findByIdAndDelete(req.params.id)
        return res.status(200).json(todo)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}


module.exports={
    addTodo,getAllTodo,editTodo,deleteTodo
}