
const express = require('express');
const { fork } = require('child_process');

const addUserProcessUrl = '../src/process/user/addUserProcess.js';
const updateUserProcessUrl = '../src/process/user/updateUserProcess.js';

//importamos solo las funciones del modelo que vamos a usar desde el router.
const {getUsers, getUserById, deleteUser, deleteAll} = require('./model/userModel.js');

const router = express.Router();

//creación del usuario con proceso hijo.
router.post('/user',(req,res)=>{
    
    //obtenemos el campo body de la petición
    let data = req.body;

    //Obtenemos el proceso hijo
    const addUserProcess = fork(addUserProcessUrl);

    //añadimos un evento al proceso hijo, para que envie los datos del json de respuesta.
    addUserProcess.on('message', (responseBBDD) => {
        res.status(201).json(responseBBDD);
    });

    addUserProcess.on('exit', () => {
        //Respondemos con OK
        res.status(500).json({error:'Error creando usuario.'});
       
    });

    //ejecutamos el proceso.
    addUserProcess.send(data);
   
});

//listado de usuarios sin proceso hijo
router.get('/users', (req, res)=>{

    //obtenemos los resultados.
    getUsers().then((data)=>{
        console.log('Lista de usuarios obtenida.');

        res.status(200).json(data);

    }).catch((err) => {
        console.log('Error obteniendo lista de usuarios');
        console.log(err);
        res.status(500).json({success:false});
    });
});

//busqueda de usuario por id sin proceso hijo
router.get('/users/:id', (req, res)=>{

    let userId = req.params.id;

    getUserById(userId).then((data)=>{
        console.log('Usuario obtenido correctamente.');

        res.status(200).json(data);

    }).catch((err) => {
        console.log('Error obteniendo usuario');
        console.log(err);
        res.status(500).json({success:false});
    });
});


//actualización de usuario con proceso hijo.
router.patch('/users/:id', (req, res)=>{
   
    
    let data = req.body;
    data.id = req.params.id;

    //realizamos llamada al proceso hijo.
    const updateUserProcess = fork(updateUserProcessUrl);
   
    //añadimos un evento al proceso hijo, para que envie los datos del json de respuesta.
    updateUserProcess.on('message', (responseUpdateBBDD) => {
        //Respondemos con OK
         res.status(201).json(responseUpdateBBDD);
    });

    updateUserProcess.on('exit', () => {
        //Respondemos con OK
        res.status(500).json({error:'Error actualizando usuario.'});
       
    });

    updateUserProcess.send(data);   
   
});

//eliminación de usuario sin proceso hijo.
router.delete('/users/:id', (req, res)=>{
   
    let data = req.body;
    data.id = req.params.id;
    
    req.app.get('deleteUserProcess').send(data);

    res.status(200).json(data);  
});

//eliminación de todos los usuarios
router.delete('/users', (req, res)=>{
   
    let userId = req.params.id;
    
    deleteAll().then((data)=>{
        console.log('Usuarios borrados correctamente')
        res.status(200).json({success:true});

    }).catch((err) => {
        console.log('Error borrando usuarios');
        console.log(err);
        res.status(500).json({success:false});
    });   
});


module.exports = router;