import React, { useEffect } from 'react';
import { Blog } from '.';
import Markdown from 'react-markdown';
import { Icon } from '@iconify-icon/react/dist/iconify.js';

export default function BlogLayer({
	blog,
	setBlog,
}: {
	blog: Blog;
	setBlog: any;
}) {
	useEffect(() => {
		document.addEventListener('keydown', (ev) => {
			if (ev.key == 'Escape' && blog !== undefined) {
				setBlog(null);
			}
		});
	}, []);

	return (
		<div
			className="w-full h-full absolute z-40 text-accent items-center justify-center flex"
			style={blog ? {} : { display: 'none' }}
		>
			{blog && (
				<>
					<div className="bg-black w-full h-full absolute opacity-70 -z-10"></div>
					<div className={`flex flex-col h-[95vh] w-[95vw] bg-black`}>
						<div
							className={`border-accent border-2 h-10 pl-2 flex items-center font-semibold select-none`}
						>
							<h1>
								{blog.title} - {blog.date}
							</h1>
							<Icon
								icon={'pixelarticons:close-box'}
								height={'2rem'}
								className="ml-auto cursor-pointer"
								onClick={() => setBlog(null)}
							/>
						</div>
						<div
							className={`border-accent border-2 p-8 h-full border-dotted border-t-0 flex flex-col overflow-scroll`}
						>
							<div className=" prose text-accent prose-headings:text-complement prose-strong:text-complement">
								<Markdown>{blog.contents.join('\n')}</Markdown>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
