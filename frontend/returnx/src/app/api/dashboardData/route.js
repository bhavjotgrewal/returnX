import { NextResponse } from "next/server";

export async function GET() {
  // Return the same mock data you had before
  return NextResponse.json({
    stats: {
        availableBalance: {
          value: 1567.99,
          change: 8.2,
          isPositive: true,
          label: 'from last week',
          date: 'Wed, Jul 20',
        },
        todayRevenue: {
          value: 2868.99,
          change: -4.5,
          isPositive: false,
          label: 'from yesterday',
          orders: 142,
        },
        dailySessions: {
          value: 156000,
          change: 9.3,
          isPositive: true,
          label: 'from yesterday',
          visitors: 256,
        },
        totalReturns: {
          value: 3422,
          change: 1.2,
          isPositive: false, // Using red for returns increasing
          label: 'from last month',
          avgReturn: 30,
        },
      },
      topReturnedProducts: [
        { id: 1, name: 'Mens Hoodie - Gray', returnCount: 42 },
        { id: 2, name: 'Sweater Hoodie - White', returnCount: 38 },
        { id: 3, name: "Tommy's T-shirt - 4XL Size", returnCount: 29 },
      ],
      suggestedActions: [
        {
          id: 1,
          number: 1,
          title: 'Revise Size Guide of Material Hoodie',
          image: '/api/placeholder/400/320',
          description: 'Looks like this product is returned frequently because it is "too small". Changing the size guide to... Runs small',
        },
        {
          id: 2,
          number: 2,
          title: 'Change Colour of Sigma Sweater',
          image: '/api/placeholder/400/320',
          description: 'Looks like this product is returned frequently because it is "too small". Changing the size guide to... Runs small',
        },
        {
          id: 3,
          number: 3,
          title: 'Change Colour of Sigma Sweater',
          image: '/api/placeholder/400/320',
          description: 'Looks like this product is returned frequently because it is "too small". Changing the color guide to... Runs small',
        },
        {
          id: 4,
          number: 4,
          title: 'Change Colour of Sigma Sweater',
          image: '/api/placeholder/400/320',
          description: 'Looks like this product is returned frequently because it is "too small". Changing the color guide to... Runs small',
        },
      ],
      chartData: [
        { day: 1, value: 40 },
        { day: 5, value: 50 },
        { day: 10, value: 70 },
        { day: 15, value: 60 },
        { day: 20, value: 90 },
        { day: 25, value: 75 },
        { day: 30, value: 80 },
      ],
  });
}