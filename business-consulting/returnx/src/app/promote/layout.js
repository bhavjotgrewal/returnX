export default function PromoteLayout({ children }) {
  return (
    <div className="min-h-screen">
      <div className="ml-16 md:ml-60 pt-6 pb-6 pr-6 pl-6 overflow-hidden">
        <main className="animate-fade-in content-container">
          {children}
        </main>
      </div>
    </div>
  );
} 