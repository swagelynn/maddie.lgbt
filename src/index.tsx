import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import BlogLayer from './BlogLayer';
import { blogs } from './Blogs';

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
			className={'col-start-4 row-start-1'}
			title="friends"
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

function Song({
	title,
	release,
	url,
}: {
	title: string;
	release: string;
	url: string;
}) {
	return (
		<div
			className="w-full flex-grow flex flex-col border-2 border-dotted border-complement p-2 gap-4 items-center justify-center cursor-pointer"
			onClick={() => window.open(url, '_blank')}
		>
			<h1 className="text-xl text-ellipsis overflow-hidden text-center font-medium">
				{title}
			</h1>
			<h1 className="text-md text-ellipsis overflow-hidden text-center md:flex lg:flex sm:hidden font-light text-complement">
				{release}
			</h1>
		</div>
	);
}

export interface Blog {
	title: string;
	date: string;
	contents: string[];
}

function App() {
	const links = {
		github: 'https://github.com/swagelynn',
		discord: 'https://discord.com/users/1298435571395330108',
		soundcloud: 'https://soundcloud.com/swagelynn',
	};

	const bioStrings = ['maddie', 'she/her', 'programmer'];

	const [blog, setBlog] = useState<Blog>(null);

	// blog link logic
	useEffect(() => {
		const url = new URL(window.location.toString());
		const blogParam = url.searchParams.get('blog');

		if(blogParam) {
			const decode = decodeURIComponent(blogParam);

			blogs.forEach((b) => {
				if(b.title === decode) {
					setBlog(b);
				}
			})
		}
	}, []);
	useEffect(() => {
		const url = new URL(window.location.toString());

		if (blog) {
			url.searchParams.set('blog', encodeURIComponent(blog.title));
		} else {
			url.searchParams.delete('blog');
		}

		window.history.replaceState({}, '', url);
	}, [blog]);

	return (
		<>
			<BlogLayer blog={blog} setBlog={setBlog} />
			<div className="text-accent bg-black grid grid-cols-4 grid-rows-[2fr_2fr_2fr] h-screen w-screen select-none gap-2 p-2">
				<PageSection
					className={'row-start-1 row-end-3 col-start-1 col-end-2'}
					title="music"
					innerClassName="items-center justify-center col gap-4"
				>
					<Song
						url="https://soundcloud.com/swagelynn/song-for-us-5"
						title="song for us"
						release="through"
					/>
					<Song
						url="https://soundcloud.com/swagelynn/and-youll-drown-in-it-6"
						title={`and you'll drown in it`}
						release="mirror gaze"
					/>
					<Song
						url="https://soundcloud.com/swagelynn/actually-it-was-july-3"
						title={`actually it was july`}
						release={`same time next year?`}
					/>
				</PageSection>
				<PageSection
					className={'row-start-3 row-end-4 col-start-1 col-end-1'}
					title="links"
					innerClassName="justify-center items-center gap-4 font-light text-xl"
				>
					{Object.entries(links).map(([title, url], i) => (
						<>
							<h1
								className="cursor-pointer"
								onClick={() => window.open(url, '_blank')}
							>
								{title}
							</h1>
							{i !== Object.keys(links).length - 1 && (
								<div className="border-b-[0.15rem] border-dotted border-b-accent h-[0.15rem] w-1/3">
									<h1></h1>
								</div>
							)}
						</>
					))}
				</PageSection>
				<PageSection
					className={'col-start-2 col-end-4 row-start-1 row-end-4'}
					title="bio"
					innerClassName="items-center justify-center text-xl font-thin gap-8"
				>
					<img src="/pfp.png" className="w-1/3" />
					<div className="flex flex-row gap-6 items-center justify-center w-full">
						{bioStrings.map((s, i) => (
							<>
								<h1>{s}</h1>
								{i !== bioStrings.length - 1 && (
									<h1 className="text-2xl">∙</h1>
								)}
							</>
						))}
					</div>
				</PageSection>

				<CoolPeople />

				<PageSection
					className={'col-start-4 col-end-4 row-start-2 row-end-4'}
					title="blog"
					innerClassName="items-center justify-start text-lg font-thin gap-3 overflow-scroll"
				>
					{blogs.map((b) => {
						return (
							<div
								className="w-full h-fit flex flex-col border-2 border-dotted border-complement p-2 gap-4 items-center justify-center cursor-pointer"
								onClick={() => setBlog(b)}
							>
								<h1 className="text-lg text-ellipsis overflow-hidden text-center font-medium">
									{b.title} - {b.date}
								</h1>
							</div>
						);
					})}
				</PageSection>
			</div>
		</>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
