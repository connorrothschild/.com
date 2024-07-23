import { AnimatePresence, motion } from "framer-motion";

export default function FullscreenLoader({ show }: { show: boolean }) {
  const DELAY_MS = 100;
  const ANIMATION_MS = 1500;
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25, delay: 1 } }}
          className="z-[100] fixed top-0 left-0 bg-[--background] w-full h-screen pointer-events-none overflow-hidden flex justify-center items-center gap-2"
        >
          {[...Array(5)].map((_, i) => (
            <div
              className="w-1 h-[50px] bg-black animate-pulse"
              key={i}
              style={{
                animationDuration: `${ANIMATION_MS}ms`,
                animationDelay: `${i * DELAY_MS}ms`,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
