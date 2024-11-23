import React, { useState } from 'react';
import { ColorPalette } from './components/ColorPalette';
import { Canvas } from './components/Canvas';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

function App() {
  const [currentColor, setCurrentColor] = useState('#ff0000');

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Coloring Book
          </h1>
          <button
            onClick={handleReset}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Reset canvas"
          >
            <ArrowPathIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <ColorPalette currentColor={currentColor} setCurrentColor={setCurrentColor} />
        <Canvas currentColor={currentColor} />
      </div>
    </div>
  );
}

export default App;