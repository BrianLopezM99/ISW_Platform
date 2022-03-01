import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase/index";

const useUsuarios = (orden) => {
  const [usuarios, guardarUsuarios] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerUsuarios = () => {
      firebase.db
        .collection("usuarios")
        .orderBy(orden, "desc")
        .onSnapshot(manejarSnapshot);
    };
    obtenerUsuarios();
  }, []);

  function manejarSnapshot(snapshot) {
    const usuarios = snapshot.docs.map((doc) => {
      return {
        nombre: doc.nombre,
        ...doc.data(),
      };
    });

    guardarUsuarios(usuarios);
  }

  return {
    usuarios,
  };
};

export default useUsuarios;