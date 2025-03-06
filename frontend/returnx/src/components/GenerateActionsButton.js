export function GenerateActionsButton() {
    return (
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 shadow-md">
        <span>Generate Actions</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4V20M20 12L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    );
  }
  