import React from "react";
import './Portfolio.css'
import { CiPhone, CiLocationArrow1 } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaSquareJs, FaHtml5, FaCss3, FaPython, FaReact } from "react-icons/fa6";
import { IoLogoElectron } from "react-icons/io5";


const Portfolio = ({name, image,title, about, interests, projects, contacts}) => {

  return (
    <div className="min-h-screen  flex flex-col items-center py-8 px-4 ">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-6 space-y-6 border-beam rounded-xl">
        {/* Header Section */}
        <div className="flex items-center space-x-4">
          <img
            src={image}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md object-cover" 
          />
          <div>
            <h1 className="text-3xl font-bold text-teal-600">{name}</h1>
            <p className="text-teal-500 text-sm">{title}</p>
          </div>
        </div>

        {/* About Me Section */}
        <section>
          <h2 className="text-2xl font-semibold text-teal-600 mb-2">About Me</h2>
          <p className="text-gray-700 leading-relaxed">
           {about}
          </p>
        </section>

        {/* Interests Section */}
        <section>
          <h2 className="text-2xl font-semibold text-teal-600 mb-2">Interests</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {interests.map(interest => (
            <li>{interest}</li>
            ))}
          </ul>
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="text-2xl font-semibold text-teal-600 mb-2">Projects</h2>
          <ul className="space-y-4">
            {projects.map(project => (
            <li className="p-4 bg-teal-50 rounded-xl shadow-md">
              <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-teal-600">{project.name}</h3>
            <div className="flex flex-row gap-2">
            {project.techs.map((tech, index) => {
              if (['js', 'html', 'css', 'electron', 'python', 'react'].includes(tech)) {
                switch (tech) {
                  case 'js':
                    return <FaSquareJs color="black" key={index} />;
                  case 'html':
                    return <FaHtml5 color="black" key={index} />;
                  case 'css':
                    return <FaCss3 color="black" key={index} />;
                  case 'electron':
                    return <IoLogoElectron color="black" key={index} />;
                  case 'python':
                    return <FaPython color="black" key={index} />;
                  case 'react':
                    return <FaReact color="black" key={index} />;
                  default:
                    return null;
                }
              }
              return null;
            })}
            </div>
              </div>
            <p className="text-gray-700"> 
              {project.description}
            </p> 
          </li>
            ))}
          </ul>
        </section>
            {contacts != null && (
            <section>
            <h2 className="text-2xl font-semibold text-teal-600 mb-2">Contact</h2>
            <p className="text-gray-700">
              <ul>
              <ul>
              {Object.keys(contacts).map((contactMethod) => {
                if (contacts[contactMethod] != null) {
                  switch (contactMethod) {
                    case 'phone':
                      return (
                        <li key={contactMethod} className="flex flex-row items-center gap-2 text-black ">
                          <CiPhone />
                          <a href={`tel:${contacts.phone}`}>
                          {contacts.phone}
                          </a>
                        </li>
                      );
                    case 'email':
                      return (
                        <li key={contactMethod} className="flex flex-row items-center gap-2 text-black ">
                          <MdOutlineEmail />
                          <a href={`mailto:${contacts.email}`}>
                          {contacts.email}
                          </a>
                        </li>
                      );
                    case 'address':
                      return (
                        <li key={contactMethod} className="flex flex-row items-center gap-2 text-black ">
                          <CiLocationArrow1 />
                          <a href={`http://maps.google.com/?q=${encodeURIComponent(contacts.address)}`}>
                          {contacts.address}
                          </a>
                        </li>
                      );
                    default:
                      return null; 
                  }
                }
                return null; 
              })}
            </ul>
                
              </ul>
            </p>
            </section>
            )}
       
      </div>
    </div>
  );
};

export default Portfolio;
