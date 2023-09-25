"use client";
import { useEffect, useRef, useState } from "react";
import { evaluate } from "mathjs";

// Width e Height de 500px
// Visualização padrão no intervalo [-10,10]
const defaultZoom = 0.04;

function validateExpression(exp: string, x: number) {
  const changedExp = exp.replace("x", String(x));
  try {
    const result = evaluate(changedExp);
    return result;
  } catch (e) {
    return undefined;
  }
}
interface GraphProps {
  exp: string;
}

function Graph2D({ exp }: GraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasCtx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    setCanvas(canvas);
    if (!canvas) {return;}
    const ctx = canvas.getContext("2d");
    setCtx(ctx);
  }, []);

  useEffect(() => {
    if (!canvasCtx || !canvas) {
      return;
    }
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.translate(canvas.width / 2, canvas.height / 2);
    canvasCtx.strokeStyle = "#000000";
    canvasCtx.lineWidth = 1;

    canvasCtx.beginPath();
    canvasCtx.moveTo(0, canvas.height / 2);
    canvasCtx.lineTo(0, -canvas.height / 2);
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.moveTo(canvas.width / 2, 0);
    canvasCtx.lineTo(-canvas.width / 2, 0);
    canvasCtx.stroke();

    canvasCtx.strokeStyle = "#4C98FA";
    canvasCtx.lineWidth = 2;
    canvasCtx.beginPath();
    for (let i = 0; i < canvas.width; i++) {
      const x: number = (i - canvas.width / 2) * defaultZoom;
      const y: number | undefined = validateExpression(exp, x);
      if (y === undefined) {
        continue;
      }

      const canvasX = x / defaultZoom;
      const canvasY = -y / defaultZoom;
      if (i === 0) {
        canvasCtx.moveTo(canvasX, canvasY);
      } else {
        canvasCtx.lineTo(canvasX, canvasY);
      }
    }
    canvasCtx.stroke();
    canvasCtx.translate(-canvas.width / 2, -canvas.height / 2);

  }, [exp]);

  return <canvas width={500} height={500} ref={canvasRef} />;
}

export default Graph2D;
