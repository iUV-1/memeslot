"use client";
import { useState, useRef } from 'react';
import './styles/animations.css';

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const images = [
    { url: '/images/common1.jpeg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/common2.jpeg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/common3.jpeg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/common4.jpeg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/common5.png', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/common6.jpeg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/common7.jpeg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/common8.jpeg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/common9.jpeg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/common10.jpeg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/common11.jpeg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/common12.jpg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/common13.jpeg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/common14.jpeg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/rare1.png', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/rare2.jpeg', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/rare3.jpeg', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/rare4.jpeg', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/rare5.png', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/rare6.png', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/rare7.jpeg', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/rare8.jpeg', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/rare9.jpeg', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/rare10.jpg', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/rare12.png', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/rare13.jpeg', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/rare14.png', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/rare15.jpeg', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: "/images/troll.png", alt: 'Trololollolololol', sound: '/sounds/get out (basic).mp3' },
    { url: '/images/rare11.jpg', alt: 'Rare', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/legendary1.jpeg', alt: 'Super Rare', sound: '/sounds/ta da (legendary).mp3' },
    { url: '/images/legendary2.jpeg', alt: 'Super Rare', sound: '/sounds/ta da (legendary).mp3' },
    { url: '/images/common15.jpeg', alt: 'Common', sound: '/sounds/bruh (common) (new).mp3' },
  ];

  const [ribbonClass, setRibbonClass] = useState('ribbon');
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string; sound: string } | null>(null);

  // Refs for audio elements
  const buttonClickSoundRef = useRef<HTMLAudioElement>(null);
  const spinStartSoundRef = useRef<HTMLAudioElement>(null);
  const resultSoundRef = useRef<HTMLAudioElement>(null);
  const handleButtonClick = () => {
    // Play sounds regardless of spin state
    if (buttonClickSoundRef.current) {
      buttonClickSoundRef.current.currentTime = 0;
      buttonClickSoundRef.current.play();
    }
    // Only proceed with spin if not already spinning
    if (!isSpinning) {
      setIsSpinning(true);
      if (spinStartSoundRef.current) {
        spinStartSoundRef.current.currentTime = 0;
        spinStartSoundRef.current.play();
      }
      setRibbonClass('ribbon spinning');
      setTimeout(() => {
        setRibbonClass('ribbon spinning stopping');
        setTimeout(() => {
          const selected = images[Math.floor(Math.random() * images.length)];
          setSelectedImage(selected);
          setRibbonClass('ribbon');
          setIsSpinning(false);
          if (resultSoundRef.current) {
            resultSoundRef.current.src = selected.sound;
            resultSoundRef.current.currentTime = 0;
            resultSoundRef.current.play();
          }
        }, 2000);
      }, 3000);
    }
  };
  const handleReset = () => {
    setSelectedImage(null);
    setRibbonClass('ribbon');
  };
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Sound effects */}
      <audio ref={buttonClickSoundRef} src="/sounds/vine boom (click button).mp3" preload="auto" />
      <audio ref={spinStartSoundRef} src="/sounds/drum roll (wheel spinning) (4 seconds).mp3" preload="auto" />
      <audio ref={resultSoundRef} preload="auto" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl mb-8 text-center">MemeSlot</h1>

        <div className="ribbon-container my-8 relative mt-32">
          {/* Top lights */}
          <div className="lights-container mb-4">
            <div className="lights-top">
              {[...Array(20)].map((_, i) => (
                <div key={`top-${i}`} className="light" />
              ))}
            </div>
          </div>

          {/* Ribbon content */}
          <div className={ribbonClass}>
            {[...images, ...images, ...images, ...images, ...images, ...images].map((image, i) => (
              <img 
                key={i}
                src={image.url}
                alt={image.alt}
                className="h-full w-[150px] object-cover"
              />
            ))}
          </div>

          {/* Bottom lights */}
          <div className="lights-container mt-4">
            <div className="lights-bottom">
              {[...Array(20)].map((_, i) => (
                <div key={`bottom-${i}`} className="light" />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={handleButtonClick}
            className={`bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-xl 
            transition-transform duration-200 hover:scale-110 ${isSpinning ? 'opacity-50' : ''}`}
          >
            {isSpinning ? 'Spinning...' : 'SPIN!'}
          </button>
        </div>

        {/* Footer */}
        <footer className="footer">
          <img 
            src="/images/troll.png" 
            alt="Footer Logo" 
            className="footer-image"
          />
          <div className="footer-contact">
            <p>Project Creators: Nam, Gia Minh, Minh Quyen</p>
            <p>Phone📞: (517) 977 2108</p>
          </div>
        </footer>

        {/* Result Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center">
            <div className="bg-white/10 p-8 rounded-lg text-center">
              <h2 className="text-3xl mb-4">You received:</h2>
              <img 
                src={selectedImage.url} 
                alt={selectedImage.alt}
                className="w-64 h-64 object-cover mx-auto mb-4" 
              />
              <p className="text-xl mb-6">{selectedImage.alt}</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleButtonClick}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full
                  transition-transform duration-200 hover:scale-110"
                >
                  Spin Again?
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full
                  transition-transform duration-200 hover:scale-110"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
