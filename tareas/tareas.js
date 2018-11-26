const fs = require('fs');
let listadoTareas = [];

const guardarDB = () =>{
  let data = JSON.stringify(listadoTareas);
  fs.writeFile(`db/data.json`, data, (err) => {
    if (err) throw new Error('no se pudo grabar', err);
    else
      console.log('ok guardado');
  });
}

const cargarDB = ()=>{
  try {
    listadoTareas = require('../db/data.json');
  } catch (e) {
    listadoTareas = [];
  }
}

const crear = (descripcion)=>{
  cargarDB();

  let porHacer ={
    descripcion,
    completado: false
  };
  listadoTareas.push(porHacer);
  guardarDB();
  return porHacer;
}

const getListado = () =>{
    cargarDB();
    return listadoTareas;
}

const actualizar= (descripcion, completado = true)=>{
  cargarDB();
  // el finIndex encuantra la posicion en el arreglo si no lo encuentra devuelve un -1
  let index = listadoTareas.findIndex( tarea =>{
    return tarea.descripcion === descripcion;
  });
  if (index >= 0 ) {
    listadoTareas[index].completado = completado;
    guardarDB();
    return true
  }else {
    return false;
  }
}

const borrar = (descripcion) =>{
  cargarDB();
  // let index = listadoTareas.findIndex( tarea =>{
  //   return tarea.descripcion === descripcion;
  // });
  // if (index >= 0 ) {
  //   let tareaEliminada = listadoTareas[index];
  //   listadoTareas.splice(index,1)
  //   guardarDB();
  //   return tareaEliminada;
  // }else {
  //   return 'No se encontro la tarea';
  // }
  ////////////// otra manera de hacrlo/////////////
  let nuevoListado = listadoTareas.filter( tarea =>{
    return tarea.descripcion !== descripcion
  });
  if (listadoTareas.length === nuevoListado.length) {
    return 'No se encontro la tarea';
  }else {
    listadoTareas = nuevoListado;
    guardarDB();
    return true;
  }
}

module.exports = {
  crear,
  getListado,
  actualizar,
  borrar
}
