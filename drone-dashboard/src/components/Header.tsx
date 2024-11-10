import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-indigo-600 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Drone Icon */}
              <svg 
                className="h-8 w-8 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 12h14M5 12a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v3a2 2 0 01-2 2M5 12a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-2-2"
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 4v16m0-16l-4 4m4-4l4 4"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-white">Drone Deploy Q&A</h1>
              <p className="text-sm text-indigo-100">AI-Powered Drone Data Analysis</p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a 
                href="#" 
                className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Home
              </a>
              <a 
                href="#" 
                className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Documentation
              </a>
              <a 
                href="#" 
                className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                About
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-100 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-150 ease-in-out"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg 
                  className="block h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              ) : (
                <svg 
                  className="block h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a 
                href="#" 
                className="text-white hover:text-indigo-200 hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                Home
              </a>
              <a 
                href="#" 
                className="text-white hover:text-indigo-200 hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                Documentation
              </a>
              <a 
                href="#" 
                className="text-white hover:text-indigo-200 hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                About
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;