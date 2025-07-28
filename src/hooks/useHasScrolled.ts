import { useState, useEffect } from "react";

export function useHasScrolled(elementSelector?: string) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let element: Element | Window;

    if (elementSelector) {
      const found = document.querySelector(elementSelector);
      if (!found) return;
      element = found;
    } else {
      element = window;
    }

    const handleScroll = () => {
      if (element === window) {
        setHasScrolled(window.scrollY > 0);
      } else {
        setHasScrolled((element as Element).scrollTop > 0);
      }
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [elementSelector]);

  return hasScrolled;
}
