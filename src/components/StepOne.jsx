import { Button } from 'primereact/button'
import StepHeader from './StepHeader'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Controller, useForm } from 'react-hook-form'

import { SelectButton } from 'primereact/selectbutton'

import { InputNumber } from 'primereact/inputnumber'

import { Dropdown } from 'primereact/dropdown'

import { Calendar } from 'primereact/calendar'

import { Divider } from 'primereact/divider'

import { useEffect } from 'react'
import { FloatLabel } from 'primereact/floatlabel'
import estados from '../constants/estados'
import SSOrItinSelect from './stepone/SSOrItinSelect'

const StepOne = ({ stepperReference, formData, setFormData }) => {
	const defaultValues = formData || {
		nameCon: '',
		borndateCon: '',

		ssitinConSwitch: 'S.S.',
		ssitinConNumber: '',
		ssitinConRenewDate: '',

		emailCon: '',
		phoneCon: '',
		ocupationCon: '',
		addressCon: '',
		cityCon: '',
		stateCon: '',
		zipCon: '',

		nameYuge: '',
		borndateYuge: '',
		ssitinYugeSwitch: 'S.S.',

		ssitinYugeNumber: '',
		ssitinYugeRenewDate: '',

		emailYuge: '',
		phoneYuge: '',
		ocupationYuge: '',
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
			{ ...prev[0], ...data },
			prev[1],
			prev[2],
			prev[3],
			prev[4],
		])
		// console.log('Step one', data)
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
			<StepHeader heading='Información Personal' subheading='Paso 1' />
			<div>
				<form onSubmit={handleSubmit(onSubmit)} className=''>
					{/* Contribuyente start */}
					<div className='text-xl mb-4 '>Contribuyente</div>
					<div>
						<div className='flex gap-5 p-fluid'>
							{/* Nombre */}
							<div className='field my-3 flex-1'>
								<span className='p-float-label'>
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
												className={classNames({
													'p-invalid':
														fieldState.invalid,
												})}
											/>
										)}
									/>
									<label
										htmlFor='nameCon'
										className={classNames({
											'p-error': errors.nameCon,
										})}
									>
										Nombre
									</label>
								</span>
								{getFormErrorMessage('nameCon')}
							</div>

							{/* Fecha de nacimiento */}
							<div className='field my-3 flex-1'>
								<span className='p-float-label'>
									<Controller
										name='borndateCon'
										control={control}
										rules={{
											required:
												'La fecha de nacimiento es requerida.',
										}}
										render={({ field, fieldState }) => (
											<Calendar
												id={field.borndateCon}
												value={field.value}
												onChange={(e) =>
													field.onChange(e.value)
												}
												dateFormat='mm/dd/yy'
												mask='99/99/9999'
												showIcon
												className={classNames({
													'p-invalid':
														fieldState.invalid,
												})}
											/>
										)}
									/>
									<label
										htmlFor='borndateCon'
										className={classNames({
											'p-error': errors.borndateCon,
										})}
									>
										Fecha de nacimiento
									</label>
								</span>
								{getFormErrorMessage('borndateCon')}
							</div>
						</div>
						<div className='flex gap-5 p-fluid'>
							{/* Correo */}
							<div className='field  my-3 flex-[1.2]'>
								<span className='p-float-label p-input-icon-right '>
									<i className='pi pi-envelope right-5' />
									<Controller
										name='emailCon'
										control={control}
										rules={{
											required: 'El correo es requerido.',
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
												message:
													'Correo inválido. Ejemplo: ejemplo@email.com',
											},
										}}
										render={({ field, fieldState }) => (
											<InputText
												id={field.emailCon}
												{...field}
												className={classNames({
													'p-invalid':
														fieldState.invalid,
												})}
											/>
										)}
									/>
									<label
										htmlFor='emailCon'
										className={classNames({
											'p-error': errors.emailCon,
										})}
									>
										Correo electrónico
									</label>
								</span>
								{getFormErrorMessage('emailCon')}
							</div>
							{/* Telefono */}
							<div className='field my-3 flex-[0.8]'>
								<span className='p-float-label'>
									<Controller
										name='phoneCon'
										control={control}
										rules={{
											required:
												'El número de teléfono es requerido.',
											pattern: {
												value: /^(?:\+1\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/,
												message:
													'Número de teléfono inválido. Ejemplo: (123) 456-7890',
											},
										}}
										render={({ field, fieldState }) => (
											<InputText
												maxLength={10}
												id={field.phoneCon}
												{...field}
												className={classNames({
													'p-invalid':
														fieldState.invalid,
												})}
											/>
										)}
									/>
									<label
										htmlFor='phoneCon'
										className={classNames({
											'p-error': errors.phoneCon,
										})}
									>
										Teléfono
									</label>
								</span>
								{getFormErrorMessage('phoneCon')}
							</div>
							{/* Ocupacion */}
							<div className='field my-3 flex-1'>
								<span className='p-float-label'>
									<Controller
										name='ocupationCon'
										control={control}
										rules={{
											required:
												'La ocupación es requerida.',
										}}
										render={({ field, fieldState }) => (
											<InputText
												id={field.ocupationCon}
												{...field}
												className={classNames({
													'p-invalid':
														fieldState.invalid,
												})}
											/>
										)}
									/>
									<label
										htmlFor='ocupationCon'
										className={classNames({
											'p-error': errors.ocupationCon,
										})}
									>
										Ocupación
									</label>
								</span>
								{getFormErrorMessage('ocupationCon')}
							</div>
						</div>

						{/* ITIN */}

						<SSOrItinSelect
							control={control}
							errors={errors}
							fieldID='ssitinConNumber'
							switchID='ssitinConSwitch'
							renewDate='ssitinConRenewDate'
							watch={watch}
						/>

						{/* Address */}
						<div className='bg-neutral-100/60 border border-neutral-300 p-4 py-5 mt-5 rounded-2xl '>
							<span className='p-float-label p-fluid'>
								<Controller
									name='addressCon'
									control={control}
									rules={{
										required: 'La dirección es requerida.',
									}}
									render={({ field, fieldState }) => (
										<InputText
											id={field.addressCon}
											{...field}
											className={classNames({
												'p-invalid': fieldState.invalid,
											})}
										/>
									)}
								/>
								<label
									htmlFor='addressCon'
									className={classNames({
										'p-error': errors.addressCon,
									})}
								>
									Dirección
								</label>
							</span>
							{getFormErrorMessage('addressCon')}

							<div className='flex gap-5 mt-10'>
								{/* Ciudad */}
								<div>
									<span className='p-float-label p-fluid'>
										<Controller
											name='cityCon'
											control={control}
											rules={{
												required:
													'La ciudad es requerida.',
											}}
											render={({ field, fieldState }) => (
												<InputText
													id={field.cityCon}
													{...field}
													className={classNames({
														'p-invalid':
															fieldState.invalid,
													})}
												/>
											)}
										/>
										<label
											htmlFor='cityCon'
											className={classNames({
												'p-error': errors.cityCon,
											})}
										>
											Ciudad
										</label>
									</span>
									{getFormErrorMessage('cityCon')}
								</div>

								{/* Estado */}
								<div>
									<span className='p-float-label p-fluid'>
										<Controller
											name='stateCon'
											control={control}
											rules={{
												required:
													'El estado es requerido.',
											}}
											render={({ field, fieldState }) => (
												<FloatLabel>
													<Dropdown
														value={field.value}
														onChange={(e) =>
															field.onChange(
																e.value
															)
														}
														options={estados}
														optionLabel='name'
														placeholder='Estado'
														className='w-full md:w-14rem'
													/>
													<label
														htmlFor='stateCon'
														className={classNames({
															'p-error':
																errors.stateCon,
														})}
													>
														Estado
													</label>
												</FloatLabel>
											)}
										/>
									</span>
									{getFormErrorMessage('stateCon')}
								</div>
								{/* Zip Code */}

								<div>
									<span className='p-float-label p-fluid'>
										<Controller
											name='zipCon'
											control={control}
											rules={{
												required:
													'El zip code es requerido.',
											}}
											render={({ field, fieldState }) => (
												<InputText
													id={field.zipCon}
													{...field}
													className={classNames({
														'p-invalid':
															fieldState.invalid,
													})}
													maxLength={5}
												/>
											)}
										/>
										<label
											htmlFor='zipCon'
											className={classNames({
												'p-error': errors.zipCon,
											})}
										>
											Zip Code
										</label>
									</span>
									{getFormErrorMessage('zipCon')}
								</div>
							</div>
						</div>
					</div>

					{/* Contribuyente end */}

					{/* Conyuge start */}
					<div className='text-xl mb-4 mt-20'>Conyuge</div>
					<div>
						<div className='flex gap-5 p-fluid'>
							{/* Nombre */}
							<div className='field my-3 flex-1'>
								<span className='p-float-label'>
									<Controller
										name='nameYuge'
										control={control}
										rules={{
											required: 'El nombre es requerido.',
										}}
										render={({ field, fieldState }) => (
											<InputText
												id={field.nameYuge}
												{...field}
												className={classNames({
													'p-invalid':
														fieldState.invalid,
												})}
											/>
										)}
									/>
									<label
										htmlFor='nameYuge'
										className={classNames({
											'p-error': errors.nameYuge,
										})}
									>
										Nombre
									</label>
								</span>
								{getFormErrorMessage('nameYuge')}
							</div>

							{/* Fecha de nacimiento */}
							<div className='field my-3 flex-1'>
								<span className='p-float-label'>
									<Controller
										name='borndateYuge'
										control={control}
										rules={{
											required:
												'La fecha de nacimiento es requerida.',
										}}
										render={({ field, fieldState }) => (
											<Calendar
												id={field.borndateYuge}
												value={field.value}
												onChange={(e) =>
													field.onChange(e.value)
												}
												dateFormat='mm/dd/yy'
												mask='99/99/9999'
												showIcon
												className={classNames({
													'p-invalid':
														fieldState.invalid,
												})}
											/>
										)}
									/>
									<label
										htmlFor='borndateYuge'
										className={classNames({
											'p-error': errors.borndateYuge,
										})}
									>
										Fecha de nacimiento
									</label>
								</span>
								{getFormErrorMessage('borndateYuge')}
							</div>
						</div>
						<div className='flex gap-5 p-fluid'>
							{/* Correo */}
							<div className='field  my-3 flex-[1.2]'>
								<span className='p-float-label p-input-icon-right '>
									<i className='pi pi-envelope right-5' />
									<Controller
										name='emailYuge'
										control={control}
										rules={{
											required: 'El correo es requerido.',
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
												message:
													'Correo inválido. Ejemplo: ejemplo@email.com',
											},
										}}
										render={({ field, fieldState }) => (
											<InputText
												id={field.emailYuge}
												{...field}
												className={classNames({
													'p-invalid':
														fieldState.invalid,
												})}
											/>
										)}
									/>
									<label
										htmlFor='emailYuge'
										className={classNames({
											'p-error': errors.emailYuge,
										})}
									>
										Correo electrónico
									</label>
								</span>
								{getFormErrorMessage('emailYuge')}
							</div>
							{/* Telefono */}
							<div className='field my-3 flex-[0.8]'>
								<span className='p-float-label'>
									<Controller
										name='phoneYuge'
										control={control}
										rules={{
											required:
												'El número de teléfono es requerido.',
											pattern: {
												value: /^(?:\+1\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/,
												message:
													'Número de teléfono inválido. Ejemplo: (123) 456-7890',
											},
										}}
										render={({ field, fieldState }) => (
											<InputText
												maxLength={10}
												id={field.phoneYuge}
												{...field}
												className={classNames({
													'p-invalid':
														fieldState.invalid,
												})}
											/>
										)}
									/>
									<label
										htmlFor='phoneYuge'
										className={classNames({
											'p-error': errors.phoneYuge,
										})}
									>
										Teléfono
									</label>
								</span>
								{getFormErrorMessage('phoneYuge')}
							</div>
							{/* Ocupacion */}
							<div className='field my-3 flex-1'>
								<span className='p-float-label'>
									<Controller
										name='ocupationYuge'
										control={control}
										rules={{
											required:
												'La ocupación es requerida.',
										}}
										render={({ field, fieldState }) => (
											<InputText
												id={field.ocupationYuge}
												{...field}
												className={classNames({
													'p-invalid':
														fieldState.invalid,
												})}
											/>
										)}
									/>
									<label
										htmlFor='ocupationYuge'
										className={classNames({
											'p-error': errors.ocupationYuge,
										})}
									>
										Ocupación
									</label>
								</span>
								{getFormErrorMessage('ocupationYuge')}
							</div>
						</div>

						{/* ITIN */}
						<SSOrItinSelect
							control={control}
							errors={errors}
							fieldID='ssitinYugeNumber'
							switchID='ssitinYugeSwitch'
							renewDate='ssitinYugeRenewDate'
							watch={watch}
						/>
					</div>

					{/* Conyuge end */}

					<Divider />

					<div className='flex justify-content-end'>
						<Button
							type='submit'
							label='Next'
							icon='pi pi-arrow-right'
							iconPos='right'
							// onClick={handleNext}
						/>
					</div>
				</form>
			</div>
		</>
	)
}

export default StepOne
