import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

import Layout from "../../components/layout/Layout";
import { FirebaseContext } from "../../firebase/index";
import Error404 from "../../components/layout/404";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { Campo, InputSubmit } from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";

const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const CreadorProducto = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  font-style: italic;
  margin: 0;
`;

const Producto = () => {
  // state del componente
  const [producto, guardarProducto] = useState({});
  const [error, guardarError] = useState(false);
  const [comentario, guardarComentario] = useState({});
  const [consultarDB, guardarConsultarDB] = useState(true);

  // Routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // context de firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && consultarDB) {
      const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection("productos").doc(id);
        const producto = await productoQuery.get();
        if (producto.exists) {
          guardarProducto(producto.data());
          console.log(producto.data());
          guardarConsultarDB(false);
        } else {
          guardarError(true);
          guardarConsultarDB(false);
        }
      };
      obtenerProducto();
    }
  }, [id, producto, consultarDB]);

  if (Object.keys(producto).length === 0 && !error) return "Cargando...";

  const {
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    urlimagen,
    votos,
    creador,
    haVotado,
    telefono,
    modalidad,
    perfilreq,
  } = producto;

  // Administrar y validar los votos
  const votarProducto = () => {
    if (!usuario) {
      return router.push("/login");
    }

    // obtener y sumar un nuevo voto
    const nuevoTotal = votos + 1;

    // Varificar si el usuario actual ha votado
    if (haVotado.includes(usuario.uid)) return;

    // guardar el ID del usuario que ha votado
    const nuevoHaVotado = [...haVotado, usuario.uid];

    // Actualizar en la base de datos
    firebase.db
      .collection("productos")
      .doc(id)
      .update({ votos: nuevoTotal, haVotado: nuevoHaVotado });

    // Actualizar el state
    guardarProducto({
      ...producto,
      votos: nuevoTotal,
    });
    guardarConsultarDB(true); // hay un voto, por lo tanto consultar a la base de datos
  };

  // Funciones para crear comentarios
  const comentarioChange = (e) => {
    guardarComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  // Identifica si el comentario es el creador del producto
  const esCreador = (id) => {
    if (creador.id == id) {
      return true;
    }
  };

  const agregarComentario = (e) => {
    e.preventDefault();
    e.target.reset();

    const comentarioCreado = {
      comentarioPublicado: Date.now(),
    };

    if (!usuario) {
      return router.push("/login");
    }

    // Informacion extra al comentario
    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;
    comentario.comentarioCreado = comentarioCreado.comentarioPublicado;

    // Tomar copia de comentarios y agregarlos al arreglo
    const nuevosComentarios = [...comentarios, comentario];

    // Actualizar la BD
    firebase.db.collection("productos").doc(id).update({
      comentarios: nuevosComentarios,
    });

    // Actualizar el state
    guardarProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });

    guardarConsultarDB(true); // Hay un comentario, por lo tanto consultar a la BD
  };

  // Funcion que revisa que el creador del producto sea el mismo que esta autenticado
  const puedeBorrar = () => {
    if (!usuario) return false;

    if (creador.id === usuario.uid) {
      return true;
    }
  };

  // Elimina un producto de la BD
  const eliminarProducto = async () => {
    if (!usuario) {
      return router.push("/login");
    }

    if (creador.id !== usuario.uid) {
      return router.push("/");
    }
    try {
      await firebase.db.collection("productos").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
          <div className="contenedor">
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              {" "}
              {nombre}{" "}
            </h1>
            <ContenedorProducto>
              <div>
                <h2
                  css={css`
                    margin: 0;
                  `}
                >
                  Por: {creador.nombre} de {empresa}{" "}
                </h2>
                <hr
                  css={css`
                    border: 1px solid red;
                    margin-bottom: 2rem;
                  `}
                />
                <img src={urlimagen} />
                <hr
                  css={css`
                    border: 1px solid var(--naranja);
                  `}
                />
                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Descripci??n
                </h2>
                <p>{descripcion}</p>
                <p
                  css={css`
                    font-style: italic;
                  `}
                >
                  <hr
                    css={css`
                      border: 1px solid var(--naranja);
                    `}
                  />
                  Publicado hace:{" "}
                  <b>{formatDistanceToNow(new Date(creado), { locale: es })}{" "}</b>
                </p>
                <p>Modalidad: <b>{modalidad}</b> </p>
                <p>Perfil Requerido: <b>{perfilreq}</b> </p>
                <p>Telefono: <b>{telefono}</b> </p>
                <hr
                  css={css`
                    border: 1px solid var(--naranja);
                  `}
                />
                {usuario && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form onSubmit={agregarComentario}>
                      <Campo>
                        <input
                          type="text"
                          required
                          placeholder="Escribe aqu?? tu comentario..."
                          name="mensaje"
                          onChange={comentarioChange}
                        />
                      </Campo>
                      <InputSubmit type="submit" value="Agregar Comentario" />
                    </form>
                  </>
                )}
                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comentarios
                </h2>
                {!usuario && (
                  <p
                    css={css`
                      font-weight: bold;
                      font-style: italic;
                    `}
                  >
                    Para comentar inicia sesi??n o crea una cuenta
                  </p>
                )}

                {comentarios.length === 0 ? (
                  "A??n no hay comentarios"
                ) : (
                  <ul>
                    {comentarios.map((comentario, i) => (
                      <li
                        key={`${comentario.usuarioId}-${i}`}
                        css={css`
                          border: 2px solid var(--naranja);
                          border-radius: 8px;
                          padding: 2rem;
                          margin-bottom: 2rem;
                        `}
                      >
                        <div>
                          <p>
                            Escrito por:{" "}
                            <span
                              css={css`
                                font-weight: bold;
                                border: 1px dashed va(--naranja);
                              `}
                            >
                              {comentario.usuarioNombre}
                            </span>{" "}
                          </p>
                          {esCreador(comentario.usuarioId) && (
                            <CreadorProducto>Es Creador</CreadorProducto>
                          )}
                        </div>
                        <p
                          css={css`
                            font-weight: bold;
                          `}
                        >
                          {comentario.mensaje}
                        </p>
                        <hr
                          css={css`
                            border: 1px solid #e1e1e1;
                          `}
                        />
                        <p
                          css={css`
                            font-style: italic;
                          `}
                        >
                          Publicado hace:{" "}
                          {formatDistanceToNow(
                            new Date(comentario.comentarioCreado),
                            {
                              locale: es,
                            }
                          )}{" "}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <aside>
                <Boton target="_blank" bgColor="true" href={url}>
                  Visitar URL
                </Boton>

                <div
                  css={css`
                    margin-top: 5rem;
                  `}
                >
                  {/* {!usuario && (
                    <p
                      css={css`
                        font-weight: bold;
                        font-style: italic;
                        text-align: center;
                      `}
                    >
                      Para votar inicia sesi??n o crea una cuenta
                    </p>
                  )}
                  {usuario && <Boton onClick={votarProducto}>Votar</Boton>} */}
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    {/* {votos} {votos === 1 ? "Voto" : "Votos"} */}
                  </p>
                  {puedeBorrar() && (
                    <Boton onClick={eliminarProducto}>Eliminar Publicacion</Boton>
                  )}
                </div>
              </aside>
            </ContenedorProducto>
          </div>
        )}
      </>
    </Layout>
  );
};

export default Producto;
