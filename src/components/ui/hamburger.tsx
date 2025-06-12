import { motion } from "framer-motion";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  className?: string;
}

const lineCommon =
  "block h-0.5 w-6 bg-slate-700 rounded transition-colors group-hover:bg-pink-600";

export default function HamburgerButton({
  open,
  onClick,
  className = "",
}: HamburgerButtonProps) {
  return (
    <button
      className={`relative z-50 p-2.5 rounded-md hover:bg-pink-50/80 transition-colors group ${className}`}
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onClick}
      type="button"
    >
      <span className="sr-only">Toggle menu</span>
      <span className="relative w-6 h-5 flex flex-col justify-between items-center">
        {/* Top line */}
        <motion.span
          className={lineCommon}
          animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
        {/* Middle line */}
        <motion.span
          className={lineCommon}
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        {/* Bottom line */}
        <motion.span
          className={lineCommon}
          animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
      </span>
    </button>
  );
}
