import React, { useState, useContext } from "react";
import { css } from "@emotion/core";
import Router, { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";

import { FirebaseContext } from "../firebase/index";

import Error404 from "../components/layout/404";

// validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../validacion/validarCrearProducto";

const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  telefono: "",
  imagen: "",
  url: "",
  descripcion: "",
  proceso: "", //estancias, estadias, servicio social
  modalidad: "",
  perfilreq: "",
  numeroalumnos: "",
};

const NuevoProducto = () => {
  // state de las imagenes
  const [nombreimagen, guardarNombre] = useState("");
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState("");

  const [error, guardarError] = useState(false);

  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const {numeroalumnos, perfilreq, telefono, modalidad, nombre, empresa, url, descripcion } = valores;

  // hook de routing para redireccionar
  const router = useRouter();

  // context con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  async function crearProducto() {
    // si el usuario no esta autenticado llevar al login
    if (!usuario) {
      return router.push("/login");
    }

    // crear el objeto de nuevo producto
    const producto = {
      perfilreq,
      telefono,
      numeroalumnos,
      modalidad,
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
      },
      haVotado: [],
    };

    // insertarlo en la base de datos
    firebase.db.collection("productos").add(producto);

    return router.push("/");
  }

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  };

  const handleProgress = (progreso) => guardarProgreso({ progreso });

  const handleUploadError = (error) => {
    guardarSubiendo(error);
    console.error(error);
  };

  const handleUploadSuccess = (nombre) => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre);
    firebase.storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        guardarUrlImagen(url);
      });
  };

  return (
    <div>
      <Layout>
        {!usuario || usuario.uid.rol == 'empleador' ? (
          <Error404 />
        ) : (
          <>
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              Nueva Oferta
            </h1>
            <Formulario onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>Información General </legend>

                <Campo>
                  <label htmlFor="nombre">Vacante</label>
                  <input
                    type="text"
                    id="nombre"
                    placeholder="Vacante"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                {errores.nombre && <Error>{errores.nombre}</Error>}

                <Campo>
                  <label htmlFor="nombre">Perfil Requerido</label>
                  <input
                    type="text"
                    id="perfilreq"
                    placeholder="Perfil requerido de la oferta"
                    name="perfilreq"
                    value={perfilreq}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                {errores.perfilreq && <Error>{errores.perfilreq}</Error>}

                <Campo>
                  <label htmlFor="nombre">Numero de Alumnos</label>
                  <input
                    type="text"
                    id="numeroalumnos"
                    placeholder="Numero de alumnos solicitados"
                    name="numeroalumnos"
                    value={numeroalumnos}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                {errores.numeroalumnos && <Error>{errores.numeroalumnos}</Error>}

                <Campo>
                  <label htmlFor="nombre">Telefono</label>
                  <input
                    type="text"
                    id="telefono"
                    placeholder="Telefono"
                    name="telefono"
                    value={telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                <Campo>
                  <label htmlFor="nombre">Modalidad</label>
                  <input
                    type="text"
                    id="modalidad"
                    placeholder="Estancias / Estadias / Servicio social / Empleo"
                    name="modalidad"
                    value={modalidad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                {errores.modalidad && <Error>{errores.modalidad}</Error>}

                <Campo>
                  <label htmlFor="empresa">Empresa</label>
                  <input
                    type="text"
                    id="empresa"
                    placeholder="Nombre Empresa o Compañia"
                    name="empresa"
                    value={empresa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                {errores.empresa && <Error>{errores.empresa}</Error>}

                <Campo>
                  <label htmlFor="imagen">Imagen</label>
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("productos")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </Campo>
                <Campo>
                  <label htmlFor="url">URL</label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    placeholder="Enlace de sitio web"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                {errores.url && <Error>{errores.url}</Error>}
              </fieldset>

              <fieldset>
                <legend>Sobre la oferta</legend>

                <Campo>
                  <label htmlFor="descripcion">Descripcion</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                {errores.descripcion && <Error>{errores.descripcion}</Error>}
              </fieldset>

              {error && <Error>{error} </Error>}

              <InputSubmit
                css={css`
                  margin-bottom: 2rem;
                `}
                type="submit"
                value="Crear Oferta"
              />
            </Formulario>
          </>
        )}
      </Layout>
    </div>
  );
};

export default NuevoProducto;
