export async function GET(request, { params }) {
    const width = await params.width;
    const height = await params.height;
    
    // SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f1f5f9"/>
        <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#e2e8f0"/>
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#e2e8f0" stroke-width="1"/>
        <line x1="0" y1="100%" x2="100%" y2="0" stroke="#e2e8f0" stroke-width="1"/>
        <circle cx="50%" cy="50%" r="15%" fill="#cbd5e1"/>
        <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#64748b" text-anchor="middle" dy=".3em">
          ${width}×${height}
        </text>
      </svg>
    `;
    
    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml'
      }
    });
  }