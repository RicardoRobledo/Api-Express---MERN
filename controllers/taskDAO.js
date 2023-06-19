const Task = require('../models/Task')


exports.create = async function(req, resp){

  if(!('name' in req.body && 'status' in req.body)){

    resp.status(400).json({error:'faltan datos'})

  }else{

    const task = await Task.find({'name': req.body.name})
    console.log(task)

    if(task.length!=0){
  
      resp.status(400).json({error:'ya existe esa tarea'})

    }else{
      const data = {
        name: req.body.name,
        status: req.body.status
      }
  
      await Task.create(data);
  
      resp.status(200).json({msj:'exito'})
    }

  }

};


exports.find = async function(req, resp){

  if(!('name' in req.query || 'status' in req.query)){

    resp.status(400).json({error:'faltan datos'})

  }else{

    const data = {}

    if('name' in req.query){
      data.name = req.query.name
    }

    if('status' in req.query){
      data.status = req.query.status
    }

    const task = await Task.find(data)

    if(task){
      resp.status(200).json({msj:'exito', task: task})
    }else{
      resp.status(404).json({msj:'tarea inexistente'})
    }

  }

};


exports.findAll = async function(req, resp){

  const task = await Task.findAll()
  
  if(task){
    resp.status(200).json({msj:'exito', task: task})
  }else{
    resp.status(404).json({msj:'tareas inexistentes'})
  }

};


exports.update = async function(req, resp){

  if(!('name' in req.body && 'status' in req.body)){

    resp.status(404).json({msj:'faltan datos de modificacion'})

  }else if(!('name' in req.query)){

    resp.status(404).json({msj:'no se ha ingresado el nombre de la tarea a modificar'})

  }else{

    const data = {
      name: req.query.name,
    }

    const task = await Task.find(data)

    if(task.length!=0){

      data.status = req.body.status
      data.name = req.body.name
      await Task.update(task, data)
      resp.status(200).json({msj:'exito'})

    }else{
      resp.status(404).json({msj:'tarea inexistente'})
    }

  }

};