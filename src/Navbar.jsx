import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import navLogo from './assets/logo_small.png';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const [hasScrolledPast, setHasScrolledPast] = useState(false);
    const breakpoint = 10;
    const Navigate =useNavigate();
      const [isMobile, setIsMobile] = useState(false);

      useEffect(() => {
        const checkMobile = () => {
          if (window.innerWidth <= 768) {
            setIsMobile(true); 
          } else {
            setIsMobile(false);
          }
        };
    
        checkMobile();
    
        window.addEventListener('resize', checkMobile);
    
        return () => {
          window.removeEventListener('resize', checkMobile);
        };
      }, []); 
      
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > breakpoint) {
            setHasScrolledPast(true);
          } else {
            setHasScrolledPast(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);



      if(isMobile) {
        return (
          <motion.nav className={"transition-all w-full flex flex-row justify-center items-center items-center h-24 fixed top-0 z-50 px-10"}
          style={{
            backgroundColor: hasScrolledPast ? 'rgb(204 251 241)' : 'transparent', 
          }}
          transition={{
            backgroundColor: { duration: 0.5, ease: 'easeInOut' }, 
          }}
          >
              <div className='flex flex-row items-center justify-between w-[1200px]'>
          <div className="flex flex-row items-center">
            <a href="/">
              <img
              src={navLogo}
              alt="logo"
              className="w-20 h-20 object-contain"
              />
            </a>
          </div>
          <motion.button className='py-2 px-3 rounded-xl font-custom bg-teal-100 text-xs text-black'
                       style={{
                        backgroundColor: hasScrolledPast ? 'rgb(255,255,255)' : 'rgb(204 251 241)'
                       }}
                       transition={{
                        backgroundColor: { duration: 0.5, ease: 'easeInOut' }, 
                        scale: {duration: 0.1}
                      }}
                      whileHover={{scale: 1.05}}
                      onClick={() => Navigate('/create')}
                       >Create yours</motion.button>

                      </div>
                      </motion.nav>
        )
      } else {
        return (
          <motion.nav className={"transition-all w-full flex flex-row justify-center items-center items-center h-24 fixed top-0 z-50"}
          style={{
            backgroundColor: hasScrolledPast ? 'rgb(204 251 241)' : 'transparent', 
          }}
          transition={{
            backgroundColor: { duration: 0.5, ease: 'easeInOut' }, 
          }}
          >
              <div className='flex flex-row items-center justify-between w-[1200px]'>
          <div className="flex flex-row items-center">
          <a href="/">
              <img
              src={navLogo}
              alt="logo"
              className="w-20 h-20 object-contain"
              />
        </a>
          </div>
                       <motion.button className='py-2 px-4 rounded-xl font-custom bg-teal-100 text-black'
                       style={{
                        backgroundColor: hasScrolledPast ? 'rgb(255,255,255)' : 'rgb(204 251 241)'
                       }}
                       transition={{
                        backgroundColor: { duration: 0.5, ease: 'easeInOut' }, 
                        scale: {duration: 0.1}
                      }}
                      whileHover={{scale: 1.05}}
                      onClick={() => Navigate('/create')}
                       >Create yours</motion.button>
                      </div>
                      </motion.nav>


)
      }
 
}

export default Navbar