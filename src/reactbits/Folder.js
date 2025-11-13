import { useState } from 'react';
import '../index.css';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({ color = '#296cf2', size = 1, images = [], className = '', title = '', isOpen = false, onToggle= () => {} }) => {
  const maxItems = 3;
  const papers = images.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));

  const folderBackColor = darkenColor(color, 0.08);

  const handleClick = () => {
    onToggle();
    if (isOpen) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!isOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (e, index) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    position: 'relative'
  };

  const folderClassName = `folder ${isOpen ? 'open' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div style={{ ...scaleStyle, display: 'inline-block', margin: '20px' }} className={className}>
      <div className={folderClassName} style={folderStyle} onClick={handleClick}>
        {isOpen && title && (
          <div
            style={{
              position: 'absolute',
              top: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#333',
              color: '#fff',
              padding: '4px 10px',
              borderRadius: '5px',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              zIndex: 10
            }}
          >
            {title}
          </div>
        )}
        <div className="folder__back">
          {papers.map((src, i) => (
            <div
              key={i}
              className={`paper paper-${i + 1}`}
              onMouseMove={e => handlePaperMouseMove(e, i)}
              onMouseLeave={e => handlePaperMouseLeave(e, i)}
              style={{
                backgroundImage: src ? `url(${src})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '--magnet-x': isOpen ? `${paperOffsets[i]?.x || 0}px` : '0px',
                '--magnet-y': isOpen ? `${paperOffsets[i]?.y || 0}px` : '0px'
              }}
            />
          ))}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
