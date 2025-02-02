"use client";
import { useState, useRef, useEffect } from 'react';
import './styles/animations.css';

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const images = [
    { url: "/images/troll.png", alt: 'Image 1', sound: '/sounds/get out (basic).mp3' },
    { url: '/images/rare11.jpg', alt: 'Image 2', sound: '/sounds/yippee (rare).mp3' },
    { url: '/images/common15.jpeg', alt: 'Image 3', sound: '/sounds/bruh (common) (new).mp3' },
    { url: '/images/rare4.jpeg', alt: 'Image 4', sound: '/sounds/ta da (legendary).mp3' },
    { url: '/images/common4.jpeg', alt: 'Image 5', sound: '/sounds/bruh (common) (new).mp3' },
  ];

  const [ribbonClass, setRibbonClass] = useState('ribbon');
  const [selectedImage, setSelectedImage] = useState(null);

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
        setTimeout(async () => {
          const selected = WeightedRandom();
          const result = await GetImageAPI(selected?.rarity);
          setSelectedImage(JSON.parse(result).imageURL);
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

  async function GetImageAPI(bucket) {
    const response = await fetch("https://memeslot-cydugrbdhmdaggha.westus2-01.azurewebsites.net/GetMeme/" + bucket);
    const data = await response.json();
    return data
  } 
  const items = [
    {rarity: "legendary", weight: 0.01, images:"/images/legendary.jpg", sound: '/sounds/ta da (legendary).mp3'},
    {rarity: "epic", weight: 5, images:"/images/epic.jpg", sound: '/sounds/bruh (common) (new).mp3'},
    {rarity: "rare", weight: 30, images:"/images/rare.jpg", sound: '/sounds/yippee (rare).mp3'},
    {rarity: "common", weight: 64.99, images:"/images/common.jpg", sound: '/sounds/get out (basic).mp3'},
  ]

  const WeightedRandom = () => {
        // Calculate total weight
        const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

        // Get a random number between 0 and totalWeight
        let randomNum = Math.random() * totalWeight;
    
        // Select an item based on weight
        for (const item of items) {
            if (randomNum < item.weight) {
                return {rarity: item.rarity, images: item.images};
            }
            randomNum -= item.weight;
        }
  } 

  const randomItemsRef = useRef<{ rarity: string; images: string }[]>([]);

  useEffect(() => {
    const newItems = [];
    for (let i = 0; i <= 50; i++) {
      const item = WeightedRandom();
      if (item) {
        newItems.push(item);
      }
    }
    randomItemsRef.current = newItems;
  }, []);
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Sound effects */}
      <audio ref={buttonClickSoundRef} src="/sounds/vine boom (click button).mp3" preload="auto" />
      <audio ref={spinStartSoundRef} src="/sounds/drum roll (wheel spinning) (4 seconds).mp3" preload="auto" />
      <audio ref={resultSoundRef} preload="auto" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl mb-8 text-center">Bruh Meme Slot</h1>

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
            {
              randomItemsRef.current.map((rarity, i) => (
                <img 
                  key={i}
                  src={rarity.images}
                  alt={"keep yourself safe"}
                  className="h-full w-[150px] object-cover"
                />
              ))
            }
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
            <p>Contact: example@email.com</p>
            <p>Phone: (123) 456-7890</p>
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