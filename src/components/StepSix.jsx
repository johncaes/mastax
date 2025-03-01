import React, { useEffect } from 'react'
import StepHeader from './StepHeader'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Controller, useForm } from 'react-hook-form'
import Question from './Question'
import { Calendar } from 'primereact/calendar'
import { classNames } from 'primereact/utils'
import { InputNumber } from 'primereact/inputnumber'
import { FloatLabel } from 'primereact/floatlabel'

const stepSixPreguntas = [
	{
		id: 'stepSixPregunta1',
		pregunta:
			'¿Tuvo una cuenta de ahorros para gastos médicos? (Formularios 5498-SA, 1099-SA, W-2 con el código W en la casilla 12)',
	},
	{
		id: 'stepSixPregunta2',
		pregunta:
			'¿Tuvo una deuda de tarjeta de crédito, un préstamo estudiantil, o una deuda hipotecaria cancelada/condonada por un prestamista o una ejecución hipotecaria de su vivienda? (Formularios 1099-C, 1099-A)',
	},
	{
		id: 'stepSixPregunta3',
		pregunta: '¿Adoptó a un niño?',
	},
	{
		id: 'stepSixPregunta4',
		pregunta:
			'¿Compró e instaló equipo de eficiencia energética en su hogar? (tales como ventanas, calefacción, material de aislamiento, etcétera)',
	},
	{
		id: 'stepSixPregunta5',
		pregunta:
			'¿Recibió en 2008 el crédito tributario para comprador de primera vivienda?',
	},
	{
		id: 'stepSixPregunta6',
		pregunta:
			'¿Presentó una declaración de impuestos federales el año pasado que incluyera una “pérdida de capital trasladada al año siguiente” en el Anexo D del Formulario 1040?',
	},
	{
		id: 'stepSixPregunta7',
		pregunta:
			'¿Tuvo la cobertura de cuidado de salud a través del Mercado de Seguros de Salud (Intercambio)? [Proporcione el Formulario 1095-A]',
	},
]
const pregunta9 = [
	{
		id1: 'stepSixPregunta9fecha1',
		id2: 'stepSixPregunta9monto1',
		title1: 'Fecha de pago 1',
		title2: 'Monto 1',
	},
	{
		id1: 'stepSixPregunta9fecha2',
		id2: 'stepSixPregunta9monto2',
		title1: 'Fecha de pago 2',
		title2: 'Monto 2',
	},
	{
		id1: 'stepSixPregunta9fecha3',
		id2: 'stepSixPregunta9monto3',
		title1: 'Fecha de pago 3',
		title2: 'Monto 3',
	},
	{
		id1: 'stepSixPregunta9fecha4',
		id2: 'stepSixPregunta9monto4',
		title1: 'Fecha de pago 4',
		title2: 'Monto 4',
	},
]

const StepSix = ({ stepperReference, formData, setFormData }) => {
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
			<StepHeader
				heading='Acontecimientos importantes en la vida – El año pasado, usted (o su cónyuge)'
				subheading='Paso 6'
			/>

			<form onSubmit={handleSubmit(onSubmit)} className=''>
				{stepSixPreguntas.map((pregunta) => (
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

				<div
					className={` bg-neutral-100/60 p-4 rounded-2xl mt-3`}
					style={{
						border: `${
							errors.stepSixPregunta8?.message
								? '1px solid red'
								: ''
						}`,
					}}
				>
					<Controller
						name='stepSixPregunta8'
						control={control}
						rules={{
							required: 'Esta pregunta es obligatoria.',
						}}
						render={({ field, fieldState }) => (
							<Question
								question='¿Le fue denegado en un año anterior el Crédito por Ingreso del Trabajo, el Crédito Tributario por Hijos o el Crédito de Oportunidad para los Estadounidenses?'
								field={field}
								fieldState={fieldState}
							/>
						)}
					/>

					{/* Subpregunta: Fecha de renovación */}

					{watch('stepSixPregunta8') === 'si' && (
						<>
							<Divider />
							<div className='flex  gap-5 flex-1 w-1/2'>
								<div className='field my-3 flex-1 p-fluid'>
									<span className='p-float-label'>
										<Controller
											name={'stepSixPregunta8a'}
											control={control}
											rules={{
												required:
													'La fecha es requerida.',
											}}
											render={({ field, fieldState }) => (
												<Calendar
													id={'stepSixPregunta8a'}
													value={field.value}
													onChange={(e) =>
														field.onChange(e.value)
													}
													dateFormat='yy'
													mask='99/99/9999'
													view='year'
													showIcon
													className={classNames({
														'p-invalid':
															fieldState.invalid,
													})}
												/>
											)}
										/>
										<label
											htmlFor={'stepSixPregunta8a'}
											className={classNames({
												'p-error':
													errors.stepSixPregunta8a,
											})}
										>
											¿En qué año tributario?
										</label>
									</span>
									{getFormErrorMessage('stepSixPregunta8a')}
								</div>
							</div>
						</>
					)}
				</div>
				{getFormErrorMessage('stepSixPregunta8')}

				<div
					className={` bg-neutral-100/60 p-4 rounded-2xl mt-3`}
					style={{
						border: `${
							errors.stepSixPregunta9?.message
								? '1px solid red'
								: ''
						}`,
					}}
				>
					<Controller
						name='stepSixPregunta9'
						control={control}
						rules={{
							required: 'Esta pregunta es obligatoria.',
						}}
						render={({ field, fieldState }) => (
							<Question
								question='¿Efectuó pagos de impuestos estimados o aplicó el reembolso del año anterior a sus impuestos del año en curso?'
								field={field}
								fieldState={fieldState}
							/>
						)}
					/>

					{/* Subpregunta: Fecha de renovación */}

					{watch('stepSixPregunta9') === 'si' && (
						<>
							<Divider />

							<div className='mt-10'>
								{pregunta9.map((item, index) => (
									<div
										key={item.id1}
										className='flex justify-between gap-5 mb-5'
									>
										<div className='flex-1'>
											<span className='p-float-label p-fluid'>
												<Controller
													name={item.id1}
													control={control}
													rules={{
														required:
															'La fecha es requerida.',
													}}
													render={({
														field,
														fieldState,
													}) => (
														<Calendar
															id={item.id1}
															value={field.value}
															onChange={(e) =>
																field.onChange(
																	e.value
																)
															}
															dateFormat='mm/dd/yy'
															mask='99/99/9999'
															showIcon
															className={classNames(
																{
																	'p-invalid':
																		fieldState.invalid,
																}
															)}
														/>
													)}
												/>
												<label
													htmlFor={item.id1}
													className={classNames({
														'p-error':
															errors.pregunta9?.[
																index
															].id1,
													})}
												>
													{item.title1}
												</label>
											</span>
											{getFormErrorMessage(item.id1)}
										</div>
										<div className='flex-1'>
											<span className='p-float-label p-fluid'>
												<Controller
													name={item.id2}
													control={control}
													rules={{
														required:
															'El monto es requerido',
													}}
													render={({
														field,
														fieldState,
													}) => (
														<FloatLabel>
															<InputNumber
																inputId={
																	item.id2
																}
																value={
																	field.value
																}
																onValueChange={(
																	e
																) =>
																	field.onChange(
																		e.value
																	)
																}
																mode='currency'
																currency='USD'
																locale='en-US'
															/>
															<label
																htmlFor={
																	item.id2
																}
																className={classNames(
																	{
																		'p-error':
																			errors
																				.pregunta9?.[
																				index
																			]
																				.id2,
																	}
																)}
															>
																{item.title2}
															</label>
														</FloatLabel>
													)}
												/>
											</span>
											{getFormErrorMessage(item.id2)}
										</div>
									</div>
								))}
							</div>
						</>
					)}
				</div>
				{getFormErrorMessage('stepSixPregunta9')}

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

export default StepSix
