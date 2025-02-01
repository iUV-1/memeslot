"use client";

import React, { useState, useRef } from 'react';
import { images } from './data';

const Wheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{ src: string; rarity: string; sound: string } | null>(null);

  // Refs for audio elements
  const clickSoundRef = useRef<HTMLAudioElement>(null);
  const spinSoundRef = useRef<HTMLAudioElement>(null);
  const resultSoundRef = useRef<HTMLAudioElement>(null);

  const spinWheel = () => {
    if (spinning) return;

    // Play click sound
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0; // Rewind to the start
      clickSoundRef.current.play();
    }

    setSpinning(true);
    setResult(null);

    // Play spin sound
    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0; // Rewind to the start
      spinSoundRef.current.play();
    }

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      const selectedImage = images[randomIndex];
      setResult(selectedImage);
      setSpinning(false);

      // Play rarity-specific sound
      if (resultSoundRef.current) {
        resultSoundRef.current.src = selectedImage.sound; // Set the sound file
        resultSoundRef.current.currentTime = 0; // Rewind to the start
        resultSoundRef.current.play();
      }
    }, 4000); // Spin for 4 seconds
  };

  return (
    <div>
      {/* Audio elements for sound effects */}
      <audio ref={clickSoundRef} src="/sounds/vine boom (click button).mp3" preload="auto" />
      <audio ref={spinSoundRef} src="/sounds/drum roll (wheel spinning) (4 seconds).mp3" preload="auto" />
      <audio ref={resultSoundRef} src="" preload="auto" /> {/* src will be set dynamically */}

      {/* Wheel UI */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={`slot ${index}`}
            style={{
              width: '150px',
              height: '150px',
              transition: spinning ? 'transform 4s ease-out' : 'none', // Only apply transition during spinning
              transform: spinning ? `rotate(${360 * 10}deg)` : 'rotate(0deg)', // Spin 5 times
            }}
          />
        ))}
      </div>
      <button onClick={spinWheel} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin Wheel'}
      </button>
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>You got: {result.rarity}</h2>
          <img src={result.src} alt="Result" style={{ width: '300px', height: '300px', alignItems: 'center', }} />
          <a href={result.src} download>
            Download Image
          </a>
          <button onClick={spinWheel} style={{ marginLeft: '10px' }}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Wheel;
