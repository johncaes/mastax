import { Button } from 'primereact/button'
import StepHeader from './StepHeader'
import { Dialog } from 'primereact/dialog'
import { useEffect, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Controller, useForm } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
const trimCanvas = (canvas) => {
	const ctx = canvas.getContext('2d')
	if (!ctx) return canvas // Evita errores si el contexto no se obtiene correctamente

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
	const pixels = imageData.data
	const width = canvas.width
	const height = canvas.height

	let top = 0,
		bottom = height,
		left = 0,
		right = width

	// Encontrar el límite superior
	outerTop: for (; top < height; top++) {
		for (let x = 0; x < width; x++) {
			if (pixels[(top * width + x) * 4 + 3] !== 0) {
				break outerTop
			}
		}
	}

	// Encontrar el límite inferior
	outerBottom: for (; bottom > top; bottom--) {
		for (let x = 0; x < width; x++) {
			if (pixels[((bottom - 1) * width + x) * 4 + 3] !== 0) {
				break outerBottom
			}
		}
	}

	// Encontrar el límite izquierdo
	outerLeft: for (; left < width; left++) {
		for (let y = top; y < bottom; y++) {
			if (pixels[(y * width + left) * 4 + 3] !== 0) {
				break outerLeft
			}
		}
	}

	// Encontrar el límite derecho
	outerRight: for (; right > left; right--) {
		for (let y = top; y < bottom; y++) {
			if (pixels[(y * width + (right - 1)) * 4 + 3] !== 0) {
				break outerRight
			}
		}
	}

	// Verificar si hay algo que recortar
	if (right <= left || bottom <= top) {
		return canvas // Retornar el mismo canvas si no hay contenido visible
	}

	// Crear un nuevo canvas con las dimensiones recortadas
	const trimmedCanvas = document.createElement('canvas')
	trimmedCanvas.width = right - left
	trimmedCanvas.height = bottom - top
	const trimmedCtx = trimmedCanvas.getContext('2d')

	if (trimmedCtx) {
		trimmedCtx.drawImage(
			canvas,
			left,
			top,
			right - left,
			bottom - top,
			0,
			0,
			right - left,
			bottom - top
		)
	}

	return trimmedCanvas
}

const StepSeven = ({ stepperReference, formData, setFormData }) => {
	const [visible, setVisible] = useState(false)
	const [imageURL, setImageURL] = useState(null) // create a state that will contain our image url
	const sigCanvas = useRef({})
	const clear = () => sigCanvas.current.clear()
	const save = () => {
		const canvas = sigCanvas.current.getCanvas()
		const trimmedCanvas = trimCanvas(canvas)
		const trimmedDataURL = trimmedCanvas.toDataURL('image/png')
		setImageURL(trimmedDataURL)
	}

	const defaultValues = formData || {
		stepSixPregunta1: '',
		stepSixPregunta2: '',
		stepSixPregunta3: '',
		stepSixPregunta4: '',
		stepSixPregunta5: '',
		stepSixPregunta6: '',
		stepSixPregunta7: '',
		stepSixPregunta8: '',
		stepSixPregunta8a: '',
		stepSixPregunta9: '',
		stepSixPregunta9fecha1: '',
		stepSixPregunta9fecha2: '',
		stepSixPregunta9fecha3: '',
		stepSixPregunta9fecha4: '',
		stepSixPregunta9monto1: '',
		stepSixPregunta9monto2: '',
		stepSixPregunta9monto3: '',
		stepSixPregunta9monto4: '',
	}
	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		reset,
	} = useForm({ defaultValues })

	useEffect(() => {
		if (formData) {
			reset(formData) // 🔥 Resetea el formulario con los nuevos valores
		}
	}, [formData, reset])

	const onSubmit = (data) => {
		setFormData((prev) => [
			prev[0],
			prev[1],
			prev[2],
			prev[3],
			prev[4],
			{ ...prev[5], ...data },
			prev[6],
		])
		console.log('Step one', data)
		stepperReference.current.nextCallback()

		// setShowMessage(true)
	}

	const getFormErrorMessage = (name) => {
		return (
			errors[name] && (
				<small className='p-error'>{errors[name].message}</small>
			)
		)
	}
	return (
		<>
			<StepHeader subheading='Paso 7' heading='Consentimiento' />
			<p className='leading-7'>
				Certifico bajo pena de perjurio que la información que he
				proporcionado en esta solicitud es verdadera y completa a mi
				leal saber y entender. Si se me solicita, puedo y estoy
				dispuesto a proporcionar pruebas. Entiendo completamente que
				puedo estar sujeto a multas y/o proceso penal por parte del IRS
				por mentir en mi declaración. Entiendo que yo (“nosotros”) soy
				el único responsable y no tengo derecho a presentar ningún
				reclamo contra el preparador de impuestos o MAS Taxes & Services
				LLC.
			</p>

			{/* Nombre y Firma  - Uno */}
			<div className='  my-32'>
				{/* Nombre */}

				{/* Nombre */}
				<div className='mx-auto w-80'>
					<span className='p-float-label p-fluid '>
						<Controller
							name='nameCon'
							control={control}
							rules={{
								required: 'El nombre es requerido.',
							}}
							render={({ field, fieldState }) => (
								<InputText
									id={field.nameCon}
									{...field}
									autoFocus
									// className={classNames({
									// 	'p-invalid':
									// 		fieldState.invalid,
									// })}
								/>
							)}
						/>
						<label
							htmlFor='nameCon'
							// className={classNames({
							// 	'p-error': errors.nameCon,
							// })}
						>
							Nombre de quien llena este formulario
						</label>
					</span>
					{/* {getFormErrorMessage('nameCon')} */}
				</div>

				{/* Firma */}
				<div>
					<div className='w-44 mx-auto my-5 border-b border-neutral-400 pb-4'>
						{imageURL ? (
							<img
								src={imageURL}
								alt='my signature'
								style={{
									display: 'block',
									margin: '0 auto',
								}}
							/>
						) : null}
					</div>
					<div className='flex justify-center'>
						<Button
							label='Firmar '
							icon='pi pi-pencil'
							onClick={() => setVisible(true)}
						/>
					</div>

					<Dialog
						header='Firmar documento'
						visible={visible}
						modal={true}
						draggable={false}
						style={{
							width: '70vw',
							borderRadius: '50px',
						}}
						onHide={() => {
							if (!visible) return
							setVisible(false)
						}}
						className='bg-neutral-300'
					>
						<div className=''>
							<SignatureCanvas
								ref={sigCanvas}
								penColor='black'
								canvasProps={{
									// width: 500,
									// height: 200,
									className:
										'w-full h-[50vh] border border-neutral-300 rounded-2xl',
								}}
							/>
							{/* Buttons */}
							<div className='flex justify-end'>
								<div className='flex justify-end gap-2 w-2/3 mt-5'>
									<Button
										label='Guardar '
										icon='pi pi-save'
										onClick={save}
									/>
									<Button
										outlined
										label='Borrar '
										icon='pi pi-eraser'
										onClick={clear}
									/>
									<Button
										outlined
										label='Cerrar '
										icon='pi pi-eraser'
										onClick={() => setVisible(false)}
									/>
								</div>
							</div>
						</div>
					</Dialog>
				</div>
			</div>

			<p className='leading-7'>
				La ley Federal requiere que le proporcionemos este formulario de
				consentimiento. A menos que la ley lo autorice, no podemos
				divulgar sin su consentimiento la información de su declaración
				de impuestos a terceros para propósitos diferentes a la
				preparación y presentación de su declaración de impuestos. Si
				usted da su consentimiento para la divulgación de la información
				de su declaración de impuestos, la ley Federal tal vez no pueda
				proteger la información de su declaración de impuestos de uso
				adicional o distribución. No se le requiere completar este
				formulario para recibir nuestros servicios de preparación de
				declaraciones de impuestos. Si obtenemos su firma en este
				formulario condicionando nuestros servicios de preparación de
				impuestos a su consentimiento, su consentimiento no será válido.
				Si está de acuerdo con la divulgación de la información de su
				declaración de impuestos, su consentimiento es válido por la
				cantidad de tiempo que usted especifique. Si no especifica la
				duración de su consentimiento, su consentimiento es válido por
				un año a partir de la fecha de su firma. Al firmar a
				continuación, usted (incluido cada uno de ustedes si hay más de
				un contribuyente) nos autoriza a utilizar la información que nos
				proporcionó durante la preparación de la declaración de
				impuestos de este año.
			</p>
		</>
	)
}

export default StepSeven
