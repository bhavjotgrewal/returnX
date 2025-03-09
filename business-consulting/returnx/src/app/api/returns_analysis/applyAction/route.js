import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Extract the necessary data
    const { id, description } = body;
    
    // Call your backend endpoint
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
    const response = await fetch(`${API_URL}/api/returns_analysis/applyAction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        description
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to apply changes');
    }
    
    const result = await response.json();
    
    // Return success response
    return NextResponse.json({ 
      success: true,
      message: 'Product description updated successfully',
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error applying changes:', error);
    
    // Return error response
    return NextResponse.json(
      { success: false, message: 'Failed to apply changes', error: error.message },
      { status: 500 }
    );
  }
}