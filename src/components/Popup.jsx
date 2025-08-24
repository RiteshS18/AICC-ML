import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import RegistrationDeadline from "./RegistrationDeadline";

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
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 1, 0.5, 1],
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="relative flex flex-col md:flex-row gap-6 md:gap-8 bg-white/30 dark:bg-gray-800/20 backdrop-blur-sm p-4 md:p-8 rounded-2xl shadow-2xl max-w-[95vw] md:max-w-[90vw] max-h-[90vh] md:max-h-[80vh] overflow-y-auto"
          >
            {/* Poster */}
            <div className="w-full md:w-1/2 md:flex-1">
              <motion.img
                src={image}
                alt="Hackvotrix Poster"
                onClick={onClick}
                className="w-full h-auto max-h-[50vh] md:max-h-[65vh] object-contain rounded-xl shadow-lg cursor-pointer"
                animate={{
                  rotate: [0, -1, 1, -1, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.45)",
                }}
              />
            </div>

            {/* Registration Deadline */}
            <div className="w-full md:w-1/2 md:flex-1 flex items-center justify-center">
              <RegistrationDeadline />
            </div>

            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-2 right-2 text-white p-2 rounded-full transition z-10 text-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ 
                scale: 1.2,
                color: '#60A5FA'
              }}
            >
              ✖
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
