export async function GET(request, { params }) {
    try {
      const filename = params.filename;
      
      // Call the Flask backend endpoint for return images
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${API_URL}/api/returns/images/${filename}`);
      
      if (!response.ok) {
        // Fall back to a placeholder if the image isn't available
        return Response.redirect('/api/placeholder/150/150');
      }
      
      // Get the image as an array buffer
      const imageBuffer = await response.arrayBuffer();
      
      // Get content type from response
      const contentType = response.headers.get('Content-Type') || 'image/jpeg';
      
      // Return the image
      return new Response(imageBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600'
        }
      });
    } catch (error) {
      console.error('Error fetching return image:', error);
      return Response.redirect('/api/placeholder/150/150');
    }
  }