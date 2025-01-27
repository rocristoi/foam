import React, { useEffect, useState } from "react";
import { CiPhone, CiLocationArrow1 } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaSquareJs, FaHtml5, FaCss3, FaPython, FaReact } from "react-icons/fa6";
import { IoLogoElectron } from "react-icons/io5";
import { ring2 } from 'ldrs'
import { useParams } from "react-router";
import errorAnim from './assets/error.webm'
import axios from "axios";
import apiUrl from "./config";
import Portfolio from "./Portfolio";
import Footer from "./Footer";



const RenderPortfolio = () => {
    ring2.register()
    const [data, setData] = useState()
    const { id, name } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true); 
            const response = await axios.get(`${apiUrl}/userPortfolio`, {
              params: { id, name },
            });
    
            if (response.status >= 200 && response.status < 300) {
              setData(response.data.data); 
              console.log(response.data.data)
            } else {
              throw new Error("Unexpected server response.");
            }
          } catch (err) {
            console.error("Error fetching portfolio:", err);
            setError(true);
          } finally {
            setLoading(false); 
          }
        };
    
        if (id && name) {
          fetchData(); 
        }
      }, [id, name]); 


      if(loading) {return (
        <div className='bg-gradient-to-b from-white to-teal-100 flex items-center justify-center w-screen h-screen '>
                <l-ring-2
                size="40"
                stroke="5"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8" 
                color="black" 
                ></l-ring-2>
        </div>
      )} else if(!error) {
        return(
            <div className='bg-gradient-to-b from-white to-teal-100'>
            <Portfolio name={data.name} image={data.image} title={data.title} about={data.about} interests={data.interests} projects={data.projects} contacts={data.contacts}/>
            <div className='bg-teal-100 '>
             <Footer />
             </div>
            </div>
        )
      } else {
        return(
            <div className='bg-gradient-to-b from-white to-teal-100 flex flex-col items-center justify-center w-screen h-screen'>
                                <video
                                    autoPlay
                                    muted
                                    playsInline
                                    className="transparent-video h-20 w-20"
                                >
                                    <source src={errorAnim} type="video/webm" />
                                    Your browser does not support the video tag.
                                </video>
                                <h1 className="text-xl font-custom text-black">404 | NOT FOUND</h1>
            </div>
        )
      }
};

export default RenderPortfolio;
