export default function PromoteLayout({ children }) {
  return (
    <div className="min-h-screen">
      <div className="ml-16 md:ml-60 pt-6 pb-6 pr-6 overflow-auto">
        <main className="animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
} 