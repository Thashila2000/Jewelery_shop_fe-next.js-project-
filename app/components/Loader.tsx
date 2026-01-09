// components/FancyLoader.jsx
import { motion } from "framer-motion";


export default function FancyLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-4 h-12 bg-[#D4AF37] rounded-md shadow-lg"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 1.2,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}