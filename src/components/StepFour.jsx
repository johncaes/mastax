import { Divider } from 'primereact/divider'
import StepHeader from './StepHeader'
import { Button } from 'primereact/button'

import Question from './Question'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'

const stepFourPreguntas = [
	{
		id: 'stepFourPregunta1',
		pregunta: '¿Salarios o sueldos? (Formulario W-2)',
	},
	{
		id: 'stepFourPregunta2',
		pregunta: '¿Ingresos por concepto de propinas?',
	},
	{ id: 'stepFourPregunta3', pregunta: '¿Becas? (Formularios W-2, 1098-T)' },
	{
		id: 'stepFourPregunta4',
		pregunta:
			'¿Intereses/Dividendos de: cuentas de cheques o de ahorros, bonos, certificados de depósitos, corretaje? (Formularios 1099-INT, 1099-DIV)',
	},
	{
		id: 'stepFourPregunta5',
		pregunta:
			'¿Reembolsos de impuestos estatales/locales sobre el ingreso? (Formulario 1099-G)',
	},
	{
		id: 'stepFourPregunta6',
		pregunta:
			'¿Ingresos de pensión para el cónyuge divorciado o pagos de manutención por separado?',
	},
	{
		id: 'stepFourPregunta7',
		pregunta:
			'¿Ingresos del trabajo por cuenta propia? (Formularios 1099-MISC, 1099-NEC, 1099-K, dinero en efectivo, activos digitales u otros bienes o servicios)',
	},
	{
		id: 'stepFourPregunta8',
		pregunta:
			'¿Pagos en efectivo, cheque, activos digitales, u otros bienes o servicios por cualquier trabajo realizado pero no declarados en los Formularios W-2 o 1099?',
	},
	{
		id: 'stepFourPregunta9',
		pregunta:
			'¿Ingresos (o pérdidas) de la venta o el intercambio de acciones, bonos, activos digitales o bienes inmuebles? (incluido su hogar) (Formularios 1099-S, 1099-B)',
	},
	{
		id: 'stepFourPregunta10',
		pregunta:
			'¿Ingresos por incapacidad? (tales como pagos de seguro o compensación a trabajadores por accidentes en el trabajo) (Formularios 1099-R, W-2)',
	},
	{
		id: 'stepFourPregunta11',
		pregunta:
			'¿Ingreso de jubilación o pagos de pensiones, anualidades y/o Arreglos de ahorros para la jubilación (IRA, por sus siglas en inglés)? (Formulario 1099-R)',
	},
	{
		id: 'stepFourPregunta12',
		pregunta: '¿Compensación por desempleo? (Formulario 1099-G)',
	},
	{
		id: 'stepFourPregunta13',
		pregunta:
			'¿Beneficios del Seguro Social o de la jubilación ferroviaria? (Formularios SSA-1099, RRB-1099)',
	},
	{
		id: 'stepFourPregunta14',
		pregunta: '¿Ingresos (o pérdidas) por alquiler de propiedad?',
	},
	{
		id: 'stepFourPregunta15',
		pregunta:
			'¿Otros ingresos? (juegos de azar, lotería, premios, galardones, servicio como jurado, activos digitales, Anexo K-1, regalías, ingresos del extranjero, etcétera)',
	},
]

const StepFour = ({ stepperReference, formData, setFormData }) => {
	const defaultValues = formData || {
		stepFourPregunta1: '',
		stepFourPregunta2: '',
		stepFourPregunta3: '',
		stepFourPregunta4: '',
		stepFourPregunta5: '',
		stepFourPregunta6: '',
		stepFourPregunta7: '',
		stepFourPregunta8: '',
		stepFourPregunta9: '',
		stepFourPregunta10: '',
		stepFourPregunta11: '',
		stepFourPregunta12: '',
		stepFourPregunta13: '',
		stepFourPregunta14: '',
		stepFourPregunta15: '',
	}
	const {
		control,
		formState: { errors },
		handleSubmit,

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
			{ ...prev[3], ...data },
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
			<StepHeader
				heading='Ingresos – El año pasado, recibió usted (o su cónyuge)'
				subheading='Paso 4'
			/>

			<div>
				Marque la casilla correspondiente para cada pregunta en cada
				sección:
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className=''>
				{stepFourPreguntas.map((pregunta) => (
					<div key={pregunta.id}>
						<div
							className={` bg-neutral-100/60 p-4 rounded-2xl mt-5`}
							style={{
								border: `${
									errors[pregunta.id]?.message
										? '1px solid red'
										: ''
								}`,
							}}
						>
							<Controller
								name={pregunta.id}
								control={control}
								rules={{
									required: 'Esta pregunta es obligatoria.',
								}}
								render={({ field, fieldState }) => (
									<Question
										question={pregunta.pregunta}
										field={field}
										fieldState={fieldState}
									/>
								)}
							/>
						</div>
						{getFormErrorMessage(pregunta.id)}
					</div>
				))}

				<Divider />

				<div className='flex justify-content-end '>
					<div className='flex gap-2 pt-4 justify-content-between'>
						<Button
							type='button'
							label='Back'
							severity='secondary'
							icon='pi pi-arrow-left'
							onClick={() =>
								stepperReference.current.prevCallback()
							}
						/>
						<Button
							type='submit'
							label='Next'
							icon='pi pi-arrow-right'
							iconPos='right'
							// onClick={() => stepperRef.current.nextCallback()}
						/>
					</div>
				</div>
			</form>
		</>
	)
}

export default StepFour
