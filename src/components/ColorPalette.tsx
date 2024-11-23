import React from 'react';

interface ColorPaletteProps {
  currentColor: string;
  setCurrentColor: (color: string) => void;
}

const colors = [
  '#ff0000', '#ff9900', '#ffff00', '#00ff00',
  '#0000ff', '#9900ff', '#ff00ff', '#000000',
  '#ff9999', '#ffcc99', '#ffff99', '#99ff99',
  '#99ccff', '#cc99ff', '#666666', '#ffffff'
];

export const ColorPalette: React.FC<ColorPaletteProps> = ({ currentColor, setCurrentColor }) => {
  return (
    <div className="grid grid-cols-8 gap-2 mb-4">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
            currentColor === color ? 'border-gray-600 scale-110' : 'border-gray-300'
          }`}
          style={{ backgroundColor: color }}
          onClick={() => setCurrentColor(color)}
          title={color}
        />
      ))}
    </div>
  );
};