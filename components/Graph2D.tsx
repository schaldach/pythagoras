"use client";
import { useEffect, useRef } from "react";

// Width e Height de 500px
// Visualização padrão no intervalo [-10,10]
const defaultZoom = 0.04

function expression(x: number) {
  return Math.sin(x);
}

function Graph2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(0, -canvas.height / 2);
    ctx.stroke();

    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(-canvas.width / 2, 0);
    ctx.stroke();

    ctx.strokeStyle = "#4C98FA";
    ctx.lineWidth = 2
    ctx.beginPath();
    for (let i = 0; i < canvas.width; i++) {
      const x = (i - canvas.width / 2)*defaultZoom;
      const y = expression(x);

      const canvasX = x/defaultZoom;
      const canvasY = -y/defaultZoom;
      if (i === 0) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.stroke();
  }, []);

  return <canvas width={500} height={500} ref={canvasRef} />;
}

export default Graph2D;
