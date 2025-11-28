import React, { useState, useEffect, useRef } from 'react';
import { DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const defaultTextColor = 'text-gray-300';
  const hoverTextColor = 'text-white';
  const textSizeClass = 'text-sm';

  return (
    <a href={href} className={`group relative inline-block overflow-hidden h-5 flex items-center ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2">
        <span className={defaultTextColor}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </a>
  );
};

export function LucroFacilNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <a href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
      <div className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] w-8 h-8 rounded-xl flex items-center justify-center shadow-lg">
        <DollarSign className="w-5 h-5 text-white" />
      </div>
      <span className="text-white font-bold text-lg hidden sm:block">LucroFácil</span>
    </a>
  );

  const navLinksData = [
    { label: 'Recursos', href: '#features' },
    { label: 'Preços', href: '#pricing' },
    { label: 'Depoimentos', href: '#testimonials' },
    { label: 'Blog', href: '/blog' },
  ];

  const loginButtonElement = (
    <Link 
      to="/auth"
      className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors duration-200 w-full sm:w-auto text-center inline-block"
    >
      Entrar
    </Link>
  );

  const signupButtonElement = (
    <div className="relative group w-full sm:w-auto">
      <div className="absolute inset-0 -m-2 rounded-full
                      hidden sm:block
                      bg-[#10B981]
                      opacity-40 filter blur-lg pointer-events-none
                      transition-all duration-300 ease-out
                      group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"></div>
      <Link 
        to="/auth"
        className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full hover:from-[#059669] hover:to-[#047857] transition-all duration-200 w-full sm:w-auto inline-block text-center"
      >
        Começar Grátis
      </Link>
    </div>
  );

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50
                        flex flex-col items-center justify-center
                        px-6 py-3 backdrop-blur-sm
                        ${headerShapeClass}
                        border border-[#333] bg-[#1f1f1f57]
                        w-[calc(100%-2rem)] sm:w-auto sm:max-w-5xl
                        transition-[border-radius] duration-0 ease-in-out`}>

      <div className="flex items-center justify-between w-full gap-6">
        <div className="flex items-center flex-shrink-0">
          {logoElement}
        </div>

        <nav className="hidden sm:flex items-center justify-center flex-1 gap-6 text-sm">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
          {loginButtonElement}
          {signupButtonElement}
        </div>

        <button className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none" onClick={toggleMenu} aria-label={isOpen ? 'Fechar Menu' : 'Abrir Menu'}>
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>

      <div className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                        ${isOpen ? 'max-h-[1000px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link) => (
            <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors w-full text-center">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-4 w-full">
          {loginButtonElement}
          {signupButtonElement}
        </div>
      </div>
    </header>
  );
}
