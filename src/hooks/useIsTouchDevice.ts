import { useEffect, useState } from "react";

export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    function onResize() {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.maxTouchPoints > 0
      );
    }

    // This shouldn't change on resize lol
    // window.addEventListener("resize", onResize);
    onResize();

    // return () => {
    //   window.removeEventListener("resize", onResize);
    // };
  }, []);

  return isTouchDevice;
}
