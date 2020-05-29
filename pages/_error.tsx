// HOOKS Y TIPOS DE DATOS
import React, { useContext, useEffect } from 'react'
import { useGetAllProducts } from 'Hooks'
import { NextApiResponse } from 'next'

// CONTENEDOR DE ANIMACIÓN
import { motion } from 'framer-motion'

// NAVEGACIÓN Y CONTEXTO
import Link from 'next/link'
import { appContext } from 'Ctx'

const ErrorPage = () => {
	// TEXTOS DE PAGINA DE ERROR
	const str = useContext(appContext).lang.errorPage

	// DESCARGAR PRODUCTOS
	useEffect(() => {
		useGetAllProducts()
	}, [])

	return (
		<motion.div initial='exit' animate='enter' exit='exit'>
			<div id='errorPage'>
				<div>
					<h1>{str.title}</h1>
					<p>{str.description_1 + ' ' + str.description_2}</p>
					<Link href='/' passHref scroll={false}>
						<a className='waves waves-dark btn white' title={str.button}>
							<i className='material-icons'>reply</i> {str.button}
						</a>
					</Link>
				</div>
				<img src='/images/error/error.png' />

				<style jsx>{`
					#errorPage {
						position: fixed;
						top: 0;
						left: 0;
						width: 100%;
						height: 100vh;
						background: var(--primary);
						z-index: 10;
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
					img {
						width: 250px;
						position: fixed;
						bottom: -30px;
						right: 0;
					}
				`}</style>
			</div>
		</motion.div>
	)
}

// OBTENER PROPIEDADES INICIALES
ErrorPage.getInitialProps = (res: NextApiResponse, err: any) => {
	const code: number = res ? res.statusCode : err ? err.statusCode : 404
	return { code }
}

export default ErrorPage
