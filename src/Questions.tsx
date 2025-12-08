import React, { useEffect, useState } from 'react';
import { PageSection } from '.';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import Markdown from 'react-markdown';
import Input, { LabelInput, LabelTextArea, TextArea } from './Input';
import { useToast } from './Toast';

export interface Question {
	title: string;
	body: string;
	author: string;
	response: string;
}

const endpoint = 'https://que.maddie.lgbt';

async function getQuestions(): Promise<Question[]> {
	try {
		return await fetch(`${endpoint}/questions`).then((e) => e.json());
	} catch {
		return [];
	}
}

async function sendQuestion(
	question: Omit<Question, 'response'>
): Promise<[boolean, string]> {
	const res = await fetch(`${endpoint}/question`, {
		method: 'POST',
		body: JSON.stringify({
			title: question.title,
			body: question.body,
			author: question.author,
		}),
	});

	if (!res.ok) {
		switch (res.status) {
			case 500:
				return [false, 'internal server error :('];
			case 429:
				return [false, 'too many questions! wait a few minutes :3'];
			default:
				return [
					false,
					'submission failed with an unknown error, try again later! ^-^',
				];
		}
	}

	return [true, 'submitted question successfully! :P'];
}

export function Questions({
	setQuestion,
	isRegisteringQuestion,
	setIsRegisteringQuestion,
}: {
	setQuestion: any;
	isRegisteringQuestion: boolean;
	setIsRegisteringQuestion: any;
}) {
	const [questions, setQuestions] = useState<Question[]>([]);

	useEffect(() => {
		(async () => {
			setQuestions(await getQuestions());
		})();
	}, []);

	return (
		<PageSection
			className={'col-start-4 col-end-4 row-start-1 row-end-3'}
			title="q&a"
			innerClassName={`items-center justify-start text-lg font-thin gap-3 overflow-scroll relative ${questions?.length ? "" : "justify-center"}`}
		>
			{questions.map((q) => (
				<div
					className="w-full h-fit flex flex-col border-2 border-dotted border-complement p-2 gap-4 items-center justify-center cursor-pointer"
					onClick={() => setQuestion(q)}
				>
					<h1 className="text-lg text-ellipsis overflow-hidden text-center font-medium">
						{q.title} - {q.author}
					</h1>
				</div>
			))}
            {!questions?.length && <h1 className='text-xl font-medium relative'>no questions :(</h1>}
			{!isRegisteringQuestion && (
				<div
					className="bg-black w-fit h-fit absolute p-2 bottom-3 right-3 flex flex-col border-2 border-dotted border-alt gap-4 items-center justify-center cursor-pointer"
					onClick={() => setIsRegisteringQuestion(true)}
				>
					<h1 className="text-lg text-ellipsis overflow-hidden text-center font-medium text-alt">
						send your own
					</h1>
				</div>
			)}
		</PageSection>
	);
}

export function QuestionLayer({
	question,
	setQuestion,
}: {
	question: Question;
	setQuestion: any;
}) {
	useEffect(() => {
		document.addEventListener('keydown', (ev) => {
			if (ev.key == 'Escape' && question !== undefined) {
				setQuestion(null);
			}
		});
	}, []);

	return (
		<div
			className="w-full h-full absolute z-40 text-accent items-center justify-center flex"
			style={question ? {} : { display: 'none' }}
		>
			{question && (
				<>
					<div
						className="bg-black w-full h-full absolute opacity-70 -z-10"
						onClick={() => setQuestion(null)}
					/>
					<div className={`flex flex-col h-[95vh] w-[95vw] bg-black`}>
						<div
							className={`border-accent border-2 h-10 pl-2 flex items-center font-semibold select-none`}
						>
							<h1>
								{question.title} - {question.author}
							</h1>
							<Icon
								icon={'pixelarticons:close-box'}
								height={'2rem'}
								className="ml-auto cursor-pointer"
								onClick={() => setQuestion(null)}
							/>
						</div>
						<div
							className={`border-accent border-2 p-8 h-full w-full border-dotted border-t-0 flex flex-col overflow-scroll`}
						>
							<div className="prose text-accent prose-headings:text-complement prose-strong:text-complement prose-a:text-alt prose-ul:text-accent prose-li:text-accent prose-li:marker:text-accent w-full whitespace-normal break-normal max-w-none">
								<Markdown
									components={{
										img: ({ alt, src, title }) => (
											<img
												alt={alt}
												src={src}
												title={title}
												style={{
													maxWidth: '100%',
													height: 'auto',
												}}
											/>
										),
									}}
								>
									{[
										'## question',
										question.body,
										'## response',
										question.response,
									].join('\n\n')}
								</Markdown>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export function RegisterQuestionLayer({
	isRegisteringQuestion,
	setIsRegisteringQuestion,
	writtenQuestion,
	setWrittenQuestion,
}: {
	isRegisteringQuestion: boolean;
	setIsRegisteringQuestion: any;
	writtenQuestion: Partial<Omit<Question, 'response'>>;
	setWrittenQuestion: any;
}) {
	useEffect(() => {
		document.addEventListener('keydown', (ev) => {
			if (ev.key == 'Escape') {
				setIsRegisteringQuestion(false);
			}
		});
	}, []);

	const [title, setTitle] = useState<string>('');

	const [name, setName] = useState<string>('');

	const [message, setMessage] = useState<string>('');

	const toast: (toast: { type: 'success' | 'error'; text: string }) => void =
		useToast();

	return (
		<div
			className="w-full h-full absolute z-40 text-accent items-center justify-center flex"
			style={isRegisteringQuestion ? {} : { display: 'none' }}
		>
			{isRegisteringQuestion && (
				<>
					<div
						className="bg-black w-full h-full absolute opacity-70 -z-10"
						onClick={() => setIsRegisteringQuestion(false)}
					/>
					<div className={`flex flex-col h-[95vh] w-[95vw] bg-black`}>
						<div
							className={`border-accent border-2 h-10 pl-2 flex items-center font-semibold select-none`}
						>
							<h1>write your question!</h1>
							<Icon
								icon={'pixelarticons:close-box'}
								height={'2rem'}
								className="ml-auto cursor-pointer"
								onClick={() => setIsRegisteringQuestion(false)}
							/>
						</div>
						<div
							className={`border-accent border-2 p-6 pl-8 gap-4 h-full w-full border-dotted border-t-0 flex flex-col justify-between overflow-scroll`}
						>
							<LabelInput
								value={title}
								setValue={setTitle}
								label="title"
							/>
							<LabelTextArea
								label={'question'}
								value={message}
								setValue={setMessage}
								rows={12}
							/>
							<LabelInput
								value={name}
								setValue={setName}
								label="your name"
							/>
							<div
								className="bg-black w-1/4 h-fit p-2 flex flex-col border-2 border-dotted border-alt gap-4 items-center justify-center cursor-pointer"
								onClick={() => {
									if (!title) {
										toast({
											type: 'error',
											text: 'title must be set!',
										});
									} else if (!message) {
										toast({
											type: 'error',
											text: 'question must be set!',
										});
									} else {
										(async () => {
											const [ok, code] =
												await sendQuestion({
													author: name ?? 'anonymous',
													body: message,
													title,
												});

											toast({
												type: ok ? 'success' : 'error',
												text: code,
											});

											if (ok) {
												setName('');
												setMessage('');
												setTitle('');
											}
										})();
									}
								}}
							>
								<h1 className="text-lg text-ellipsis overflow-hidden text-center font-medium text-alt">
									send
								</h1>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
