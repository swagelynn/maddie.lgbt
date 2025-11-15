import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
	return (
		<div className="text-accent bg-black flex justify-center items-center h-screen w-screen select-none flex-col gap-2">
			<h1>work in progress.</h1>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
