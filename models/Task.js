const { query } = require('express')
const db = require('../config/config')
const { ObjectId } = require('mongodb');


var Task = function(task){
  this.name = task.name;
  this.status = task.status;
  console.log("msj ", task.name);
};


// -------------------------------------------
//                  create
// -------------------------------------------


Task.create = async function(new_task){

  const collection = db.collection('tasks');

  collection.insertOne(new_task, (err, result) => {
      
    if (err) {
      console.error('Error al insertar los datos:', err);
    } else {
      console.log('Datos insertados correctamente');
    }
  
  });

}


// -------------------------------------------
//                    find
// -------------------------------------------


Task.find = async function(task){

  const collection = db.collection('tasks');

  try {

    const result = collection.find(task).toArray();
    console.log('Tarea encontrada correctamente');
    return result;

  } catch (err) {

    console.error('Error al buscar la tarea:', err);
    throw err;

  }

}


Task.findAll=async function(){

  const collection = db.collection('tasks');

  try {

    const result = collection.find({}).toArray();
    console.log('Tareas encontradas correctamente');
    return result;

  } catch (err) {

    console.error('Error al buscar la tarea:', err);
    throw err;

  }

}


// -------------------------------------------
//                    update
// -------------------------------------------


Task.update = async function(task, new_task){

  const collection = db.collection('tasks');

  try {

    console.log('Tarea encontrada correctamente');
    const result = await collection.updateOne(task[0], { $set: new_task });
    return result;

  } catch (err) {

    console.error('Error al buscar la tarea:', err);
    throw err;

  }

}


module.exports = Task;