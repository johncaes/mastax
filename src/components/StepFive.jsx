import { Divider } from 'primereact/divider'
import StepHeader from './StepHeader'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'

import { Checkbox } from 'primereact/checkbox'

import Question from './Question'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Calendar } from 'primereact/calendar'

const stepFivePreguntas = [
	{
		id: 'stepFivePregunta3',
		pregunta:
			'¿Gastos de educación postsecundaria pagados para usted, su cónyuge o sus dependientes? (Formulario 1098-T)',
	},
	{
		id: 'stepFivePregunta4',
		pregunta: '¿Gastos médicos y dentales (incluso las primas de seguro)?',
	},
	{
		id: 'stepFivePregunta5',
		pregunta: '¿Intereses Hipotecarios (Formulario 1098)?',
	},
	{
		id: 'stepFivePregunta6',
		pregunta:
			'¿Impuestos (Estatales, sobre los Bienes Inmuebles, Propiedad Personal, Ventas)?',
	},
	{
		id: 'stepFivePregunta7',
		pregunta: '¿Donaciones Caritativas?',
	},
	{
		id: 'stepFivePregunta8',
		pregunta:
			'¿Gastos por el cuidado de menores y dependientes, tales como servicios de guardería?',
	},
	{
		id: 'stepFivePregunta9',
		pregunta:
			'¿Gastos para materiales utilizados por un educador que reúne los requisitos, tal como un maestro, asistente de maestro, consejero, etcétera?',
	},
	{
		id: 'stepFivePregunta10',
		pregunta:
			'¿Gastos relacionados con los ingresos del trabajo por cuenta propia u otro ingreso que usted recibió?',
	},
	{
		id: 'stepFivePregunta11',
		pregunta:
			'¿Intereses sobre un préstamo para estudios? (Formulario 1098-E)',
	},
]

const aportacionesList = [
	{
		id: 'stepFivePregunta2a',
		title: 'IRA (A)',
	},
	{
		id: 'stepFivePregunta2b',
		title: 'IRA tipo Roth',
	},
	{
		id: 'stepFivePregunta2c',
		title: '401k',
	},
	{
		id: 'stepFivePregunta2d',
		title: 'Otra',
	},
]

const StepFive = ({ stepperReference, formData, setFormData }) => {
	const defaultValues = formData || {
		stepFivePregunta1: '',
		stepFivePregunta1a: '',
		stepFivePregunta2: '',
		stepFivePregunta2a: '',
		stepFivePregunta2b: '',
		stepFivePregunta2c: '',
		stepFivePregunta2d: '',
		stepFivePregunta3: '',
		stepFivePregunta4: '',
		stepFivePregunta5: '',
		stepFivePregunta6: '',
		stepFivePregunta7: '',
		stepFivePregunta8: '',
		stepFivePregunta9: '',
		stepFivePregunta10: '',
		stepFivePregunta11: '',
	}
	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		reset,
		setError,
	} = useForm({ defaultValues })

	useEffect(() => {
		if (formData) {
			reset(formData) // 🔥 Resetea el formulario con los nuevos valores
		}
	}, [formData, reset])

	const onSubmit = (data) => {
		// Validación: Verificar si al menos un checkbox está seleccionado
		const hasSelectedCheckbox = aportacionesList.some(
			(item) => data[item.id]
		)

		if (!hasSelectedCheckbox && watch('stepFivePregunta2') === 'si') {
			setError('stepFivePregunta2', {
				type: 'manual',
				message: 'Debe seleccionar al menos una opción.',
			})
			return
		}
		setFormData((prev) => [
			prev[0],
			prev[1],
			prev[2],
			prev[3],
			{ ...prev[4], ...data },
			prev[5],
			prev[6],
		])

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
				heading='Gastos – El año pasado, pagó usted (o su cónyuge)'
				subheading='Paso 5'
			/>

			<form onSubmit={handleSubmit(onSubmit)} className=''>
				<div
					className={` bg-neutral-100/60 p-4 rounded-2xl mt-3`}
					style={{
						border: `${
							errors.stepFivePregunta1?.message
								? '1px solid red'
								: ''
						}`,
					}}
				>
					<Controller
						name='stepFivePregunta1'
						control={control}
						rules={{
							required: 'Esta pregunta es obligatoria.',
						}}
						render={({ field, fieldState }) => (
							<Question
								question='¿Pensión para el cónyuge divorciado o pagos de manutención por separado?'
								field={field}
								fieldState={fieldState}
							/>
						)}
					/>

					{/* Subpregunta: Fecha de renovación */}

					{watch('stepFivePregunta1') === 'si' && (
						<>
							<Divider />
							<div
							// style={{
							// 	border: `${
							// 		errors.stepFivePregunta1a?.message
							// 			? '1px solid red'
							// 			: ''
							// 	}`,
							// }}
							>
								<Controller
									name='stepFivePregunta1a'
									control={control}
									rules={{
										required:
											'Esta pregunta es obligatoria.',
									}}
									render={({ field, fieldState }) => (
										<Question
											question='¿Tiene el SSN del destinatario?'
											field={field}
											fieldState={fieldState}
										/>
									)}
								/>
							</div>
							{getFormErrorMessage('stepFivePregunta1a')}
						</>
					)}
				</div>
				{getFormErrorMessage('stepFivePregunta1')}

				<div
					className={` bg-neutral-100/60 p-4 rounded-2xl mt-3`}
					style={{
						border: `${
							errors.stepFivePregunta2?.message
								? '1px solid red'
								: ''
						}`,
					}}
				>
					<Controller
						name='stepFivePregunta2'
						control={control}
						rules={{
							required: 'Esta pregunta es obligatoria.',
						}}
						render={({ field, fieldState }) => (
							<Question
								question='¿Aportaciones o reintegros a una cuenta de jubilación?'
								field={field}
								fieldState={fieldState}
							/>
						)}
					/>

					{/* Subpregunta: Fecha de renovación */}

					{watch('stepFivePregunta2') === 'si' && (
						<>
							<Divider />
							<div
							// style={{
							// 	border: `${
							// 		errors.stepTwoPregunta2a?.message
							// 			? '1px solid red'
							// 			: ''
							// 	}`,
							// }}
							>
								{aportacionesList.map((item) => {
									return (
										<div
											key={item.id}
											className='mb-3 cursor-pointer'
										>
											<Controller
												name={item.id}
												control={control}
												render={({
													field,
													fieldState,
												}) => (
													<>
														<Checkbox
															inputId={item.id}
															name={item.id}
															value={field.value}
															onChange={(e) =>
																field.onChange(
																	e.checked
																)
															}
															checked={
																field.value ||
																false
															} // Evita valores undefined
															// checked={selectedCategories.some(
															// 	(item) =>
															// 		item.key ===
															// 		category.key
															// )}
														/>
														<label
															htmlFor={item.id}
															className='ml-2'
														>
															{item.title}
														</label>
													</>
												)}
											/>
										</div>
									)
								})}
							</div>
							{getFormErrorMessage('stepFivePregunta1a')}
						</>
					)}
				</div>
				{getFormErrorMessage('stepFivePregunta2')}

				{stepFivePreguntas.map((pregunta) => (
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

export default StepFive
