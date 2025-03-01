import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Controller } from 'react-hook-form'
import relacion from '../constants/relacion'

const Dependiente = ({ countNumber, errors, control, getFormErrorMessage }) => {
	return (
		<div className='bg-neutral-100 rounded-2xl p-5 mt-10 border border-neutral-200'>
			<div>Familiar {countNumber}</div>
			<div className='mt-5'>
				{/* Nombre */}
				<div className='field my-3 '>
					<span className='p-float-label p-fluid'>
						<Controller
							name='nameDep1'
							control={control}
							rules={{
								required: 'El nombre es requerido.',
							}}
							render={({ field, fieldState }) => (
								<InputText
									id={field.nameDep1}
									{...field}
									autoFocus
									className={classNames({
										'p-invalid': fieldState.invalid,
									})}
								/>
							)}
						/>
						<label
							htmlFor='nameDep1'
							className={classNames({
								'p-error': errors.nameDep1,
							})}
						>
							Nombre
						</label>
					</span>
					{getFormErrorMessage('nameDep1')}
				</div>

				<div className='flex  gap-5'>
					{/* Fecha de nacimiento */}
					<div className='field my-3 flex-1 p-fluid'>
						<span className='p-float-label'>
							<Controller
								name='bornDateDep1'
								control={control}
								rules={{
									required:
										'La fecha de nacimiento es requerida.',
								}}
								render={({ field, fieldState }) => (
									<Calendar
										id={field.bornDateDep1}
										value={field.value}
										onChange={(e) =>
											field.onChange(e.value)
										}
										dateFormat='dd/mm/yy'
										mask='99/99/9999'
										showIcon
										className={classNames({
											'p-invalid': fieldState.invalid,
										})}
									/>
								)}
							/>
							<label
								htmlFor='bornDateDep1'
								className={classNames({
									'p-error': errors.bornDateDep1,
								})}
							>
								Fecha de nacimiento
							</label>
						</span>
						{getFormErrorMessage('bornDateDep1')}
					</div>

					{/* ITIN */}
					<div className='field my-3 flex-1 p-fluid'>
						<span className='p-float-label'>
							<Controller
								name='itinDep1'
								control={control}
								rules={{
									required: 'El número de ITIN es requerido.',
									pattern: {
										value: /^9(0[0-9]|[5-6][0-5]|[7-8][0-8]|9[0-9])\d{6}$/,
										message:
											'Número de ITIN inválido. Ejemplo: 9XX-XX-XXXX',
									},
								}}
								render={({ field, fieldState }) => (
									<InputText
										maxLength={9}
										id={field.itinDep1}
										{...field}
										className={classNames({
											'p-invalid': fieldState.invalid,
										})}
									/>
								)}
							/>
							<label
								htmlFor='itinDep1'
								className={classNames({
									'p-error': errors.itinDep1,
								})}
							>
								ITIN
							</label>
						</span>
						{getFormErrorMessage('itinDep1')}
					</div>
				</div>

				<div className='flex  gap-5 '>
					{/* Relacion */}
					<div className='field my-3 flex-[0.7]'>
						<span className='p-float-label p-fluid '>
							<Controller
								name='relacionDep1'
								control={control}
								rules={{
									required:
										'El tipo de relación es requerido.',
								}}
								render={({ field, fieldState }) => (
									<FloatLabel>
										<Dropdown
											inputId='dd-city'
											value={field.value} // Usa field.value para enlazar el valor
											onChange={(e) =>
												field.onChange(e.value)
											} // Usa field.onChange para actualizar el valor en el formulario
											options={relacion}
											optionLabel='name'
											className=''
										/>
									</FloatLabel>
								)}
							/>
							<label
								htmlFor='relacionDep1'
								className={classNames({
									'p-error': errors.relacionDep1,
								})}
							>
								Relación
							</label>
						</span>
						{getFormErrorMessage('relacionDep1')}
					</div>

					<div className='flex gap-5 flex-[1.3]'>
						{/* Years */}
						<div className='field my-3 flex-1'>
							<span className='p-float-label p-fluid '>
								<Controller
									name='yearsDep1'
									control={control}
									rules={{
										required: 'El nombre es requerido.',
									}}
									render={({ field, fieldState }) => (
										<InputNumber
											id={field.yearsDep1}
											{...field}
											onValueChange={(e) =>
												field.onChange(e.value)
											}
											suffix=' años'
											showButtons
											mode='decimal'
											min={0}
											max={100}
										/>
									)}
								/>
								<label
									htmlFor='yearsDep1'
									className={classNames({
										'p-error': errors.yearsDep1,
									})}
								>
									Años con usted
								</label>
							</span>
							{getFormErrorMessage('yearsDep1')}
						</div>

						{/* Meses */}
						<div className='field my-3 flex-1'>
							<span className='p-float-label p-fluid '>
								<Controller
									name='monthsDep1'
									control={control}
									rules={{
										required: 'El nombre es requerido.',
									}}
									render={({ field, fieldState }) => (
										<InputNumber
											id={field.monthsDep1}
											{...field}
											onValueChange={(e) =>
												field.onChange(e.value)
											}
											suffix=' meses'
											showButtons
											mode='decimal'
											min={0}
											max={100}
										/>
									)}
								/>
								<label
									htmlFor='monthsDep1'
									className={classNames({
										'p-error': errors.monthsDep1,
									})}
								>
									Meses con usted
								</label>
							</span>
							{getFormErrorMessage('monthsDep1')}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dependiente
