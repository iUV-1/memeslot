"use client"
import { useState } from 'react';
import './styles/animations.css';

export default function Home() {
  const images = [
    { url: "/images/troll.png", alt: 'Image 1' },
    { url: '/images/rare11.jpg', alt: 'Image 2' },
    { url: '/images/common15.jpeg', alt: 'Image 3' },
    { url: '/images/rare4.jpeg', alt: 'Image 4' },
    { url: '/images/common4.jpeg', alt: 'Image 5' }
  ];

  const [ribbonClass, setRibbonClass] = useState('ribbon');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSpin = () => {
    // Start spinning
    setRibbonClass('ribbon spinning');
    
    // After 3 seconds, start slowing down
    setTimeout(() => {
      setRibbonClass('ribbon spinning stopping');
      
      // After 2 more seconds, select winner and stop
      setTimeout(() => {
        const selected = images[Math.floor(Math.random() * images.length)];
        setSelectedImage(selected);
        setRibbonClass('ribbon');
      }, 2000);
    }, 3000);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setRibbonClass('ribbon');
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl mb-8 text-center">Bruh Meme Slot</h1>
        
        
<div className="ribbon-container my-8">
  <div className={ribbonClass}>
    {[...images, ...images, ...images, ...images, ...images, ...images].map((image, i) => ( // Quadruple the images for fuller coverage
      <img 
        key={i}
        src={image.url}
        alt={image.alt}
        className="h-full w-[150px] object-cover" // Reduced width to fit more images
      />
    ))}
  </div>
</div>

        <div className="text-center">
          <button 
            onClick={handleSpin}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-xl"
          >
            SPIN!
          </button>
        </div>

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
                  onClick={handleSpin}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full"
                >
                  Spin Again?
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full"
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