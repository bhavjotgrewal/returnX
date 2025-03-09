// app/api/suggestedActions/route.js
export async function GET(request) {
    try {
      // Get query parameters
      const url = new URL(request.url);
      const productId = url.searchParams.get('productId');
      const returnId = url.searchParams.get('returnId');
      
      // Call your backend API endpoint
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      let apiUrl = `${API_URL}/api/returns_analysis/dashboardData`;
      
      // Add parameters if provided
      const params = new URLSearchParams();
      if (productId) params.append('productId', productId);
      if (returnId) params.append('returnId', returnId);
      
      if (params.toString()) {
        apiUrl += `?${params.toString()}`;
      }
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Transform the data to match the frontend expectations
      const transformedData = {
        suggestedActions: data.analysis.suggestions.map((suggestion) => ({
          id: suggestion.id,
          title: suggestion.title,
          description: suggestion.description,
          image: `/api/placeholder/400/320`,
          improvedDescription: suggestion.suggestedDescription
        })),
        productId: data.productId,
        productName: data.productName,
        returnReason: data.returnReason
      };
      
      return Response.json(transformedData);
    } catch (error) {
      console.error('Error fetching suggested actions:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }
  }