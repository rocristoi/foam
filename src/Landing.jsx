import SectionWrapper from "./hoc/SectionWrapper"
import { styles } from "./styles"
import { useState, useEffect } from "react";
import UnderlineText from "./UnderlineText";
import Portfolio from './Portfolio'

const Landing = () => {

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

   
    return(
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-col items-center mb-10 ">
        <div className="lg:text-left">
        <h1 className="text-2xl lg:mb-0 mb-2 font-custom text-black">Create your portfolio in <UnderlineText text='5 minutes'/></h1>
        <h3 className="text-xl font-bold text-black mb-10">Need a quick portfolio showcasing your work? We've got you covered.</h3>
        </div>
        <Portfolio 
        image='https://i.imgur.com/T6uhkaB.png'
        name='Your Name' 
        title='Full-Stack Developer'
        about='Passionate developer with a love for creating intuitive and engaging digital experiences. Skilled in React, JavaScript, and backend technologies.'
        interests={['Web Development', 'Open Source Contributions', 'UI/UX Design', 'Machine Learning']}
        projects={[
         {
          name: 'Project 1',
          description: 'Description of your project, its purpose, and the technologies used.',
          techs: ['js','html','css'] 
         },
         {
          name: 'Project 2',
          description: 'Another project description with highlights of key features.',
          techs: ['react','electron','python'] 
         }
        ]} 
        contacts={{
          phone: '555-555-555',
          email: 'cristi@cristoi.ro',
          address: '123 Church Street, CA'
        }}/>
      </div>
      
    </div>
    )
}

export default SectionWrapper(Landing, "landing")