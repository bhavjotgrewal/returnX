export async function POST(request, { params }) {
    try {
      const returnId = params.returnId;
      const body = await request.json();
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${API_URL}/api/returns/${returnId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update return status');
      }
      
      const result = await response.json();
      return Response.json(result);
    } catch (error) {
      console.error('Error updating return status:', error);
      return Response.json({ success: false, message: error.message }, { status: 500 });
    }
  }