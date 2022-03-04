import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase/index";

const Nav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gris2);
    font-family: "PT Sans", sans-serif;
    transition: all 300ms;

    &:last-of-type {
      margin-right: 0;
    }
  }
  a:hover {
    color: var(--naranja);
    transform: scale(1.2, 1.2);
  }
  @media (max-width: 963px) {
    display: flex;
    flex-flow: nowrap column;
    justify-items: center;

    a {
      font-size: 1.6rem;
    }
  }
`;

const Navegacion = () => {
  const [publicar, setPublicar] = useState();
  const [superUser, setSuperUser] = useState()

  const { firebase, usuario } = useContext(FirebaseContext);

  const usuariosRef = firebase.db.collection("usuarios");

  // console.log(
  //   usuariosRef.get().then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data().nombre);
  //     });
  //   })
  // );

  function obtenerDatos(usuario) {
    usuariosRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().nombre);
        if (usuario) {
          if (usuario.displayName == doc.data().nombre) {
            console.log(usuario.displayName);
            console.log(doc.data().nombre);
            console.log("nombres iguales");
            console.log(doc.data().puedePublicar);
            setPublicar(doc.data().puedePublicar);
            console.log(doc.data().superUsuario);
            setSuperUser(doc.data().superUsuario)
          }
        }
      });
    });
  }

  console.log(publicar);

  obtenerDatos(usuario);

  //console.log(rol)

  return (
    <Nav>
      <Link href="/">
        <a>Inicio</a>
      </Link>
      <Link href="/populares">
        <a>Populares</a>
      </Link>
      {publicar && (
        <Link href="/nuevo-producto">
          <a>Nueva Oferta</a>
        </Link>
      )}
      {superUser && (
        <Link href="/admin">
          Panel de Administrador
        </Link>
      )}
    </Nav>
  );
};

export default Navegacion;
