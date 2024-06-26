import axios from 'axios';
import React, { useState } from 'react';
import { Observer } from '../lib/observer';

interface Attribute {
	name: string;
	typeValue: React.HTMLInputTypeAttribute;
}

export interface CreateComponentProps<T> {
	createWhat: string;
	parser: (data: any) => any;
	defaultData: any;
	observer?: Observer<T>
}

export default function CreateComponent<T>({ parser, createWhat, defaultData, observer }: CreateComponentProps<T>) {
	const [formData, setFormData] = useState(defaultData);

	const handleChange = (name: string, value: any) => {
		try {
			setFormData(parser({
				...formData,
				[name]: value
			}));
		} catch (e: any) {
			console.error("Wrong input", e.message)
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const parsedData = parser(formData);
			axios.post(`${import.meta.env.VITE_API_URL}/${createWhat}`, parsedData)
				.then((response) => {
					console.log(response.data);
					if (observer) {
						const oldData = observer.getValue();
						if (oldData && Object.prototype.toString.call(oldData) === '[object Array]') {
							observer.notify([...oldData as T[], response.data] as T);
						}
					}
					setFormData(defaultData);
				})
				.catch((error) => console.error(error.message));
		} catch (error) {
			console.error(formData, error);
		}
	};

	//get attributes from the object formData
	const keys = Object.keys(formData);
	const attributes: Attribute[] = keys.map((key) => {
		switch (typeof formData[key]) {
			case "object":
				return { name: key, typeValue: "date" };
			case "string":
				return { name: key, typeValue: "text" };
			default:
				return { name: key, typeValue: "number" };
		}
	});

	return (
		<form onSubmit={handleSubmit}>
			{attributes.map((attribute) => (
				<div key={attribute.name}>
					<label htmlFor={attribute.name}>{attribute.name}</label>
					<input
						type={attribute.typeValue}
						id={attribute.name}
						name={attribute.name}
						defaultValue={formData[attribute.name]}
						onChange={(e) => {
							if (attribute.typeValue === "number") {
								handleChange(attribute.name, parseFloat(e.target.value));
							} else {
								handleChange(attribute.name, e.target.value);
							}
						}}
					/>
				</div>
			))}
			<button type="submit">Create</button>
			{import.meta.env.NODE_ENV !== "production" && <pre>{JSON.stringify(formData)}</pre>}
		</form>
	);
};