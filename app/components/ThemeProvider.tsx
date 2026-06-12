"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ReactNode, useEffect } from "react";

// Keeps the browser-chrome tint (meta theme-color) matched to --bg-primary as the
// theme changes. Resolved through a probe element so the oklch values in CSS land
// in the meta tag as plain rgb(), which every browser's meta parser accepts.
function MetaThemeColorSync() {
  const { resolvedTheme, theme } = useTheme();

  useEffect(() => {
    const probe = document.createElement("div");
    probe.style.display = "none";
    probe.style.backgroundColor = "var(--bg-primary)";
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).backgroundColor;
    probe.remove();
    if (!color) return;

    document.querySelectorAll('meta[name="theme-color"]').forEach((el, i) => {
      if (i === 0) {
        el.removeAttribute("media");
        el.setAttribute("content", color);
      } else {
        el.remove();
      }
    });
    if (!document.querySelector('meta[name="theme-color"]')) {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      meta.setAttribute("content", color);
      document.head.appendChild(meta);
    }
  }, [resolvedTheme, theme]);

  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      themes={["system", "light", "dark", "daylight"]}
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      <MetaThemeColorSync />
      {children}
    </NextThemesProvider>
  );
}
