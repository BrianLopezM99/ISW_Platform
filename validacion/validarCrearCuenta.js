export default function validarCrearCuenta(valores) {
  let errores = {};

  // Validar el nombre del usuario
  if (!valores.nombre) {
    errores.nombre = "El Nombre es obligatorio";
  }

  // Validar email
  if (!valores.email) {
    errores.email = "El Email es Obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "Email no válido";
  }

  // validar password
  if (!valores.password) {
    errores.password = "El password es obligatorio";
  } else if (valores.password.length < 6) {
    errores.password = "El password debe ser de al menos 6 caracteres";
  }
  // // validar direccion
  // if (!valores.direccion) {
  //   errores.direccion = "La dirección es obligatoria";
  // } else if (valores.direccion.length < 6) {
  //   errores.direccion = "El password debe ser de al menos 6 caracteres";
  // }

  // // validar telefono
  // if (!valores.telefono) {
  //   errores.telefono = "El telefono es obligatorio";
  // } else if (valores.telefono.length < 10) {
  //   errores.telefono = "El telefono debe ser de al menos 10 digitos";
  // }

  // // validar puesto
  // if (!valores.puesto) {
  //   errores.puesto = "El puesto es obligatorio";
  // } 

  // // validar giroempresarial
  // if (!valores.giroempresarial) {
  //   errores.giroempresarial = "El giroempresarial es obligatorio";
  // }

  return errores;
}
