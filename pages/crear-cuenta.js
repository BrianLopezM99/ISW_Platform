import React, { useState } from "react";
import { css } from "@emotion/core";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import firebase from "../firebase/index";

// Validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from "../validacion/validarCrearCuenta";


const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
  rol: "",
  direccion: "",
  telefono: "",
  puesto: "",
  giroempresarial: "",

};

const CrearCuenta = () => {
  const [error, guardarError] = useState(false);

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  // Extraer valores
  const { nombre, email, password, rol, direccion, telefono, puesto, giroempresarial } = valores;

  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password, rol, telefono, puesto, giroempresarial, direccion);
      Router.push("/");
    } catch (error) {
      console.error("Hubo un error al crear el usuario", error.message);
      guardarError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Crear Cuenta
          </h1>
          <Formulario onSubmit={handleSubmit}>
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Tu Nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.nombre && <Error>{errores.nombre}</Error>}
            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.email && <Error>{errores.email}</Error>}
            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.alumno}
            <Campo>
              <label htmlFor="rol">Tipo</label>
              <select name="rol" id="rol" onChange={handleChange}>
                <option>--Seleccionar--</option>
                <option value="alumno" id="rol">
                  Alumno
                </option>
                <option value="empleador" id="rol">
                  Empleador
                </option>
              </select>
            </Campo>

            {/* EXTENSION FORMULARIO EMPLEADORES */}

            {rol == "empleador" ? (
              <div>
                <Campo>
                  <label htmlFor="direccion">Direccion</label>
                  <input
                    type="text"
                    id="direccion"
                    placeholder="Tu direccion"
                    name="direccion"
                    value={direccion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.direccion && <Error>{errores.direccion}</Error>}
                <Campo>
                  <label htmlFor="telefono">Telefono</label>
                  <input
                    type="number"
                    id="telefono"
                    placeholder="Tu telefono"
                    name="telefono"
                    value={telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.telefono && <Error>{errores.telefono}</Error>}
                <Campo>
                <label htmlFor="puesto">Puesto</label>
                <input
                  type="text"
                  id="puesto"
                  placeholder="Tu Puesto"
                  name="puesto"
                  value={puesto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>
              {errores.puesto && <Error>{errores.puesto}</Error>}
              <Campo>
                <label htmlFor="giroempresarial">Giro Empresarial</label>
                <input
                  type="text"
                  id="giroempresarial"
                  placeholder="Giro empresarial"
                  name="giroempresarial"
                  value={giroempresarial}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>
              {errores.giroempresarial && <Error>{errores.giroempresarial}</Error>}
              </div>
            ) : null}
            {errores.password && <Error>{errores.password}</Error>}
            {error && <Error>{error}</Error>}
            <InputSubmit type="submit" value="Crear Cuenta" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
