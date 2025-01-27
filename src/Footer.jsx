import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="text-center md:text-left">
          <p className="text-black font-custom lg:text-lg text-sm">
            Find out about me | <span className='font-extrabold'>An open source project</span>
          </p>
          <p className="text-black font-medium mt-1 lg:text-lg text-xs">
           <a href="https://github.com/rocristoi/foam" 
            target="_blank" 
            rel="noopener noreferrer" >Developed by <span className="text-red-500">@rocristoi</span>. Contribute to this project on GitHub.</a> 
          </p>
        </div>
        
        <div className="hidden md:block h-16 w-[2px] bg-black"></div>
        
        <nav className="flex flex-col items-center md:items-start gap-0">
          <a 
            href="https://cristoi.ro" 
            className="text-black font-bold text-md hover:underline">
            Developer's Website
          </a>
          <a 
            href="https://github.com/rocristoi/foam" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-black font-bold text-md hover:underline">
            Open Source Code
          </a>

        </nav>
      </div>
    </footer>
  );
};

export default Footer;
