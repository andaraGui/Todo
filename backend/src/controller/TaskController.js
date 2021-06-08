const TaskModel = require('../model/TaskModel');

class TaskController {

    //create task
    async create( req , res ){
        const task = new TaskModel(req.body);
        await task
        .save()
        .then(response =>{
            return res.status(200).json(response);
        })
        .catch(error =>{
            return res.status(500).json(error);
        })
    }

    //update task
    async update( req , res ){
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body , {new: true})
            .then(response =>{
                return res.status(200).json(response);
            })
            .catch(err =>{
                return res.status(500).json(err)
            })

    }
    
    //find all tasks in macaddress
    async all (req, res){
        await TaskModel.find({ macaddress : {'$in': req.body.macaddress}})
            .sort('when')
            .then(response=>{
                return res.status(200).json(response);
            })
            .catch(err =>{
                return res.status(500).json(err);
            })
    }



}

module.exports = new TaskController();