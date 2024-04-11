import "./modal.css";

export interface ModalProps {
	children: React.ReactNode;
	show: boolean;
	hide: () => void;
}

export default function ModalComponent({ children, show, hide }: ModalProps) {

	return (
		<>
			{show &&
				<div className="modal">
					<div>
						{children}
					</div>
					<button onClick={() => hide()}>Close</button>
				</div>
			}
		</>
	)
}