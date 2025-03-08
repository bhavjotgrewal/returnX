'use client';

import { useState } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker,
  ZoomableGroup
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

// Direct link to a Canada GeoJSON
const geoUrl = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson";

export function ReturnLocations({ data }) {
  // Top cities with their coordinates
  const cities = [
    { name: "Toronto", coordinates: [-79.3832, 43.6532], value: 245 },
    { name: "Montreal", coordinates: [-73.5673, 45.5017], value: 187 },
    { name: "Vancouver", coordinates: [-123.1207, 49.2827], value: 170 },
    { name: "Calgary", coordinates: [-114.0719, 51.0447], value: 132 },
    { name: "Halifax", coordinates: [-63.5724, 44.6488], value: 121 }
  ];

  // Create color scale
  const colorScale = scaleLinear()
    .domain([0, 250])
    .range(["#e9d5ff", "#7e22ce"]);
  
  // Calculate circle size based on value
  const getMarkerSize = (value) => {
    const min = 4;
    const max = 12;
    const maxValue = 245; // Highest value in our dataset
    return min + (value / maxValue) * (max - min);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm h-full google-card" style={{ height: '100%' }}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Top Return Locations</h2>
      
      <div className="h-full" style={{ height: '100%' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 2000,
            center: [-76, 48]
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup>
            {/* Canada map */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#f3f4f6"
                    stroke="#d1d5db"
                    strokeWidth={0.5}
                  />
                ))
              }
            </Geographies>
            
            {/* City markers */}
            {cities.map(({ name, coordinates, value }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle 
                  r={getMarkerSize(value)} 
                  fill="#4e8de7" 
                  stroke="#ffffff" 
                  strokeWidth={1} 
                />
                <text
                  textAnchor="middle"
                  y={getMarkerSize(value) + 8}
                  style={{ 
                    fontFamily: "system-ui",
                    fontSize: "8px",
                    fontWeight: "bold",
                    fill: "#333333",
                    pointerEvents: "none"
                  }}
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
        
        {/* Legend */}
        <div className="absolute bottom-0 right-0 bg-white p-2 rounded-md shadow-sm">
          <div className="flex items-center text-sm">
            <div className="w-24 h-3 bg-gradient-to-r from-purple-100 to-purple-800 mr-2"></div>
            <span className="text-xs text-gray-600">Returns Volume</span>
          </div>
        </div>
      </div>
    </div>
  );
}