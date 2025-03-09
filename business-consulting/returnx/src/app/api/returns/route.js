export async function GET() {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${API_URL}/api/returns`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch returns from backend');
      }
      
      const data = await response.json();
      return Response.json(data);
    } catch (error) {
      console.error('Error fetching returns:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }
  }