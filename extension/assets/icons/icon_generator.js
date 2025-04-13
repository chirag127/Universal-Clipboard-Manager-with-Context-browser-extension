// This script generates SVG icons and converts them to PNG
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directory if it doesn't exist
const iconsDir = path.join(__dirname);
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icon
const generateSVG = (size) => {
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4a6cf7" />
        <stop offset="100%" stop-color="#3a5ce7" />
      </linearGradient>
    </defs>
    <rect x="${size * 0.1}" y="${size * 0.1}" width="${size * 0.8}" height="${size * 0.8}" rx="${size * 0.15}" fill="url(#gradient)" />
    <path d="M${size * 0.25} ${size * 0.35} L${size * 0.75} ${size * 0.35} M${size * 0.25} ${size * 0.5} L${size * 0.65} ${size * 0.5} M${size * 0.25} ${size * 0.65} L${size * 0.55} ${size * 0.65}" stroke="white" stroke-width="${size * 0.05}" stroke-linecap="round" />
    <circle cx="${size * 0.75}" cy="${size * 0.75}" r="${size * 0.15}" fill="white" />
  </svg>`;
  
  return svg;
};

// Convert SVG to PNG
const convertToPNG = (svg, size) => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = '#4a6cf7';
  ctx.fillRect(0, 0, size, size);
  
  // Draw icon elements
  ctx.fillStyle = 'white';
  
  // Draw clipboard
  const padding = size * 0.1;
  const width = size * 0.8;
  const height = size * 0.8;
  const radius = size * 0.15;
  
  // Rounded rectangle function
  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
  }
  
  // Draw clipboard body
  ctx.fillStyle = 'white';
  roundRect(padding, padding, width, height, radius);
  
  // Draw clipboard content lines
  ctx.fillStyle = '#4a6cf7';
  const lineHeight = size * 0.08;
  const lineWidth = size * 0.5;
  const lineX = size * 0.25;
  let lineY = size * 0.35;
  
  for (let i = 0; i < 3; i++) {
    roundRect(lineX, lineY, lineWidth - (i * size * 0.1), lineHeight, lineHeight / 2);
    lineY += size * 0.15;
  }
  
  // Draw context indicator
  ctx.fillStyle = '#4a6cf7';
  ctx.beginPath();
  ctx.arc(size * 0.75, size * 0.75, size * 0.15, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw context lines
  ctx.strokeStyle = 'white';
  ctx.lineWidth = size * 0.03;
  ctx.beginPath();
  ctx.moveTo(size * 0.7, size * 0.75);
  ctx.lineTo(size * 0.8, size * 0.75);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(size * 0.75, size * 0.7);
  ctx.lineTo(size * 0.75, size * 0.8);
  ctx.stroke();
  
  return canvas.toBuffer('image/png');
};

// Generate icons in different sizes
const sizes = [16, 48, 128];

sizes.forEach(size => {
  const svg = generateSVG(size);
  const png = convertToPNG(svg, size);
  
  // Save SVG
  fs.writeFileSync(path.join(iconsDir, `icon${size}.svg`), svg);
  
  // Save PNG
  fs.writeFileSync(path.join(iconsDir, `icon${size}.png`), png);
  
  console.log(`Generated icon${size}.svg and icon${size}.png`);
});

console.log('Icon generation complete!');
