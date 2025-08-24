import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Popup({ isOpen, onClose, onClick, image }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }} // Start small + rotated
            animate={{ opacity: 1, scale: 1, rotate: 0 }} // Pop into place
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }} // Smooth exit
            transition={{
              duration: 0.6,
              ease: [0.25, 1, 0.5, 1], // "bounce" feel
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="relative"
          >
            {/* Animated Poster */}
            <motion.img
              src={image}
              alt="Hackvotrix Poster"
              onClick={onClick}
              className="max-w-[50vw] max-h-[70vh] rounded-2xl shadow-2xl cursor-pointer"
              animate={{
                rotate: [0, -2, 2, -2, 2, 0], // Subtle alarm shake
              }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0,0,0,0.45)",
              }}
            />

            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-3 right-3 bg-white/80 text-black p-2 rounded-full shadow-md hover:bg-white transition"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.2, rotate: 90 }}
            >
              ✖
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
