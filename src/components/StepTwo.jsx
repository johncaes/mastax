import { Button } from 'primereact/button'
import StepHeader from './StepHeader'
import { Divider } from 'primereact/divider'
import { useEffect } from 'react'
import { classNames } from 'primereact/utils'

import { RadioButton } from 'primereact/radiobutton'

import { Controller, useForm } from 'react-hook-form'
import Question from './Question'
import { Calendar } from 'primereact/calendar'

const StepTwo = ({ stepperReference, formData, setFormData }) => {
	const defaultValues = formData || {
		estadoCivil: '',
		seCaso2025: '',
		vivioConConyuge: '',
		fechaDivorcio: '',
		legalmenteSeparado: '',
		fechaManutencion: '',
		fechaViudez: '',
		cabezaDeHogar: '',
	}

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		reset,
		setError,
		setValue,
	} = useForm({ defaultValues })

	useEffect(() => {
		if (formData) {
			reset(formData) // 🔥 Resetea el formulario con los nuevos valores
		}
	}, [formData, reset])

	const onSubmit = (data) => {
		console.log('test')

		setFormData((prev) => [
			prev[0],
			{ ...prev[1], ...data },
			prev[2],
			prev[3],
			prev[4],
		])

		stepperReference.current.nextCallback()

		// setShowMessage(true)
	}

	const estadoCivil = watch('estadoCivil')
	const legalmenteSeparado = watch('legalmenteSeparado')

	const getFormErrorMessage = (name) => {
		return (
			errors[name] && (
				<small className='p-error'>{errors[name].message}</small>
			)
		)
	}

	const handleRadioChange = (name, value) => {
		setValue(name, value) // Actualiza el valor en react-hook-form

		// Si cambia el estado civil, resetear valores dependientes
		if (name === 'estadoCivil') {
			reset({
				...defaultValues, // Restablece los valores predeterminados
				estadoCivil: value, // Mantiene el nuevo estado civil
			})
		}
	}
	return (
		<div>
			<StepHeader heading='Estado civil' subheading='Paso 2' />

			<form onSubmit={handleSubmit(onSubmit)} className=''>
				<div
					style={{
						border: `${
							errors.estadoCivil?.message ? '1px solid red' : ''
						}`,
					}}
					className='flex flex-col gap-5 p-4 rounded-2xl'
				>
					{/* Soltero */}
					<div>
						<Controller
							name='estadoCivil'
							control={control}
							rules={{ required: 'Seleccione su estado civil' }}
							render={({ field }) => (
								<div className='flex items-center gap-2'>
									<RadioButton
										inputId='soltero'
										name='estadoCivil'
										value='soltero'
										onChange={(e) =>
											handleRadioChange(
												'estadoCivil',
												e.value
											)
										}
										checked={field.value === 'soltero'}
									/>
									<label
										htmlFor='soltero'
										className='cursor-pointer'
									>
										Soltero(a)
									</label>
								</div>
							)}
						/>
					</div>

					{/* Casado */}
					<div>
						<Controller
							name='estadoCivil'
							control={control}
							render={({ field }) => (
								<div className='flex items-center gap-2'>
									<RadioButton
										inputId='casado'
										name='estadoCivil'
										value='casado'
										onChange={(e) =>
											handleRadioChange(
												'estadoCivil',
												e.value
											)
										}
										checked={field.value === 'casado'}
									/>
									<label
										htmlFor='casado'
										className='cursor-pointer'
									>
										Casado(a)
									</label>
								</div>
							)}
						/>
					</div>

					{/* Divorciado */}
					<div>
						<Controller
							name='estadoCivil'
							control={control}
							render={({ field }) => (
								<div className='flex items-center gap-2'>
									<RadioButton
										inputId='divorciado'
										name='estadoCivil'
										value='divorciado'
										onChange={(e) =>
											handleRadioChange(
												'estadoCivil',
												e.value
											)
										}
										checked={field.value === 'divorciado'}
									/>
									<label
										htmlFor='divorciado'
										className='cursor-pointer'
									>
										Divorciado(a) / separado(a)
									</label>
								</div>
							)}
						/>
					</div>

					{/* Viudo */}
					<div>
						<Controller
							name='estadoCivil'
							control={control}
							render={({ field }) => (
								<div className='flex items-center gap-2'>
									<RadioButton
										inputId='viudo'
										name='estadoCivil'
										value='viudo'
										onChange={(e) =>
											handleRadioChange(
												'estadoCivil',
												e.value
											)
										}
										checked={field.value === 'viudo'}
									/>
									<label
										htmlFor='viudo'
										className='cursor-pointer'
									>
										Viudo(a)
									</label>
								</div>
							)}
						/>
					</div>

					{/* Cabeza de hogar */}
					<div>
						<Controller
							name='estadoCivil'
							control={control}
							render={({ field }) => (
								<div className='flex items-center gap-2'>
									<RadioButton
										inputId='cabezaHogar'
										name='estadoCivil'
										value='cabezaHogar'
										onChange={(e) =>
											handleRadioChange(
												'estadoCivil',
												e.value
											)
										}
										checked={field.value === 'cabezaHogar'}
									/>
									<label
										htmlFor='cabezaHogar'
										className='cursor-pointer'
									>
										Cabeza de hogar
									</label>
								</div>
							)}
						/>
					</div>
				</div>
				{getFormErrorMessage('estadoCivil')}
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
		</div>
	)
}

export default StepTwo

{
	/* <Controller
name='stepTwoPregunta1'
control={control}
rules={{ required: 'Esta pregunta es obligatoria.' }}
render={({ field }) => (
	<div className='flex flex-col gap-5'>
		
			<div  className=''>
				<RadioButton
					inputId={item.id}
					name={field.name}
					value={item.value}
					onChange={(e) =>
						field.onChange(e.value)
					}
					checked={field.value === item.value}
				/>
				<label htmlFor={item.id} className='ml-2'>
					{item.label}
				</label>
			</div>
		
	</div>
)}
/> */
}
// {getFormErrorMessage('stepTwoPregunta1')}

// <div
// className={` bg-neutral-100/60 p-4 rounded-2xl mt-3`}
// style={{
// 	border: `${
// 		errors.stepTwoPregunta2?.message
// 			? '1px solid red'
// 			: ''
// 	}`,
// }}
// >
// <Controller
// 	name='stepTwoPregunta2'
// 	control={control}
// 	rules={{
// 		required: 'Esta pregunta es obligatoria.',
// 	}}
// 	render={({ field, fieldState }) => (
// 		<Question
// 			question='¿Es casado(a)?'
// 			field={field}
// 			fieldState={fieldState}
// 		/>
// 	)}
// />

// {/* Subpregunta: Fecha de renovación */}

// {watch('stepTwoPregunta2') === 'si' && (
// 	<>
// 		<Divider />
// 		<div
// 		// style={{
// 		// 	border: `${
// 		// 		errors.stepTwoPregunta2a?.message
// 		// 			? '1px solid red'
// 		// 			: ''
// 		// 	}`,
// 		// }}
// 		>
// 			<Controller
// 				name='stepTwoPregunta2a'
// 				control={control}
// 				rules={{
// 					required:
// 						'Esta pregunta es obligatoria.',
// 				}}
// 				render={({ field, fieldState }) => (
// 					<Question
// 						question='¿Se casó en 2025?'
// 						field={field}
// 						fieldState={fieldState}
// 					/>
// 				)}
// 			/>
// 		</div>
// 		{getFormErrorMessage('stepTwoPregunta2b')}

// 		<br />
// 		<br />

// 		<Controller
// 			name='stepTwoPregunta2b'
// 			control={control}
// 			rules={{
// 				required: 'Esta pregunta es obligatoria.',
// 			}}
// 			render={({ field, fieldState }) => (
// 				<Question
// 					question='¿Vivió con su cónyuge durante alguna parte de los últimos seis meses de 2025?'
// 					field={field}
// 					fieldState={fieldState}
// 				/>
// 			)}
// 		/>
// 		{getFormErrorMessage('stepTwoPregunta2b')}
// 	</>
// )}
// </div>
// {getFormErrorMessage('stepTwoPregunta2')}

// <div
// className={` bg-neutral-100/60 p-4 rounded-2xl mt-3`}
// style={{
// 	border: `${
// 		errors.stepTwoPregunta3?.message
// 			? '1px solid red'
// 			: ''
// 	}`,
// }}
// >
// <Controller
// 	name='stepTwoPregunta3'
// 	control={control}
// 	rules={{
// 		required: 'Esta pregunta es obligatoria.',
// 	}}
// 	render={({ field, fieldState }) => (
// 		<Question
// 			question='¿Es divorciado(a)?'
// 			field={field}
// 			fieldState={fieldState}
// 		/>
// 	)}
// />

// {/* Subpregunta: Fecha de renovación */}

// {watch('stepTwoPregunta3') === 'si' && (
// 	<>
// 		<Divider />

// 		<span className='p-float-label mt-5 p-fluid w-6'>
// 			<Controller
// 				name='stepTwoPregunta3a'
// 				control={control}
// 				rules={{
// 					required:
// 						'La fecha de nacimiento es requerida.',
// 				}}
// 				render={({ field, fieldState }) => (
// 					<Calendar
// 						id={field.pregunta1Sub}
// 						value={field.value}
// 						onChange={(e) =>
// 							field.onChange(e.value)
// 						}
// 						dateFormat='dd/mm/yy'
// 						mask='99/99/9999'
// 						showIcon
// 						className={classNames({
// 							'p-invalid': fieldState.invalid,
// 						})}
// 					/>
// 				)}
// 			/>
// 			<label
// 				htmlFor='stepTwoPregunta3a'
// 				className={classNames({
// 					'p-error': errors.stepTwoPregunta3a,
// 				})}
// 			>
// 				Fecha del decreto final
// 			</label>
// 		</span>
// 		{getFormErrorMessage('stepTwoPregunta3a')}

// 		<br />
// 		<br />

// 		<Controller
// 			name='stepTwoPregunta3b'
// 			control={control}
// 			rules={{
// 				required: 'Esta pregunta es obligatoria.',
// 			}}
// 			render={({ field, fieldState }) => (
// 				<Question
// 					question='¿Legalmente separado?'
// 					field={field}
// 					fieldState={fieldState}
// 				/>
// 			)}
// 		/>
// 		{getFormErrorMessage('stepTwoPregunta3b')}

// 		{watch('stepTwoPregunta3b') === 'si' && (
// 			<>
// 				<br />
// 				<span className='p-float-label mt-2 p-fluid w-6'>
// 					<Controller
// 						name='stepTwoPregunta3c'
// 						control={control}
// 						rules={{
// 							required:
// 								'La fecha de nacimiento es requerida.',
// 						}}
// 						render={({ field, fieldState }) => (
// 							<Calendar
// 								id={field.pregunta1Sub}
// 								value={field.value}
// 								onChange={(e) =>
// 									field.onChange(e.value)
// 								}
// 								dateFormat='dd/mm/yy'
// 								mask='99/99/9999'
// 								showIcon
// 								className={classNames({
// 									'p-invalid':
// 										fieldState.invalid,
// 								})}
// 							/>
// 						)}
// 					/>
// 					<label
// 						htmlFor='stepTwoPregunta3c'
// 						className={classNames({
// 							'p-error':
// 								errors.stepTwoPregunta3a,
// 						})}
// 					>
// 						Fecha del acuerdo de manutención por
// 						separado
// 					</label>
// 				</span>
// 				{getFormErrorMessage('stepTwoPregunta3c')}
// 			</>
// 		)}
// 	</>
// )}
// </div>
// {getFormErrorMessage('stepTwoPregunta3')}

// <div
// className={` bg-neutral-100/60 p-4 rounded-2xl mt-3`}
// style={{
// 	border: `${
// 		errors.stepTwoPregunta4?.message
// 			? '1px solid red'
// 			: ''
// 	}`,
// }}
// >
// <Controller
// 	name='stepTwoPregunta4'
// 	control={control}
// 	rules={{
// 		required: 'Esta pregunta es obligatoria.',
// 	}}
// 	render={({ field, fieldState }) => (
// 		<Question
// 			question='¿Es cónyuge sobreviviente que reúne los requisitos?'
// 			field={field}
// 			fieldState={fieldState}
// 		/>
// 	)}
// />

// {/* Subpregunta: Fecha de renovación */}

// {watch('stepTwoPregunta4') === 'si' && (
// 	<>
// 		<Divider />

// 		<span className='p-float-label mt-5 p-fluid w-6'>
// 			<Controller
// 				name='stepTwoPregunta4a'
// 				control={control}
// 				rules={{
// 					required:
// 						'El año de fallecimiento es requerida.',
// 				}}
// 				render={({ field, fieldState }) => (
// 					<Calendar
// 						id={field.pregunta1Sub}
// 						value={field.value}
// 						onChange={(e) =>
// 							field.onChange(e.value)
// 						}
// 						dateFormat='yy'
// 						mask='99/99/9999'
// 						showIcon
// 						view='year'
// 						className={classNames({
// 							'p-invalid': fieldState.invalid,
// 						})}
// 					/>
// 				)}
// 			/>
// 			<label
// 				htmlFor='stepTwoPregunta4a'
// 				className={classNames({
// 					'p-error': errors.stepTwoPregunta4a,
// 				})}
// 			>
// 				Año de fallecimiento del cónyuge
// 			</label>
// 		</span>
// 		{getFormErrorMessage('stepTwoPregunta4a')}
// 	</>
// )}
// </div>
// {getFormErrorMessage('stepTwoPregunta4')}

// <div
// className={` bg-neutral-100/60 p-4 rounded-2xl mt-5`}
// style={{
// 	border: `${
// 		errors.stepTwoPregunta5?.message
// 			? '1px solid red'
// 			: ''
// 	}`,
// }}
// >
// <Controller
// 	name='stepTwoPregunta5'
// 	control={control}
// 	rules={{
// 		required: 'Esta pregunta es obligatoria.',
// 	}}
// 	render={({ field, fieldState }) => (
// 		<Question
// 			question='¿Es cabeza de hogar?'
// 			field={field}
// 			fieldState={fieldState}
// 		/>
// 	)}
// />
// </div>
// {getFormErrorMessage('stepTwoPregunta5')}
