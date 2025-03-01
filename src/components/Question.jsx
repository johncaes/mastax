import { Button } from 'primereact/button'
import { useState } from 'react'

const Question = ({ question, description, field, fieldState }) => {
	const [isIt, setIsIt] = useState(field.value || '')
	// console.log(field)

	const handleSelection = (respuesta) => {
		setIsIt(respuesta) // Actualiza el estado local
		field.onChange(respuesta) // Mantiene los datos y solo cambia la respuesta
	}

	return (
		<div>
			<div className='flex justify-between items-start'>
				<div className='mr-20'>
					<div className='leading-7'>{question}</div>
					{description && (
						<p className='mt-3 font-light opacity-70'>
							{description}
						</p>
					)}
				</div>
				{/* Si o no Buttons */}
				<div className='flex gap-2 '>
					<Button
						type='button'
						label='Si'
						outlined={isIt !== 'si'}
						className='w-6'
						onClick={() => handleSelection('si')}
					/>
					<Button
						type='button'
						label='No'
						outlined={isIt !== 'no'}
						onClick={() => handleSelection('no')}
						className='w-6'

						// onClick={() => reference.current.nextCallback()}
					/>
				</div>
			</div>
		</div>
	)
}

export default Question
