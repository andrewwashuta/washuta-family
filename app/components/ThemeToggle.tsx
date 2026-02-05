"use client";

import { useTheme } from "next-themes";
import { CentralIcon } from "@central-icons-react/all";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CYCLE = ["system", "light", "dark"] as const;

const iconNames = {
  system: "IconTelevision",
  light: "IconSun",
  dark: "IconMoon",
} as const;

const labels = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-8" />;
  }

  const current = (theme as typeof CYCLE[number]) || "system";
  const nextIndex = (CYCLE.indexOf(current) + 1) % CYCLE.length;
  const next = CYCLE[nextIndex];

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => setTheme(next)}
      className="relative h-8 w-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-200"
      aria-label={`Theme: ${labels[current]}. Switch to ${labels[next]}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 30 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute"
        >
          <CentralIcon name={iconNames[current]} join="round" fill="outlined" radius="3" stroke="1.5" size={16} />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
