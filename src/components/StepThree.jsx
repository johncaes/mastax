import { useEffect } from 'react'
import StepHeader from './StepHeader'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { FloatLabel } from 'primereact/floatlabel'

import { Dropdown } from 'primereact/dropdown'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import relacion from '../constants/relacion'
import Question from './Question'

// import Dependiente from './Dependiente'

const StepThree = ({ stepperReference, formData, setFormData }) => {
	const defaultValues = formData || {
		tuvoDependientes: 'no',
		familiares: [
			{
				nombre: '',
				fechaDeNacimiento: '',
				ssOItinNumber: '',
				relacion: '',
				tiempoVivido: '',
			},
		],
		// nameDep1: '',
		// bornDateDep1: '',
		// itinDep1: '',
		// relacionDep1: '',
		// yearsDep1: 0,
		// monthsDep1: 0,
	}

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		reset,
	} = useForm({ defaultValues })

	// Hook para manejar la lista dinámica de familiares
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'familiares',
	})

	console.log(watch('tuvoDependientes'))

	useEffect(() => {
		if (formData) {
			reset(formData) // 🔥 Resetea el formulario con los nuevos valores
		}
	}, [formData, reset])

	const onSubmit = (data) => {
		setFormData((prev) => [
			prev[0],
			prev[1],
			{ ...prev[2], ...data },
			prev[3],
			prev[4],
		])

		stepperReference.current.nextCallback()

		// setShowMessage(true)
	}

	const getFormErrorMessage = (name) => {
		const error = name.includes('.') // Verifica si es un campo dentro de un array (familiares.0.nombre)
			? errors?.familiares?.[name.split('.')[0]]?.[name.split('.')[1]]
			: errors?.[name]

		return error ? <small className='p-error'>{error.message}</small> : null
	}
	return (
		<div>
			<StepHeader
				heading='Dependientes (niños y otros)'
				subheading='Paso 3'
			/>

			<form onSubmit={handleSubmit(onSubmit)} className=''>
				<Controller
					name='tuvoDependientes'
					control={control}
					rules={{
						required: 'Esta pregunta es obligatoria.',
					}}
					render={({ field, fieldState }) => (
						<Question
							question='¿Tuvo dependientes el año pasado?'
							field={field}
							fieldState={fieldState}
						/>
					)}
				/>
				{getFormErrorMessage('tuvoDependientes')}

				{watch('tuvoDependientes') === 'si' && (
					<>
						<Divider />
						<div className='opacity-80'>
							<h5>Identifique a continuación:</h5>
							<ul className='list-disc ml-5 mt-3'>
								<li>
									Toda persona que vivió con usted el año
									pasado (aparte de su cónyuge)
								</li>
								<br />
								<li>
									Toda persona a quien usted mantuvo, pero que
									no vivió con usted el año pasado
								</li>
							</ul>
						</div>
						{fields.map((familiar, index) => (
							<div
								key={familiar.id}
								className='bg-neutral-100 rounded-2xl p-5 mt-10 border border-neutral-200'
							>
								<div className='flex justify-between items-center '>
									<div>Familiar {index + 1}</div>
									{/* Botón para eliminar familiar */}
									{fields.length > 1 && (
										<Button
											label='Eliminar'
											className='p-button-danger p-button-text text-xs font-light'
											icon='pi pi-trash'
											onClick={() => remove(index)}
										/>
									)}
								</div>
								<div className='mt-5 flex gap-4'>
									{/* Nombre */}
									<div className='field my-3 flex-1 '>
										<span className='p-float-label p-fluid'>
											<Controller
												name={`familiares.${index}.nombre`}
												control={control}
												rules={{
													required:
														'El nombre es requerido.',
												}}
												render={({
													field,
													fieldState,
												}) => (
													<InputText
														id={`nombre${index}`}
														{...field}
														autoFocus
														className={classNames({
															'p-invalid':
																fieldState.invalid,
														})}
													/>
												)}
											/>
											<label
												htmlFor={`familiares.${index}.nombre`}
												className={classNames({
													'p-error':
														errors.familiares?.[
															index
														]?.nombre,
												})}
											>
												Nombre
											</label>
										</span>
										{getFormErrorMessage(`${index}.nombre`)}
									</div>

									{/* Fecha de nacimiento */}
									<div className='flex  gap-5 flex-1'>
										<div className='field my-3 flex-1 p-fluid'>
											<span className='p-float-label'>
												<Controller
													name={`familiares.${index}.fechaDeNacimiento`}
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
															id={`familiares.${index}.fechaDeNacimiento`}
															value={field.value}
															onChange={(e) =>
																field.onChange(
																	e.value
																)
															}
															dateFormat='dd/mm/yy'
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
													htmlFor={`familiares.${index}.fechaDeNacimiento`}
													className={classNames({
														'p-error':
															errors.familiares?.[
																index
															]
																?.fechaDeNacimiento,
													})}
												>
													Fecha de nacimiento
												</label>
											</span>
											{getFormErrorMessage(
												`${index}.fechaDeNacimiento`
											)}
										</div>
									</div>
								</div>

								<div className='flex gap-4'>
									{/* SS 0 ITIN */}
									<div className='field my-3 flex-1 p-fluid'>
										<span className='p-float-label'>
											<Controller
												name={`familiares.${index}.ssOItinNumber`}
												control={control}
												rules={{
													required:
														'El número es requerido.',
													// pattern: {
													// 	value: /^9(0[0-9]|[5-6][0-5]|[7-8][0-8]|9[0-9])\d{6}$/,
													// 	message:
													// 		'Número de ITIN inválido. Ejemplo: 9XX-XX-XXXX',
													// },
												}}
												render={({
													field,
													fieldState,
												}) => (
													<InputText
														maxLength={9}
														id={`familiares.${index}.ssOItinNumber`}
														{...field}
														className={classNames({
															'p-invalid':
																fieldState.invalid,
														})}
													/>
												)}
											/>
											<label
												htmlFor={`familiares.${index}.ssOItinNumber`}
												className={classNames({
													'p-error':
														errors.familiares?.[
															index
														]?.ssOItinNumber,
												})}
											>
												S.S. / ITIN
											</label>
										</span>
										{/* {errors.familiares?.[index]?.nombre && (
				<small className='p-error'>
					{
						errors.familiares[index].nombre
							.message
					}
				</small>
			)} */}
										{getFormErrorMessage(
											`${index}.ssOItinNumber`
										)}
									</div>

									{/* Relacion */}
									<div className='field my-3 flex-[0.7]'>
										<span className='p-float-label p-fluid '>
											<Controller
												name={`familiares.${index}.relacion`}
												control={control}
												rules={{
													required:
														'El tipo de relación es requerido.',
												}}
												render={({
													field,
													fieldState,
												}) => (
													<FloatLabel>
														<Dropdown
															inputId={`familiares.${index}.relacion`}
															value={field.value} // Usa field.value para enlazar el valor
															onChange={(e) =>
																field.onChange(
																	e.value
																)
															} // Usa field.onChange para actualizar el valor en el formulario
															options={relacion}
															optionLabel='name'
															className=''
															invalid={
																errors
																	.familiares?.[
																	index
																]?.relacion
															}
														/>
													</FloatLabel>
												)}
											/>
											<label
												htmlFor={`familiares.${index}.relacion`}
												className={classNames({
													'p-error':
														errors.familiares?.[
															index
														]?.relacion,
												})}
											>
												Relación
											</label>
										</span>
										{getFormErrorMessage(
											`${index}.relacion`
										)}
									</div>

									{/* Tiempo vivido */}
									<div className='field my-3 flex-1'>
										<span className='p-float-label p-fluid '>
											<Controller
												name={`familiares.${index}.tiempoVivido`}
												control={control}
												rules={{
													required:
														'El nombre es requerido.',
												}}
												render={({
													field,
													fieldState,
												}) => (
													<FloatLabel>
														<Dropdown
															inputId={`familiares.${index}.tiempoVivido`}
															value={field.value} // Usa field.value para enlazar el valor
															onChange={(e) =>
																field.onChange(
																	e.value
																)
															} // Usa field.onChange para actualizar el valor en el formulario
															options={[
																{
																	name: '1 Mes',
																	code: '1',
																},
																{
																	name: '2 Meses',
																	code: '2',
																},
																{
																	name: '3 Meses',
																	code: '3',
																},
																{
																	name: '4 Meses',
																	code: '4',
																},
																{
																	name: '5 Meses',
																	code: '5',
																},
																{
																	name: '6 Meses',
																	code: '6',
																},
																{
																	name: '7 Meses',
																	code: '7',
																},
																{
																	name: '8 Meses',
																	code: '8',
																},
																{
																	name: '9 Meses',
																	code: '9',
																},
																{
																	name: '10 Meses',
																	code: '10',
																},
																{
																	name: '11 Meses',
																	code: '11',
																},
																{
																	name: 'Todo el año',
																	code: 'todo el año',
																},
															]}
															optionLabel='name'
															className=''
															invalid={
																errors
																	.familiares?.[
																	index
																]?.tiempoVivido
															}
														/>
													</FloatLabel>
												)}
											/>
											<label
												htmlFor={`familiares.${index}.tiempoVivido`}
												className={classNames({
													'p-error':
														errors.monthsDep1,
												})}
											>
												Meses con usted
											</label>
										</span>
										{getFormErrorMessage(
											`${index}.tiempoVivido`
										)}
									</div>
								</div>
							</div>
						))}
						{/* Botón para agregar más familiares */}
						<div className='flex justify-end mt-4'>
							<Button
								label='Agregar Familiar'
								className='p-button-outlined p-mt-3'
								icon='pi pi-plus'
								onClick={() =>
									append({
										nombre: '',
										fechaDeNacimiento: '',
										ssOItinNumber: '',
										relacion: '',
										tiempoVivido: '',
									})
								}
								type='button'
							/>
						</div>
					</>
				)}

				{/* <Dependiente
					control={control}
					countNumber={1}
					errors={errors}
					getFormErrorMessage={getFormErrorMessage}
				/> */}
				<br />
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

export default StepThree
