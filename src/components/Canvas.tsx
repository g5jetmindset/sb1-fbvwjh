import React, { useRef, useEffect } from 'react';

interface CanvasProps {
  currentColor: string;
}

export const Canvas: React.FC<CanvasProps> = ({ currentColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial canvas background to white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw a more detailed coloring template
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    // Draw a house base
    ctx.moveTo(100, 200);
    ctx.lineTo(300, 200);
    ctx.lineTo(300, 350);
    ctx.lineTo(100, 350);
    ctx.closePath();
    ctx.stroke();

    // Draw a roof
    ctx.beginPath();
    ctx.moveTo(80, 200);
    ctx.lineTo(200, 100);
    ctx.lineTo(320, 200);
    ctx.stroke();

    // Draw a door
    ctx.beginPath();
    ctx.rect(175, 250, 50, 100);
    ctx.stroke();

    // Draw windows
    ctx.beginPath();
    ctx.rect(125, 250, 30, 30);
    ctx.rect(245, 250, 30, 30);
    ctx.stroke();

    // Draw a sun
    ctx.beginPath();
    ctx.arc(50, 50, 30, 0, Math.PI * 2);
    ctx.stroke();
  }, []);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const pos = getMousePos(e);
    lastPos.current = pos;
    draw(e);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getMousePos(e);

    ctx.beginPath();
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPos.current = currentPos;
  };

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="border border-gray-300 rounded-lg cursor-pointer bg-white shadow-inner"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
};