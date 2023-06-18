const { query } = require('express')
const db = require('../config/config')


var User = function(user){
  this.username = user.username;
  this.password = user.password;
  console.log("msj ", user.username);
};


// -------------------------------------------
//                  create
// -------------------------------------------


User.create = async function(new_user){

  const collection = db.collection('users');

  collection.insertOne(new_user, (err, result) => {
      
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


User.find = function(user){

  const collection = db.collection('users');

  try {

    const result = collection.findOne(user);
    console.log('Usuario encontrado correctamente');
    return result;

  } catch (err) {

    console.error('Error al buscar el usuario:', err);
    throw err;

  }

}


module.exports = User;