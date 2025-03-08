export function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="google-footer py-4 w-full fixed bottom-0 left-0 right-0 z-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-b border-gray-200 pb-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">Return Analytics powered by Google AI</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <a href="#" className="text-sm">About</a>
              <a href="#" className="text-sm">Privacy</a>
              <a href="#" className="text-sm">Terms</a>
              <a href="#" className="text-sm">Help</a>
              <a href="#" className="text-sm">Feedback</a>
            </div>
          </div>
          <div className="pt-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2 flex items-center">
                <img src="/google.png" alt="Google" width="90rem" height="90rem" className="mr-2" />
                <img src="/gemini.png" alt="Gemini" width="80rem" height="80rem" className="mt-[-0.75rem] ml-0.5 mr-1.5" />
              </div>
              <span className="text-sm">ReturnX</span>
            </div>
            <div className="text-sm">© {currentYear} ReturnX</div>
          </div>
        </div>
      </footer>
    );
  }