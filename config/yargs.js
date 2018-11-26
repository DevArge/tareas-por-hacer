const descripcion = {
  demand:true,
  alias: 'd',
  desc: 'Descripcion de una tarea por hacer'
};
const completado = {
  alias: 'c',
  default: true,
  desc:'marca como competado o pendiente la tarea'
}
const argv = require('yargs')
      .command('crear', 'Crear un elemento por hacer', {
        descripcion
      })
      .command('actualizar', 'Actualiza un elemento por hacer', {
        descripcion,
        completado
      })
      .command('borrar', 'Borra una tarea por hacer', {
        descripcion
      })
      .help()
      .argv;

module.exports = {
    argv
}
