
//importamos el modelo de usuario para poder relacionarnos con la base de datos.
const {deleteUser} = require ('../../model/userModel.js');

//El proceso hijo de creación de usuario realizará la inserción en base de datos del usuario.
process.on('message', (data) => {
 
    setTimeout(function() {
        deleteUser(data).then(() => {
            console.log('Usuario borrado correctamente.');
         })
         .catch(() =>{
             console.log('Usuario no borrado correctamente.');   
         });
    }, 3000); //delay para simular algún proceso costoso
});
