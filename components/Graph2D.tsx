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
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    setCtx(ctx);
  }, []);

  const handleMouseMove = (event: any) => {
    const localX = event.clientX - event.target.offsetLeft;
    const localY = event.clientY - event.target.offsetTop;

    if (localX > 0 && localX <= 500 && localY > 0 && localY <= 500) {
      drawGraph(true, localX - 250);
    }
  };

  function eraseLine() {
    if (!canvasCtx || !canvas) {
      return;
    }
    drawGraph();
  }

  function drawGraph(hoverMode: boolean = false, localX: number = 0) {
    if (!canvasCtx || !canvas) {
      return;
    }
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.translate(canvas.width / 2, canvas.height / 2);
    canvasCtx.strokeStyle = "#000000";
    canvasCtx.lineWidth = 1;
    canvasCtx.setLineDash([]);

    canvasCtx.beginPath();
    canvasCtx.moveTo(0, canvas.height / 2);
    canvasCtx.lineTo(0, -canvas.height / 2);
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.moveTo(canvas.width / 2, 0);
    canvasCtx.lineTo(-canvas.width / 2, 0);
    canvasCtx.stroke();

    canvasCtx.strokeStyle = "#4C98FA";
    canvasCtx.lineWidth = 4;
    const resultsArray = [];
    for (let i = 0; i < canvas.width; i++) {
      const x: number = (i - canvas.width / 2) * defaultZoom;
      const y: number | undefined = validateExpression(exp, x);
      if (y === undefined) {
        continue;
      }
      resultsArray.push(y);
      const canvasX = Math.round(x / defaultZoom);
      const canvasY = -y / defaultZoom;
      if (hoverMode && canvasX === localX) {
        canvasCtx.stroke();
        canvasCtx.beginPath();
        canvasCtx.arc(canvasX, canvasY, 6, 0, 2 * Math.PI);
        canvasCtx.fillStyle = "#4C98FA";
        canvasCtx.fill();
        canvasCtx.beginPath();
      }
      if (
        i === 0 ||
        Math.abs(y - resultsArray[i - 1]) >
          canvas.width * defaultZoom /*CanvasHeight*/
      ) {
        if (i !== 0) canvasCtx.stroke();
        canvasCtx.beginPath();
        canvasCtx.moveTo(canvasX, canvasY);
      } else {
        canvasCtx.lineTo(canvasX, canvasY);
      }
    }
    canvasCtx.stroke();

    if (hoverMode) {
      canvasCtx.strokeStyle = "#4C98FA";
      canvasCtx.lineWidth = 2;
      canvasCtx.setLineDash([15, 15]);
      canvasCtx.moveTo(localX, -250);
      canvasCtx.lineTo(localX, 250);
      canvasCtx.stroke();
    }

    canvasCtx.translate(-canvas.width / 2, -canvas.height / 2);
  }

  useEffect(() => {
    drawGraph();
  }, [exp]);

  return (
    <canvas
      onMouseLeave={eraseLine}
      onMouseMove={handleMouseMove}
      width={500}
      height={500}
      ref={canvasRef}
    />
  );
}

export default Graph2D;
