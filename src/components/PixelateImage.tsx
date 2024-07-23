import { useRef, useEffect, useState } from "react";

const PixelateImage = ({ src, pxFactorValues = [1, 2, 3, 5, 10] }) => {
  const canvasRef = useRef(null);
  const [img, setImg] = useState(null);
  const [imgRatio, setImgRatio] = useState(1);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setImg(image);
      setImgRatio(image.width / image.height);
    };
  }, [src]);

  const [state, setState] = useState("not-started");

  const render = (pxFactor) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || state == "finished") return;

    setState("started");

    const ctx = canvas.getContext("2d");
    const offsetWidth = canvas.parentNode.offsetWidth;
    const offsetHeight = offsetWidth / imgRatio;
    canvas.width = offsetWidth;
    canvas.height = offsetHeight;

    const size = pxFactor * 0.01;
    ctx.imageSmoothingEnabled = size === 1;

    const w = offsetWidth * size;
    const h = offsetHeight * size;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, offsetWidth, offsetHeight);

    // Set canvas opacity to 0 after the last blur effect
    if (pxFactor === pxFactorValues[pxFactorValues.length - 1]) {
      setState("finished");
    }
  };

  useEffect(() => {
    if (img) {
      pxFactorValues.forEach((factor, index) => {
        setTimeout(() => render(factor), index * 100);
      });
      const handleResize = () =>
        render(pxFactorValues[pxFactorValues.length - 1]);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [img, pxFactorValues]);

  return (
    <div
      style={{
        backgroundImage: state === "not-started" ? null : `url(${src})`,
        width: "100%",
        height: "100%",
        aspectRatio: imgRatio,
        position: "relative",
        backgroundSize: "cover",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          aspectRatio: imgRatio,
          top: 0,
          left: 0,
          // transition: "opacity 300ms ease",
          opacity: state == "finished" ? 0 : 1,
        }}
      ></canvas>
    </div>
  );
};

export default PixelateImage;
