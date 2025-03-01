import { Button } from 'primereact/button'
import { Stepper } from 'primereact/stepper'
import { StepperPanel } from 'primereact/stepperpanel'
import { useRef, useState } from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepFour from './StepFour'
import StepThree from './StepThree'
import StepFive from './StepFive'
import StepSix from './StepSix'
import StepSeven from './StepSeven'

import { ScrollTop } from 'primereact/scrolltop'

const MainForm = () => {
	const stepperRef = useRef(null)

	const stepOneData = {
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
	const stepTwoData = {
		estadoCivil: '',
	}
	const stepThreeData = {
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
	}
	const stepFourData = {
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
	const stepFiveData = {
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
	const stepSixData = {
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
	const [formData, setFormData] = useState([
		stepOneData,
		stepTwoData,
		stepThreeData,
		stepFourData,
		stepFiveData,
		stepSixData,
	])
	console.log(formData)

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
		})
	}

	const ptOptions = {
		root: { className: 'background: red' }, // Clase personalizada para el contenedor
		indicator: { style: { backgroundColor: 'red' } }, // Estilo para los indicadores
		separator: { style: { borderColor: 'red' } }, // Estilo para los separadores
	}

	return (
		<div className='border border-neutral-200 bg-white rounded-3xl p-10 max-w-4xl mx-auto my-20 shadow-2xl'>
			<Stepper
				// headerPosition='top'
				ref={stepperRef}
				style={{ flexBasis: '50rem' }}
				onChangeStep={scrollToTop}
				ptOptions={ptOptions}
			>
				<StepperPanel header=''>
					<StepOne
						stepperReference={stepperRef}
						formData={formData[0]}
						setFormData={setFormData}
					/>
				</StepperPanel>
				<StepperPanel header=''>
					<StepTwo
						stepperReference={stepperRef}
						formData={formData[1]}
						setFormData={setFormData}
					/>
				</StepperPanel>
				<StepperPanel header=''>
					<StepThree
						stepperReference={stepperRef}
						formData={formData[2]}
						setFormData={setFormData}
					/>
				</StepperPanel>
				<StepperPanel header=''>
					<StepFour
						stepperReference={stepperRef}
						formData={formData[3]}
						setFormData={setFormData}
					/>
				</StepperPanel>
				<StepperPanel header=''>
					<StepFive
						stepperReference={stepperRef}
						formData={formData[4]}
						setFormData={setFormData}
					/>
				</StepperPanel>
				<StepperPanel header=''>
					<StepSix
						stepperReference={stepperRef}
						formData={formData[5]}
						setFormData={setFormData}
					/>
				</StepperPanel>

				<StepperPanel header=''>
					<StepSeven
						stepperReference={stepperRef}
						formData={formData[6]}
						setFormData={setFormData}
					/>
				</StepperPanel>
			</Stepper>
			{/* <Button onClick={() => console.log(formData)} /> */}
			<ScrollTop />
		</div>
	)
}

export default MainForm
