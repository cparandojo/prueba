
//importamos el modelo de usuario para poder relacionarnos con la base de datos.
const {saveUser} = require ('../../model/userModel.js');

//El proceso hijo de creación de usuario realizará la inserción en base de datos del usuario.
process.on('message', (data) => {
 
    saveUser(data).then((responseBBDD) => {
        console.log('Usuario creado correctamente.');
        process.send(responseBBDD);


     })
     .catch((err) =>{
         console.log('Usuario no creado correctamente.');   
         process.exit();
     });

});

