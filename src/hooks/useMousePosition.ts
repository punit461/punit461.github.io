import { useEffect, useRef } from "react";

export interface MousePos {
  x: number;
  y: number;
  nx: number;
  ny: number;
}

export function useMousePosition() {
  const pos = useRef<MousePos>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      pos.current.nx = e.clientX / window.innerWidth - 0.5;
      pos.current.ny = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return pos;
}
