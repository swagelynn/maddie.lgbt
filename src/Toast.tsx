import React, {
	useState,
	useEffect,
	useRef,
	createContext,
	useContext,
} from 'react';

const ToastContext = createContext<{ addToast: (toast: any) => void }>({
	addToast: (_toast: any) => {},
});

export function ToastProvider({ children }) {
	const [queue, setQueue] = useState([]);
	const timeoutRef = useRef(null);

	const addToast = (toast) => {
        if(queue.some(t => t.text === toast.text)) return;

		setQueue((q) => [...q, { id: Date.now(), ...toast }]);
	};

	useEffect(() => {
		if (queue.length === 0) return;

		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			setQueue((q) => q.slice(1));
		}, 2000);

		return () => clearTimeout(timeoutRef.current);
	}, [queue]);

	return (
		<ToastContext.Provider value={{ addToast }}>
			{children}
			<div className="absolute w-full h-full top-0 left-0 p-8 gap-2 flex flex-col items-center justify-end pointer-events-none z-[60]">
				{(queue?.[0] ? [queue[0]] : []).map(
					({ id, type, text }, idx) => (
						<div
							key={id}
							className={`flex w-auto h-12 px-4 text-accent items-center justify-center shadow-lg pointer-events-none border-2 border-dotted ${
								type === 'error'
									? 'border-complement'
									: 'border-alt'
							}`}
						>
							{text}
						</div>
					)
				)}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context)
		throw new Error('useToast must be used within a ToastProvider');
	return context.addToast;
}
