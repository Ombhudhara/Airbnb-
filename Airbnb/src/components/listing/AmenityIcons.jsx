/**
 * src/components/listing/AmenityIcons.jsx
 *
 * A simple dictionary of SVG icons for amenities.
 */

export const getAmenityIcon = (name, className) => {
  const props = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
    focusable: 'false',
    className
  };

  switch (name) {
    case 'view':
      return <svg {...props}><rect x="4" y="6" width="24" height="20" rx="2" /><circle cx="16" cy="16" r="4" /></svg>;
    case 'bathtub':
      return <svg {...props}><path d="M4 14h24M6 14v6a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-6M10 6v8M22 6v8" /></svg>;
    case 'hairdryer':
      return <svg {...props}><path d="M8 8h10a4 4 0 0 1 4 4v4H8V8zM22 12h4v4h-4zM10 16v8" /></svg>;
    case 'washer':
      return <svg {...props}><rect x="6" y="4" width="20" height="24" rx="2" /><circle cx="16" cy="16" r="5" /></svg>;
    case 'tv':
      return <svg {...props}><rect x="4" y="8" width="24" height="16" rx="2" /><path d="M10 4l6 4 6-4" /></svg>;
    case 'aircon':
      return <svg {...props}><rect x="4" y="6" width="24" height="10" rx="2" /><path d="M8 20v4M16 20v6M24 20v4" /></svg>;
    case 'wifi':
      return <svg {...props}><path d="M8 16a12 12 0 0 1 16 0M11 20a6 6 0 0 1 10 0M15 24h2" /></svg>;
    case 'workspace':
      return <svg {...props}><rect x="4" y="14" width="24" height="12" rx="2" /><path d="M8 10h16M12 26v4M20 26v4M10 30h12" /></svg>;
    case 'kitchen':
      return <svg {...props}><path d="M8 4v24M12 8h8M12 16h8M24 4v24" /></svg>;
    case 'entrance':
      return <svg {...props}><path d="M12 4v24M20 4v24M4 28h24M16 16h1" /></svg>;
    case 'patio':
      return <svg {...props}><path d="M4 24h24M8 12h16v12H8zM16 12v12" /></svg>;
    case 'parking':
      return <svg {...props}><path d="M8 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v12H8V10zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /></svg>;
    case 'pool':
      return <svg {...props}><path d="M4 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0M4 26c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /></svg>;
    case 'hottub':
      return <svg {...props}><path d="M4 22c2-2 4-2 6 0s4 2 6 0 4-2 6 0M10 14v4M16 12v6M22 14v4" /></svg>;
    case 'pets':
      return <svg {...props}><path d="M10 12c-2 0-3-2-2-4s3-1 4 1-1 3-2 3zM22 12c2 0 3-2 2-4s-3-1-4 1 1 3 2 3zM16 18c-3 0-6 2-6 6h12c0-4-3-6-6-6z" /></svg>;
    case 'camera':
      return <svg {...props}><circle cx="16" cy="16" r="4" /><rect x="6" y="8" width="20" height="16" rx="2" /></svg>;
    case 'co2':
      return <svg {...props}><path d="M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM16 12v4M16 20h.01" /><line x1="4" y1="4" x2="28" y2="28" stroke="currentColor" strokeWidth="2" /></svg>;
    case 'smoke':
      return <svg {...props}><path d="M8 8h16v4H8zM12 16v6M20 16v6" /><line x1="4" y1="4" x2="28" y2="28" stroke="currentColor" strokeWidth="2" /></svg>;
    default:
      return <svg {...props}><circle cx="16" cy="16" r="10" /></svg>;
  }
};
