const StepHeader = ({ heading, subheading }) => {
	return (
		<div className='border-b mb-10'>
			<div className='text-sm opacity-60'>{subheading}</div>
			<h5 className='text-xl'>{heading}</h5>
		</div>
	)
}

export default StepHeader
