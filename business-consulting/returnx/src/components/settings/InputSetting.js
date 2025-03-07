"use client";

export default function InputSetting({ title, description, value, onChange, type = "text" }) {
    return (
      <div className="py-3 border-b border-gray-100 last:border-0">
        <div className="mb-2">
          <h3 className="font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <input 
          type={type}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
        />
      </div>
    );
  }
  