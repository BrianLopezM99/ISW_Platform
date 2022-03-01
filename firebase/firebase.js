import { firestore } from "firebase-admin";
import app, { auth } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  // Registra un usuario
  async registrar(nombre, email, password, rol, telefono, puesto, giroempresarial, direccion) {
    const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    
    let idRandom = Math.floor(Math.random() * 999999)

    const verificacion = await this.auth.currentUser.sendEmailVerification()

    const docuRef = await this.db.collection("usuarios").doc(nuevoUsuario.user.uid).set({
      nombre: nombre,
      correo: email,
      rol: rol,
      telefono: telefono,
      puesto: puesto,
      giroEmpresarial: giroempresarial,
      direccion: direccion,
      creado: Date.now(),
      puedePublicar: false,
      id: idRandom
  })
  .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });

    

    return await docuRef, verificacion, nuevoUsuario.user.updateProfile({
      displayName: nombre,
    });

  }

  // Inicia sesión del usuario
  async login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async resetPassword(email) {
    return this.auth.sendPasswordResetEmail(email)
  }

  // Cierra la sesión del usuario
  async cerrarSesion() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();
export default firebase;
