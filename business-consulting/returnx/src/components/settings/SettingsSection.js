export default function SettingsSection({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 google-card w-full">
      <h2 className="text-lg font-medium text-gray-800 mb-4">{title}</h2>
      <div className="space-y-6 w-full">
        {children}
      </div>
    </div>
  );
}