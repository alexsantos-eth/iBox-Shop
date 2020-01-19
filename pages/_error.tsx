// HOOKS Y TIPOS DE DATOS
import { useRipples, useGetAllProducts } from "../utils/hooks";
import React, { useContext, useEffect } from "react";
import { NextApiResponse } from "next";

// CONTENEDOR DE ANIMACION
import { motion } from "framer-motion";

// NAVEGACION Y CONTEXTO
import Link from "next/link";
import appContext from "../utils/appContext";


// PROPIEDADES
interface Props { code: number }

const ErrorPage = (props: Props) => {
  // TEXTOS DE PAGINA DE ERROR
  const str = useContext(appContext.appContext).lang.errorPage;

  // APLICAR EFECTO RIPPLE
  useRipples();

  // DESCARGAR PRODUCTOS
  useEffect(() => { useGetAllProducts() });

  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <div id="errorPage">
        <div>
          <h1>{str.title}</h1>
          <p>{str.description_1 + props.code + str.description_2}</p>
          <Link href="/" passHref scroll={false}>
            <a className="waves waves-dark btn white" title="Home">
              <i className="uil uil-corner-up-left-alt"></i> {str.button}
            </a>
          </Link>
        </div>
        <img src={require("../assets/error.png")} />

        <style jsx>{`
          #errorPage {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: var(--primary);
            z-index:10;
          }
          #errorPage > div {
            position: absolute;
            top: 40%;
            left: 50%;
            width: 100%;
            padding: 20px;
            transform: translate(-50%, -50%);
            font-size: 1.2em;
            color: var(--backgrounds);
          }
          a {
            color: var(--text);
            display: inline-flex;
            margin-top: 20px;
            justify-content: space-between;
          }
          a i {
            position: relative;
            left: -10px;
            margin: 0;
            padding: 0;
          }
          img {
            width: 250px;
            position: fixed;
            bottom: -30px;
            right: 0;
          }
        `}</style>
      </div>
    </motion.div>
  );
};

// OBTENER PROPIEDADES INICIALES
ErrorPage.getInitialProps = (res: NextApiResponse, err: any) => {
  const code: number = res ? res.statusCode : err ? err.statusCode : 404;
  return { code };
};

export default ErrorPage;