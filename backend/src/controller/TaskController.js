const TaskModel = require('../model/TaskModel');
const {startOfDay , endOfDay, 
       startOfWeek, endOfWeek, 
       startOfMonth, endOfMonth, 
       startOfYear, endOfYear} = require('date-fns');
const current = new Date();

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

    //find a task by id
    async show(req, res){
        await TaskModel.findById(req.params.id)
            .then(response =>{
                if(response){
                    return res.status(200).json(response);
                }else{
                    return res.status(404).json({err : 'Tarefa não encontrada'});
                }
            })
            .catch(err =>{
                return res.status(500).json(err);
            })
    }
    
    // delete a task by id
    async delete(req, res){
        await TaskModel.deleteOne({'_id': req.params.id})
            .then(response =>{
                 return res.status(200).json(response);               
            })
            .catch(err =>{
                return res.status(500).json(err);
            })
    }

    //Set a task as Done
    async done(req, res){
        await TaskModel.findByIdAndUpdate(
        {'_id': req.params.id},
        {'done': req.params.done},
        {new: true}
        )
            .then(response =>{
                return res.status(200).json(response);
            })
            .catch(err =>{
                return res.status(500).json(err);
            })

    }
    
    //Late tasks filter
    async late(req, res){
        await TaskModel
        .find({
            'when' : {'$lt': current},
            'macaddress': {'$in': req.body.macaddress}
        })
        .sort('when')
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(error =>{
            res.status(500).json(error)
        })

    }

    //Today Tasks filter
    async today(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.body.macaddress},
            'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)}
        })
        .sort('when')
        .then(response =>{
            return res.status(200).json(response);
        })
        .catch(error =>{
            return res.status(500).json(error);
        });
    }

    //week tasks filter
    async week(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.body.macaddress},
            'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}
        })
        .sort('when')
        .then(response =>{
            return res.status(200).json(response);
        })
        .catch(error =>{
            return res.status(500).json(error);
        });
    }

    //Month tasks filter
    async month(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.body.macaddress},
            'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)}
        })
        .sort('when')
        .then(response =>{
            return res.status(200).json(response);
        })
        .catch(error =>{
            return res.status(500).json(error);
        });
    }

    //Year tasks filter
    async year(req, res){
        await TaskModel
        .find({
            'macaddress': {'$in': req.body.macaddress},
            'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)}
        })
        .sort('when')
        .then(response =>{
            return res.status(200).json(response);
        })
        .catch(error =>{
            return res.status(500).json(error);
        });
    }




}

module.exports = new TaskController();