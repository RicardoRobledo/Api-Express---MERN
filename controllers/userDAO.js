const {application} = require('express')
const User = require('../models/User')
const crypto = require('crypto')


exports.create = async function(req, resp){

    if(!('username' in req.body && 'password' in req.body)){
        
      resp.status(400).json({error:'faltan datos'})

    }else{

      const data = {
        username: crypto.createHash('md5').update(req.body.username).digest('hex')
      };

      const usuario = await User.find(data)
      
      if(usuario){
        resp.status(400).json({error:'el usuario ya existe'})
      }else{
        
        data.password = crypto.createHash('md5').update(req.body.password).digest('hex')
        
        await User.create(data)
        resp.status(200).json({msj:'exito', usuario: req.body.username})
      }

    }

};


exports.find = async function(req, resp){

    if(!('username' in req.query && 'password' in req.query)){
        
      resp.status(400).json({error:'faltan datos'})

    }else{

      const data = {
        username: crypto.createHash('md5').update(req.query.username).digest('hex'),
        password: crypto.createHash('md5').update(req.query.password).digest('hex')
      };

      const usuario = await User.find(data)
      
      if(usuario){

        req.session.username = req.query.username
        resp.status(200).json({msj:'exito', usuario:req.session.username})
      
      }else{
        resp.status(404).json({msj:'usuario inexistente'})
      }
      
    }

};


exports.logout = async function(req, resp){

  delete req.session.username
  
  resp.status(200).json({msj:'cierre de sesion exitoso'})

};