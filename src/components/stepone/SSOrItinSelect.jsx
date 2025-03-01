import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { SelectButton } from 'primereact/selectbutton'
import { classNames } from 'primereact/utils'
import React, { useRef } from 'react'
import { Controller } from 'react-hook-form'

import { StyleClass } from 'primereact/styleclass'

const SSOrItinSelect = ({
	control,
	switchID,
	fieldID,
	renewDate,
	errors,
	watch,
}) => {
	const getFormErrorMessage = (name) => {
		return (
			errors[name] && (
				<small className='p-error'>{errors[name].message}</small>
			)
		)
	}
	return (
		<div className='bg-neutral-100/60 border border-neutral-300 p-4 rounded-2xl my-3'>
			{/* Switch */}
			<div className='mb-5 w-3'>
				<span className='p-float-label p-fluid'>
					<Controller
						name={switchID}
						control={control}
						rules={{
							required: 'El número es requerido.',
							// pattern: {
							// 	value: /^9(0[0-9]|[5-6][0-5]|[7-8][0-8]|9[0-9])\d{6}$/,
							// 	message:
							// 		'Número de ITIN inválido. Ejemplo: 9XX-XX-XXXX',
							// },
						}}
						render={({ field, fieldState }) => (
							<SelectButton
								value={field.value}
								onChange={
									(e) => field.onChange(e.value)
									// console.log(e.value.code)
								}
								options={['S.S.', 'ITIN']}
							/>
						)}
					/>
					<label
						htmlFor={switchID}
						className={classNames({
							// 'p-error': errors.ssitinSwitch,
						})}
					></label>
				</span>
			</div>

			<div className='flex gap-5'>
				{/* Number */}
				<div className='w-1/2'>
					<span className='p-float-label p-fluid'>
						<Controller
							name={fieldID}
							control={control}
							rules={{
								required: 'El número es requerido.',
								// pattern: {
								// 	value: /^9(0[0-9]|[5-6][0-5]|[7-8][0-8]|9[0-9])\d{6}$/,
								// 	message:
								// 		'Número de ITIN inválido. Ejemplo: 9XX-XX-XXXX',
								// },
							}}
							render={({ field, fieldState }) => (
								<InputText
									maxLength={9}
									id={field.fieldID}
									{...field}
									className={classNames({
										'p-invalid': fieldState.invalid,
									})}
								/>
							)}
						/>
						<label
							htmlFor={fieldID}
							className={classNames({
								'p-error': errors.fieldID,
							})}
						>
							Número de
							{watch(switchID) === 'ITIN' ? ' ITIN' : ' S.S.'}
						</label>
					</span>
					{getFormErrorMessage(fieldID)}
				</div>

				{/* Fecha de renovacion */}
				{watch(switchID) === 'ITIN' && (
					<div className='flex-1'>
						<span className='p-float-label p-fluid '>
							<Controller
								name={renewDate}
								control={control}
								rules={{
									required:
										'La fecha de renovación es requerida.',
								}}
								render={({ field, fieldState }) => (
									<Calendar
										id={field.ssitinConRenewDate}
										value={field.value}
										onChange={(e) =>
											field.onChange(e.value)
										}
										dateFormat='mm/dd/yy'
										mask='99/99/9999'
										showIcon
										className={classNames({
											'p-invalid': fieldState.invalid,
										})}
									/>
								)}
							/>
							<label
								htmlFor={renewDate}
								className={classNames({
									'p-error': errors.renewDate,
								})}
							>
								Última fecha de renovación
							</label>
						</span>
						{getFormErrorMessage(renewDate)}
					</div>
				)}
			</div>
		</div>
	)
}

export default SSOrItinSelect
