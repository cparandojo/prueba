const mongoose = require('mongoose');

mongoose.connect('mongodb://tft:tft@ds016118.mlab.com:16118/tft');
mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
    id : String,
    name :String,
    username : String,
    phone : String,
    email: String
});


const User = mongoose.model('User', UserSchema);

//Inserta el modelo en base de datos
exports.saveUser = (data) =>{
    return (new User(data)).save();
};

//obtienen el listado de todos los usuarios.
exports.getUsers = ()=>{

    //realizamos la búsqueda de todos los usuarios.
    let listUsers = User.find({}).exec();
    return listUsers;
};

//obtiene el usuario por su id.
exports.getUserById = (userId)=>{

    //formamos el json con el cual realizar la búsqueda.
    let jsonBusqueda= {_id:userId};
    //obtenemos el listado de usuarios por busqueda, en este caso solo saldra uno.
    let listUsers = User.find(jsonBusqueda).exec();

    return listUsers;
};

//Actualiza el modelo en base de datos
exports.updateUser = (data) =>{

    let jsonBusqueda= {_id:data.id};

    var newvalues ={$set: {name: data.name, username: data.username, email:data.email, phone:data.phone } };

    return User.findOneAndUpdate(jsonBusqueda,newvalues);
   
};

//Borrado de un usuario por id.
exports.deleteUser = (data) =>{
    let jsonBusqueda= {_id:data.id};
    return User.remove(jsonBusqueda);
};

//Borrado de todos los usuarios.
exports.deleteAll = () =>{
    return User.remove({});
};

