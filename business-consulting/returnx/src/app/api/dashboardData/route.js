import { NextResponse } from 'next/server';

export async function GET() {
  // This is mock data that would eventually come from your API
  const data = {
    chartData: generateChartData(),
    stats: [
      {
        title: 'Available to withdraw',
        value: '$1,567.99',
        subValue: 'Wed, Jul 20',
        change: '10.0%',
        isPositive: true,
      },
      {
        title: 'Today Revenue',
        value: '$2,868.99',
        subValue: '143 Orders',
        change: '3.6%',
        isPositive: false,
      },
      {
        title: 'Today Sessions',
        value: '156k',
        subValue: '32k Visitors',
        change: '3.2%',
        isPositive: true,
      },
      {
        title: 'Total Returns',
        value: '3,422',
        subValue: '$20.87 Average Return',
        change: '8.3%',
        isPositive: true,
      },
    ],
    topReturnedProducts: [
      { 
        name: 'Sigma Sweater - Beige',
        details: '23% of returns' 
      },
      { 
        name: 'Happy Hoodie - Grey',
        details: '18% of returns' 
      },
      { 
        name: 'Sheepish Hoodie - White',
        details: '15% of returns' 
      },
      { 
        name: "Tommy's T-shirt - Ash Grey",
        details: '12% of returns' 
      },
    ],
    suggestedActions: [
      {
        id: 1,
        title: 'Revise Size Guide of Material Hoodie',
        description: "Looks like this product is returned frequently because it is 'too small'. Changing the size guide to better reflect actual sizes could reduce returns by up to 48%.",
        image: "/api/placeholder/400/320",
      },
      {
        id: 2,
        title: 'Add More Product Photos for Sigma Sweater',
        description: "Customer feedback indicates that the color appears different in person than online. Adding more detailed photos in natural lighting could reduce color-related returns by 35%.",
        image: "/api/placeholder/400/320",
      },
      {
        id: 3,
        title: 'Update Product Description for Happy Hoodie',
        description: "17% of returns mention 'material quality' as a reason. Update the product description to better describe the fabric blend and weight to set accurate customer expectations.",
        image: "/api/placeholder/400/320",
      }
    ],
    returnReasons: [
      { name: "Wrong Size", value: 534 },
      { name: "Damaged Item", value: 321 },
      { name: "Changed Mind", value: 287 },
      { name: "Incorrect Item", value: 142 },
      { name: "Quality Issues", value: 236 }
    ],
    returnLocations: [
      { name: "New York, NY", value: 245 },
      { name: "Los Angeles, CA", value: 187 },
      { name: "Chicago, IL", value: 156 },
      { name: "Houston, TX", value: 132 },
      { name: "Miami, FL", value: 121 }
    ],
    aiInsights: [
      {
        id: 1,
        content: "Returns for Happy Hoodie peak on Mondays, suggesting weekend purchases may be impulsive. Consider adding a 'cooling off' period with special incentives to keep the item.",
        confidence: 4
      },
      {
        id: 2,
        content: "Size-related returns are 32% higher for first-time customers compared to returning customers. Adding a first-purchase size guide popup could reduce these returns.",
        confidence: 5
      },
      {
        id: 3,
        content: "85% of customers who return 'Material Hoodie' mention it 'looks different in person' in feedback. Additional fabric close-up photos could help set better expectations.",
        confidence: 5
      },
      {
        id: 4,
        content: "Customers who view size guides spend 40% longer on product pages and have 28% fewer size-related returns. Consider making size guides more prominent.",
        confidence: 3
      }
    ],
    qcItems: [
      {
        id: 1,
        productName: "Sigma Sweater - Beige",
        customerName: "Michael Thompson",
        orderId: "ORD-7825",
        status: "pending",
        timestamp: "10 mins ago",
        image: "/api/placeholder/48/48"
      },
      {
        id: 2,
        productName: "Happy Hoodie - Grey",
        customerName: "Sarah Johnson",
        orderId: "ORD-7823",
        status: "approved",
        timestamp: "24 mins ago",
        image: "/api/placeholder/48/48"
      },
      {
        id: 3,
        productName: "Tommy's T-shirt - Ash Grey",
        customerName: "David Rodriguez",
        orderId: "ORD-7821",
        status: "rejected",
        timestamp: "45 mins ago",
        image: "/api/placeholder/48/48"
      },
      {
        id: 4,
        productName: "Sheepish Hoodie - White",
        customerName: "Emily Chen",
        orderId: "ORD-7820",
        status: "pending",
        timestamp: "1 hour ago",
        image: "/api/placeholder/48/48"
      },
      {
        id: 5,
        productName: "Denim Jacket - Washed Blue",
        customerName: "James Wilson",
        orderId: "ORD-7818",
        status: "approved",
        timestamp: "1 hour ago",
        image: "/api/placeholder/48/48"
      },
      {
        id: 6,
        productName: "Casual Pants - Black",
        customerName: "Lisa Garcia",
        orderId: "ORD-7815",
        status: "pending",
        timestamp: "2 hours ago",
        image: "/api/placeholder/48/48"
      },
      {
        id: 7,
        productName: "Summer Dress - Floral",
        customerName: "Aisha Patel",
        orderId: "ORD-7814",
        status: "rejected",
        timestamp: "3 hours ago",
        image: "/api/placeholder/48/48"
      }
    ],
    customerSentiment: {
      positive: 1854,
      neutral: 987,
      negative: 581,
      previousPositive: 1724,
      previousNeutral: 1012,
      previousNegative: 648
    }
  };

  // Simulate network delay to make the app feel more realistic
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(data);
}

function generateChartData() {
  const days = 15;
  const data = [];
  
  for (let i = 10; i < 10 + days; i++) {
    // Create a random value between 30000 and 60000
    const baseValue = 30000 + Math.floor(Math.random() * 30000);
    
    data.push({
      day: i,
      date: `March ${i}, 2025`,
      value: baseValue
    });
  }
  
  return data;
}