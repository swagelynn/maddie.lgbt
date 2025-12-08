import React from 'react';

interface InputProps {
	value: string;
	setValue: (v: string) => any;
	isValid?: (v: string) => boolean;
}

export default function Input({ value, setValue, isValid }: InputProps) {
	return (
		<div className="bg-black ml-auto w-3/4 h-fit p-2 flex flex-col border-2 border-dotted border-complement gap-4 items-start justify-center">
			<input
				className="appearance-none border-0 bg-transparent outline-none focus:ring-0 p-0 w-full text-md text-ellipsis overflow-hidden ml-1 font-medium text-complement"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}

export function LabelInput({
	label,
	...inputProps
}: { label: string } & InputProps) {
	return (
		<div className="flex flex-row gap-6 items-center w-full">
			<h1 className="text-lg text-accent">{label}</h1>
			<Input {...inputProps} />
		</div>
	);
}


interface TextAreaProps {
	value: string;
	setValue: (v: string) => any;
	isValid?: (v: string) => boolean;
	rows?: number;
}

export function TextArea({ value, setValue, isValid, rows = 4 }: TextAreaProps) {
	return (
		<div className="bg-black ml-auto w-3/4 h-fit p-2 flex flex-col border-2 border-dotted border-complement gap-4 items-start justify-center">
			<textarea
				className="appearance-none border-0 bg-transparent outline-none focus:ring-0 p-0 w-full text-md resize-none font-medium text-complement"
				value={value}
				rows={rows}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}

export function LabelTextArea({
	label,
	...textAreaProps
}: { label: string } & TextAreaProps) {
	return (
		<div className="flex flex-row gap-6 items-start w-full">
			<h1 className="text-lg text-accent pt-1">{label}</h1>
			<TextArea {...textAreaProps} />
		</div>
	);
}