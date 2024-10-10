import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

function SpiralText({ text }) {
  const textRef = useRef([]);

  useEffect(() => {
    // Configuración de animación en espiral
    const letters = textRef.current;
    gsap.fromTo(
      letters,
      {
        opacity: 0,
        rotation: 360,
        scale: 0,
        x: (i) => 100 * Math.cos(i * 0.5), // Cambiar la posición X en base al índice
        y: (i) => 100 * Math.sin(i * 0.5), // Cambiar la posición Y en base al índice
      },
      {
        opacity: 1,
        rotation: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 1,
        stagger: 0.5,
        ease: 'power2.out',
      }
    );
  }, [text]);

  return (
    <h1 style={{ display: 'flex', justifyContent: 'center', textTransform: 'uppercase' }}>
      {text.split('').map((letter, index) => (
        <span
          key={index}
          ref={(el) => (textRef.current[index] = el)}
          style={{ display: 'block', fontSize: '3.2rem', margin: '0 2px' }}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
}

export default SpiralText;
