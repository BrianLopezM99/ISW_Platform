export default function validarCrearCuenta(valores) {
  let errores = {};

  // Validar el nombre del usuario
  if (!valores.nombre) {
    errores.nombre = "El Nombre es obligatorio";
  }

  // Validar empresa
  if (!valores.empresa) {
    errores.empresa = "Nombre de empresa es obligatorio";
  }

  // validar URL
  if (!valores.url) {
    errores.url = "La URL del producto es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "URL mal formateada o no válida";
  }

  // validar descripción.
  if (!valores.descripcion) {
    errores.descripcion = "Agrega una descripción de tu producto";
  }

  if (!valores.perfilreq) {
    errores.perfilreq = "Agrega el perfil requerido de la vacante";
  }

  if (!valores.numeroalumnos) {
    errores.numeroalumnos = "Agrega el numero de alumnos solicitados";
  }

  if (!valores.modalidad) {
    errores.modalidad = "Agrega la modalidad de la oferta";
  }

  return errores;
}
