import React, { useState, useEffect, useContext } from "react";
import LayoutAdmin from "../components/layout/LayoutAdmin";
import useUsuarios from "../hooks/useUsuarios";
import firebase, { FirebaseContext } from "../firebase/index";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Error404 from "../components/layout/404";

const Admin = () => {
  const { firebase, usuario } = useContext(FirebaseContext);

  const { usuarios } = useUsuarios("correo");

  const usuariosRef = firebase.db.collection("usuarios");

  const [superRol, setSuperRol] = useState();

  //  console.log(usuariosRef.doc());

  //   const updateVal = (id) => {
  //     usuariosRef.doc(id).update({
  //         puedePublicar: true
  //     })
  //   }

  function obtenerDatos(usuario) {
    usuariosRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().nombre);
        if (usuario) {
          if (usuario.displayName == doc.data().nombre) {
            console.log(usuario.displayName);
            console.log(doc.data().nombre);
            console.log(doc.data().superUsuario);
            console.log("nombres iguales");
            console.log(doc.data().puedePublicar);
            setSuperRol(doc.data().superUsuario);
          }
        }
      });
    });
  }

  obtenerDatos(usuario);
  console.log(superRol);

  function obtenerMidTrue(mid) {
    firebase.db
      .collection("usuarios")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data().id);

          if (doc.data().id == mid) {
            console.log(doc.id);
            console.log(doc.data().id);
            console.log(mid);
            console.log("este es lo que queria hacer");
            usuariosRef.doc(doc.id).update({
              puedePublicar: true,
            });
          }
        });
      });
  }

  function obtenerMidFalse(mid) {
    firebase.db
      .collection("usuarios")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data().id);

          if (doc.data().id == mid) {
            console.log(doc.id);
            console.log(doc.data().id);
            console.log(mid);
            console.log("este es lo que queria hacer");
            usuariosRef.doc(doc.id).update({
              puedePublicar: false,
            });
          }
        });
      });
  }

  // usuariosRef.doc("SbEJ8ZDlhISyRDtxzZh8FBNybP92").update({
  //     puedePublicar: false
  // })

  //   async function getAllUserDocuments(){
  //     const coleccion = await firebase.db.collection("usuarios").get()
  ////     console.log(coleccion)
  //   }

  //   getAllUserDocuments()

  //console.log(usuariosRef)

  return (
    <LayoutAdmin>
      {!superRol ? (
        <Error404 />
      ) : (
        <>
          <nav className="pcoded-navbar">
            <div className="navbar-wrapper">
              <div className="navbar-brand header-logo">
                <a href="#!" className="b-brand">
                  <div className="b-bg">
                    <i className="feather icon-trending-up"></i>
                  </div>
                  <span className="b-title">DashBoard</span>
                </a>
                <a
                  className="mobile-menu"
                  id="mobile-collapse"
                  href="javascript:"
                >
                  <span></span>
                </a>
              </div>
              <div className="navbar-content scroll-div">
                <ul className="nav pcoded-inner-navbar">
                  <li className="nav-item pcoded-menu-caption">
                    <label>Navegacion</label>
                  </li>
                  <li
                    data-username="dashboard Default Ecommerce CRM Analytics Crypto Project"
                    className="nav-item active"
                  >
                    <a href="#!" className="nav-link ">
                      <span className="pcoded-micon">
                        <i className="feather icon-home"></i>
                      </span>
                      <span className="pcoded-mtext">Dashboard</span>
                    </a>
                  </li>
                  <li data-username="Sample Page" className="nav-item">
                    <a href="/" className="nav-link">
                      <span className="pcoded-micon">
                        <i className="feather icon-sidebar"></i>
                      </span>
                      <span className="pcoded-mtext">Volver</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <header className="navbar pcoded-header navbar-expand-lg navbar-light">
            <div className="m-header">
              <a
                className="mobile-menu"
                id="mobile-collapse1"
                href="javascript:"
              >
                <span></span>
              </a>
              <a href="#!" className="b-brand">
                <div className="b-bg">
                  <i className="feather icon-trending-up"></i>
                </div>
                <span className="b-title">Dashboard</span>
              </a>
            </div>
            <a className="mobile-menu" id="mobile-header" href="javascript:">
              <i className="feather icon-more-horizontal"></i>
            </a>
          </header>

          <div className="pcoded-main-container">
            <div className="pcoded-wrapper">
              <div className="pcoded-content">
                <div className="pcoded-inner-content">
                  <div className="main-body">
                    <div className="page-wrapper">
                      <div className="row">
                        <div className="col-xl-12 col-md-12">
                          <div className="card Recent-Users">
                            <div className="card-header">
                              <h5>Usuarios</h5>
                            </div>
                            <div className="card-block px-0 py-3">
                              <div className="table-responsive">
                                <table className="table table-hover">
                                  <tbody>
                                    {usuarios.map((usuario) => (
                                      <tr className="unread" key={usuario.id}>
                                        <td>
                                          <img
                                            className="rounded-circle"
                                            style={{ width: 40 + "px" }}
                                            src="/static/img/user/avatar-1.jpg"
                                            alt="activity-user"
                                          />
                                        </td>
                                        <td>
                                          <h6 className="mb-1">
                                            {usuario.nombre}
                                          </h6>
                                          <p className="m-0">
                                            Tipo: {usuario.rol}
                                          </p>
                                          {usuario.telefono && (
                                            <p className="m-0">
                                              Telefono : {usuario.telefono}
                                            </p>
                                          )}
                                          {usuario.direccion && (
                                            <p className="m-0">
                                              Dirección : {usuario.direccion}
                                            </p>
                                          )}
                                          {usuario.giroEmpresarial && (
                                            <p className="m-0">
                                              Giro Empresarial :{" "}
                                              {usuario.giroEmpresarial}
                                            </p>
                                          )}
                                          {usuario.puesto && (
                                            <p className="m-0">
                                              Puesto : {usuario.puesto}
                                            </p>
                                          )}
                                          <p className="m-0">
                                            Correo: {usuario.correo}
                                          </p>
                                        </td>
                                        <td>
                                          <h6 className="text-muted">
                                            {usuario.puedePublicar ? (
                                              <i className="fas fa-circle text-c-green f-10 m-r-15">
                                                Habilidato
                                              </i>
                                            ) : (
                                              <i className="fas fa-circle text-c-red f-10 m-r-15">
                                                Deshabilitado
                                              </i>
                                            )}
                                            Usuario creado hace:{" "}
                                            {formatDistanceToNow(
                                              new Date(usuario.creado),
                                              { locale: es }
                                            )}
                                          </h6>
                                        </td>
                                        <td>
                                          <a
                                            className="label theme-bg text-white f-12"
                                            onClick={() =>
                                              obtenerMidFalse(
                                                usuario.id.toString()
                                              )
                                            }
                                          >
                                            Desactivar
                                          </a>
                                          <a
                                            className="label theme-bg text-white f-12"
                                            onClick={() =>
                                              obtenerMidTrue(
                                                usuario.id.toString()
                                              )
                                            }
                                          >
                                            Activar
                                          </a>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </LayoutAdmin>
  );
};

export default Admin;
