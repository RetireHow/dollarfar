import { Controller, useFormContext } from 'react-hook-form';
import Error from '../UI/Error';
import Select from 'react-select';
import RedStar from '../UI/RedStar';
import { StylesConfig } from 'react-select';

type TOptions = {
	label: string;
	value: string;
};

type TProvestorSelectProps = {
	name: string;
	label?: string;
	options: TOptions[];
	placeholder?: string;
	required?: boolean;
	formName?: string;
	isMulti?:boolean;
};

const customStyles: StylesConfig<TOptions, boolean> = {
	container: provided => ({
		...provided,
		width: '100%',
		borderRadius: 0,
		padding: '1px',
	}),
	control: provided => ({
		...provided,
		border: '0px solid #D9D9D9',
		boxShadow: 'none',
		'&:hover': {
			border: '0px solid #D9D9D9',
		},
		padding: '0px 0',
		borderRadius: '0',
		cursor: 'pointer',
	}),
	menu: provided => ({
		...provided,
		width: '100%',
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected ? '#24B24B' : provided.backgroundColor,
		color: state.isSelected ? '#fff' : provided.color,
		'&:hover': {
			backgroundColor: state.isSelected ? '#24B24B' : provided.backgroundColor,
		},
		cursor: 'pointer',
	}),
	singleValue: provided => ({
		...provided,
		color: '#333',
	}),
	dropdownIndicator: provided => ({
		...provided,
		color: '#000', // Change this to the color you want for the arrow
		'&:hover': {
			color: '#000', // Optional: change color on hover if desired
		},
	}),

	placeholder: provided => ({
		...provided,
		color: '#858585', // Set the placeholder color
		fontWeight: 'normal',
	}),
};

export default function DFSelect({
	name,
	label,
	options,
	required,
	placeholder,
	isMulti=false
}: TProvestorSelectProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<div>
			<label className="block mb-[0.5rem]" htmlFor={name}>
				{label}
				{required && <RedStar />}
			</label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						onChange={field.onChange}
						options={options}
						placeholder={placeholder}
						styles={customStyles}
						isMulti={isMulti}
						className={`rounded-md border-[1px] duration-300 ${
							errors[name]?.message ? 'border-red-500' : 'border-[#D9D9D9]'
						}`}
					></Select>
				)}
			/>
			{errors[name]?.message && (
				<Error message={errors[name]?.message as string} />
			)}
		</div>
	);
}
