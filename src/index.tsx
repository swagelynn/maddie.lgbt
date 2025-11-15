import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import {
	ButtonBack,
	ButtonNext,
	CarouselProvider,
	Slide,
	Slider,
} from 'pure-react-carousel';

function PageSection({
	children,
	className,
	title,
	innerClassName,
}: {
	children: any;
	className?: string;
	title: string;
	innerClassName?: string;
}) {
	return (
		<div className={`flex flex-col h-full ${className}`}>
			<div
				className={`border-accent border-2 h-10 pl-2 flex items-center font-semibold`}
			>
				<h1>{title}</h1>
			</div>
			<div
				className={`border-accent border-2 p-2 h-full border-dotted border-t-0 flex flex-col gap-2 ${innerClassName}`}
			>
				{children}
			</div>
		</div>
	);
}

function CoolPeople() {
	const people: {
		name: string;
		url: string;
		asset: string;
	}[] = [
		{
			name: 'kart',
			url: 'https://kartcs.com',
			asset: 'https://kartcs.com/assets/images/kartBrand.png',
		},
		{
			name: 'biotest',
			url: 'https://biotest.dev',
			asset: 'https://cdn.pixelatedaria.space/pfps/biotest05.png',
		},
		{
			name: 'sadan',
			url: 'https://sadan.zip',
			// ??????????????
			asset: 'https://sadan.zip/assets/B0jNEeZx.webp',
		},
		{
			name: "thing",
			url: "https://nextsecret.xyz/",
			// whatever atp
			asset: "/thing.png"
		}
	];

	const [index, setIndex] = useState<number>(0);

	const [currentPerson, setCurrentPerson] = useState<any>(people[0]);

	useEffect(() => {
		setCurrentPerson(
			people[((index % people.length) + people.length) % people.length]
		);
	}, [index]);

	return (
		<PageSection
			className={'col-span-1 row-span-1'}
			title="cool people"
			innerClassName="justify-center items-center relative"
		>
			<div
				className="flex flex-col gap-2 items-center justify-center cursor-pointer"
				onClick={() => window.open(currentPerson.url, '_blank')}
			>
				<img src={currentPerson.asset} className="h-28 rounded-md" />
				<h1>{currentPerson.name}</h1>
			</div>
			<Icon
				icon={'iconoir:arrow-left'}
				height={'2rem'}
				className="absolute left-4 cursor-pointer"
				onClick={() => setIndex(index - 1)}
			/>
			<Icon
				icon={'iconoir:arrow-right'}
				height={'2rem'}
				className="absolute right-4 cursor-pointer"
				onClick={() => setIndex(index + 1)}
			/>
			<div className="h-2 flex flex-row gap-2 absolute bottom-1">
				{people.map((_, i) => (
					<div
						className={`bg-accent h-1 w-4 ${
							i ===
							((index % people.length) + people.length) %
								people.length
								? ''
								: 'opacity-20'
						}`}
					>
						<h1 />
					</div>
				))}
			</div>
		</PageSection>
	);
}

function App() {
	return (
		<div className="text-accent bg-black grid grid-cols-3 grid-rows-[1fr_1fr_1fr] h-screen w-screen select-none gap-2 p-2">
			<PageSection
				className={'col-span-1 row-span-3'}
				title="about me"
				innerClassName="items-center justify-center text-xl font-thin gap-12"
			>
				<img src="/pfp.png" className="w-1/2 rounded-md" />
				<h1>maddie</h1>
				<h1>she/her</h1>
				<h1>programmer</h1>
			</PageSection>
			<PageSection className={'col-span-2 row-span-2'} title="blog" innerClassName='items-center justify-center'>
				<h1 className='text-2xl font-semibold'>[work in progress]</h1>
			</PageSection>
			<PageSection
				className={'col-span-1 row-span-1'}
				title="links"
				innerClassName="justify-center items-center gap-10 font-light text-xl"
			>
				{Object.entries({
					github: 'https://github.com/swagelynn',
					discord: '',
				}).map(([title, url]) => (
					<h1
						className="cursor-pointer"
						onClick={() => window.open(url, '_blank')}
					>
						{title}
					</h1>
				))}
			</PageSection>
			<CoolPeople />
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
