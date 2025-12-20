import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import BlogLayer from './BlogLayer';
import { blogs } from './Blogs';
import {
	Question,
	Questions,
	QuestionLayer,
	RegisterQuestionLayer,
} from './Questions';
import { ToastProvider } from './Toast';

export function PageSection({
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
	const linkLists = [
		{
			github: 'https://github.com/swagelynn',
			discord: 'https://discord.com/users/1298435571395330108',
			spotify: 'https://open.spotify.com/artist/4NWVxhAQhzcNXxiAU79FnL',
		},
		{
			letterboxd: 'https://letterboxd.com/swagelynn/',
			rateyourmusic: 'https://rateyourmusic.com/~swagelynn',
			"pronouns.page": "https://en.pronouns.page/@swageline"
		},
	];

	const bioStrings = ['maddie', 'she/her', 'programmer'];

	const [blog, setBlog] = useState<Blog>(null);

	// blog link logic
	useEffect(() => {
		const url = new URL(window.location.toString());
		const blogParam = url.searchParams.get('blog');

		if (blogParam) {
			const decode = decodeURIComponent(blogParam);

			blogs.forEach((b) => {
				if (b.title === decode) {
					setBlog(b);
				}
			});
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
		<ToastProvider>
			<>
				<BlogLayer blog={blog} setBlog={setBlog} />
				<div className="text-accent bg-black grid grid-cols-4 grid-rows-4 h-screen w-screen select-none gap-2 p-2">
					<PageSection
						className={
							'row-start-1 row-end-5 col-start-4 col-end-4'
						}
						title="music"
						innerClassName="items-center justify-center col gap-4"
					>
						<Song
							url="https://open.spotify.com/track/4ozidbSLCqkdCXJN9fvpfP"
							title="retcon"
							release="allochronic"
						/>
						<Song
							url="https://open.spotify.com/track/3YVpB5FYUj7N9SzTadZm5d"
							title={`// skip`}
							release="allochronic"
						/>
						<Song
							url="https://open.spotify.com/track/6Z8VaxaTsgtT6X1pLAw7Ns"
							title={`the dogs know what you did`}
							release={`rat alley`}
						/>
						
					</PageSection>
					<PageSection
						className={
							'row-start-1 row-end-5 col-start-1 col-end-1'
						}
						title="links"
						innerClassName="justify-center items-center gap-8 font-light text-xl"
					>
						{linkLists.map((list, i) => (
							<>
								{Object.entries(list).map(([title, url], i) => (
									<>
										<h1
											className="cursor-pointer"
											onClick={() =>
												window.open(url, '_blank')
											}
										>
											{title}
										</h1>
										{i !== Object.keys(list).length - 1 && (
											<div className="border-b-[0.15rem] border-dotted border-b-accent h-[0.15rem] w-1/3">
												<h1></h1>
											</div>
										)}
									</>
								))}
								{i !== linkLists.length - 1 && (
									<div className="border-b-[0.15rem] border-dotted border-b-complement h-[0.15rem] w-2/3">
										<h1></h1>
									</div>
								)}
							</>
						))}
					</PageSection>
					<PageSection
						className={
							'col-start-2 col-end-4 row-start-1 row-end-5'
						}
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
				</div>
			</>
		</ToastProvider>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
