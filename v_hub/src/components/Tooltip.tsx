import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
	content: React.ReactNode;
	children: React.ReactElement;
	position?: "top" | "bottom" | "left" | "right";
	delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
	content,
	children,
	position = "top",
	delay = 200,
}) => {
	const [visible, setVisible] = useState(false);
	const [coords, setCoords] = useState({ top: 0, left: 0 });
	const targetRef = useRef<HTMLElement | null>(null);
	const timerRef = useRef<number | null>(null);

	const updateCoords = () => {
		if (targetRef.current) {
			const rect = targetRef.current.getBoundingClientRect();
			const scrollY = window.scrollY;
			const scrollX = window.scrollX;

			let top = 0;
			let left = 0;

			// 10px spacing from target
			if (position === "top") {
				top = rect.top + scrollY - 10;
				left = rect.left + scrollX + rect.width / 2;
			} else if (position === "bottom") {
				top = rect.bottom + scrollY + 10;
				left = rect.left + scrollX + rect.width / 2;
			} else if (position === "left") {
				top = rect.top + scrollY + rect.height / 2;
				left = rect.left + scrollX - 10;
			} else if (position === "right") {
				top = rect.top + scrollY + rect.height / 2;
				left = rect.right + scrollX + 10;
			}

			setCoords({ top, left });
		}
	};

	const showTooltip = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(() => {
			updateCoords();
			setVisible(true);
		}, delay);
	};

	const hideTooltip = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		setVisible(false);
	};

	useEffect(() => {
		if (!visible) return;

		// Update coords during window events
		window.addEventListener("scroll", updateCoords, { passive: true });
		window.addEventListener("resize", updateCoords, { passive: true });

		return () => {
			window.removeEventListener("scroll", updateCoords);
			window.removeEventListener("resize", updateCoords);
		};
	}, [visible]);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	const child = React.Children.only(children);

	const triggerProps = {
		ref: (node: HTMLElement | null) => {
			targetRef.current = node;
			// Handle existing ref on child
			if (typeof (child as any).ref === "function") {
				(child as any).ref(node);
			} else if ((child as any).ref) {
				(child as any).ref.current = node;
			}
		},
		onMouseEnter: (e: React.MouseEvent) => {
			(child.props as any).onMouseEnter?.(e);
			showTooltip();
		},
		onMouseLeave: (e: React.MouseEvent) => {
			(child.props as any).onMouseLeave?.(e);
			hideTooltip();
		},
		onFocus: (e: React.FocusEvent) => {
			(child.props as any).onFocus?.(e);
			showTooltip();
		},
		onBlur: (e: React.FocusEvent) => {
			(child.props as any).onBlur?.(e);
			hideTooltip();
		},
	};

	const getTransformStyle = () => {
		switch (position) {
			case "top":
				return "translate(-50%, -100%)";
			case "bottom":
				return "translate(-50%, 0)";
			case "left":
				return "translate(-100%, -50%)";
			case "right":
				return "translate(0, -50%)";
		}
	};

	const getArrowClass = () => {
		switch (position) {
			case "top":
				return "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 border-r border-b";
			case "bottom":
				return "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t";
			case "left":
				return "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-45 border-t border-r";
			case "right":
				return "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-l";
		}
	};

	const getAnimationVariants = () => {
		const scaleInit = 0.94;
		switch (position) {
			case "top":
				return {
					initial: { opacity: 0, y: 6, scale: scaleInit },
					animate: { opacity: 1, y: 0, scale: 1 },
					exit: { opacity: 0, y: 6, scale: scaleInit },
				};
			case "bottom":
				return {
					initial: { opacity: 0, y: -6, scale: scaleInit },
					animate: { opacity: 1, y: 0, scale: 1 },
					exit: { opacity: 0, y: -6, scale: scaleInit },
				};
			case "left":
				return {
					initial: { opacity: 0, x: 6, scale: scaleInit },
					animate: { opacity: 1, x: 0, scale: 1 },
					exit: { opacity: 0, x: 6, scale: scaleInit },
				};
			case "right":
				return {
					initial: { opacity: 0, x: -6, scale: scaleInit },
					animate: { opacity: 1, x: 0, scale: 1 },
					exit: { opacity: 0, x: -6, scale: scaleInit },
				};
		}
	};

	const tooltipElement = (
		<AnimatePresence>
			{visible && (
				<div
					style={{
						position: "absolute",
						top: coords.top,
						left: coords.left,
						transform: getTransformStyle(),
						zIndex: 9999,
						pointerEvents: "none",
					}}>
					<motion.div
						variants={getAnimationVariants()}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.12, ease: "easeOut" }}
						className="relative bg-panel border border-panel-border/80 text-ink rounded-lg shadow-(--card-shadow) text-[11px] px-3 py-2 font-medium max-w-62.5 leading-relaxed backdrop-blur-xs flex flex-col gap-1 border-t-2 border-t-accent">
						{/* Visual Arrow Caret */}
						<div
							className={`absolute w-1.5 h-1.5 bg-panel border-panel-border/80 ${getArrowClass()}`}
						/>

						{/* Tooltip text/content wrapper */}
						<div className="relative z-10">{content}</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);

	return (
		<>
			{React.cloneElement(child, triggerProps)}
			{createPortal(tooltipElement, document.body)}
		</>
	);
};

export default Tooltip;
