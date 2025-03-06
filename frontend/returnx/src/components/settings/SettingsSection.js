"use client";

export default function SettingsSection({ title, children }) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6 w-full">
        <h2 className="text-lg font-medium mb-4">{title}</h2>
        {children}
      </div>
    );
  }
  