// Make sure to use named exports for the loader components
export function GoogleLoader() {
  return (
    <div className="flex flex-col items-center">
      <div className="google-loader mb-4"></div>
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  );
}

export function GeminiLoader() {
    return (
      <div className="flex flex-col items-center">
        <div className="gemini-loader mb-4">
          <img src="/star.gif" alt="Gemini loading" width="40" height="40" />
        </div>
        <p className="text-sm text-gray-500">Processing with Gemini...</p>
      </div>
    );
  }