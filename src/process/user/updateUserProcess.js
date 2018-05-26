//importamos el modelo de usuario para poder relacionarnos con la base de datos.
const {updateUser} = require ('../../model/userModel.js');

//El proceso hijo de actualización de usuario realizará la actualización en base de datos del usuario.
process.on('message', (data) => {
 
    updateUser(data).then((responseBBDD) => {
        console.log('Usuario actualizado correctamente.');
        process.send(data);
     })
     .catch((err) =>{
         console.log('Usuario no actualizado correctamente.');   
         console.log(err);   
         process.exit();
     });

});