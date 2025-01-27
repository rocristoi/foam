import { useState } from "react"
import SectionWrapper from "./hoc/SectionWrapper"
import { MdEdit } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { FaSquareJs, FaHtml5, FaCss3, FaPython, FaReact } from "react-icons/fa6";
import { IoLogoElectron } from "react-icons/io5";
import axios from "axios";
import errorAnim from './assets/error.webm'
import doneAnim from './assets/done.webm'
import { ring2 } from 'ldrs'
import apiUrl from "./config";


const Create = () => {
    ring2.register()
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [interests, setInterests] = useState([]);
    const [interestInput, setInterestInput] = useState();
    const [projects, setProjects] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([false,])
    

    const handleAddInterest = () => {
        if(interestInput == '') return;
        setInterests((prevInterests) => [...prevInterests, interestInput]);
        setInterestInput('')
    }

    const [projectName, setProjectName] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const handleBlur = () => setIsEditing(false);

    const [projectDescription, setProjectDescription] = useState()
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [newLink, setNewLink] = useState('')

    const [selectedTechs, setSelectedTechs] = useState([]);

    const handleSelectTech = (tech) => {
        if(selectedTechs.includes(tech)) {
            setSelectedTechs((prevTechs) => prevTechs.filter((prevTech) => prevTech !== tech));
        } else {
            setSelectedTechs((previousSelections) => [...previousSelections, tech]);
        }
    }

    const handleAddProject = () => {
        if(projectName == null || projectDescription == null ) return;
        setProjects((prevProjects) => [
            ...prevProjects,
            {
                name:projectName,
                description: projectDescription,
                techs: selectedTechs
            },
        ])
        setProjectDescription();
        setProjectName();
        setSelectedTechs([]);

    }


    const [values, setValues] = useState({
        phoneNumber: '',
        email: '',
        address: ''
    });

    const handleInputChange = (e, field) => {
        setValues((prev) => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const [about, setAbout] = useState({
        name: '',
        title: '',
        aboutme: '',
    })

    const handleAboutInputChange = (e, field) => {
        setAbout((prev) => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleCreateNewPortfolio = async () => {
        setLoading(true);
        setIsPopupVisible(true);
      
        if (!selectedFile) {
          alert("Please select a profile picture to upload.");
          setLoading(false);
          return;
        }
      
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("name", about.name);
        formData.append("title", about.title);
        formData.append("aboutme", about.aboutme);
        formData.append("interests", JSON.stringify(interests));
        formData.append("projects", JSON.stringify(projects));
      
        if (values.phoneNumber) formData.append("phone", values.phoneNumber);
        if (values.email) formData.append("email", values.email);
        if (values.address) formData.append("address", values.address);
      
        try {
          const response = await axios.post(`${apiUrl}/newPortfolio`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
          });
      
          if (response.status >= 200 && response.status < 300) {
            const { data } = response;
      
            if (data) {
              setNewLink(data);
            } else {
              throw new Error("Unexpected response data format.");
            }
          } else {
            throw new Error("Unexpected server response. Please try again later.");
          }
        } catch (err) {
          console.error("Error occurred:", err);
          const errorMessage =
            err.response && err.response.data && err.response.data.message
              ? err.response.data.message
              : "There seems to be a problem with the server. Please contact the website owner.";
          setError([true, errorMessage]);
        } finally {
          setLoading(false);
        }
      };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedFile(file);
          setUploadStatus(true); 
        }
      };
    

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-black font-custom text-2xl">Let's create your own portfolio</h1>
            <h2 className="text-xl font-extrabold text-black">We'll just need some info from you</h2>

            <div className="rounded-xl flex flex-col items-center justify-center gap-10 py-8 px-6 w-full bg-white mt-10 shadow-xl">
                <section className="flex flex-col items-center leading-5 ">
                    <h1 className="font-custom text-2xl text-teal-600">Miscellaneous</h1>
                    <div className="flex flex-wrap gap-14  mt-10">
                        <div className="flex flex-col gap-1 items-center">
                        <span className="text-black font-bold">What's your name?</span>
                        <div className="w-80 flex flex-row ">
                        <input type="text" onChange={(e) => handleAboutInputChange(e, 'name')} value={about.name} className="bg-teal-100 rounded-l-lg p-2 w-2/3 focus:outline-0 text-black font-medium" placeholder="John Doe" />
                        <div className="relative w-1/3">
                            <button
                            className="bg-teal-100 p-2 rounded-r-lg w-full text-black text-sm flex items-center justify-center font-bold"

                            >
                            {uploadStatus ? "Uploaded" : "Add Pic"}
                            </button>
                            <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        </div>
                        </div>
                        <div className="flex flex-col gap-1 items-center">
                        <span className="text-black font-bold">What's your title?</span>
                        <input type="text" onChange={(e) => handleAboutInputChange(e, 'title')} value={about.title} className="bg-teal-100 rounded-lg p-2 w-80 focus:outline-0 text-black font-medium" placeholder="CEO @ FOAM Tech Inc." />
                        </div>
                        <div className="flex flex-col gap-1 items-center">
                        <span className="text-black font-bold">Write a brief 'about me'</span>
                        <input type="text" onChange={(e) => handleAboutInputChange(e, 'aboutme')} value={about.aboutme} className="bg-teal-100 rounded-lg p-2 w-80 focus:outline-0 text-black font-medium" placeholder="Being the CEO of a company is great. I've always dreamed about becoming a CEO and now I am one." />
                        </div>
                    </div>

                </section>

                <section className="flex flex-col items-center leading-5 ">
                <div className="flex items-center space-x-2">
                <h1 className="font-custom text-2xl text-teal-600">Interests</h1>
                <div className="relative">
                    <button className="focus:outline-none group">
                        <span className="text-teal-600 text-lg font-bold">?</span>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white font-bold text-black text-sm rounded-lg shadow-lg p-3 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                         Make a list of your interests. To add one, enter it in the input below & press on <span className="text-teal-600 font-bold">+</span>
                        </div>
                    </button>
                        </div>
                    </div>    
       <div className="flex flex-wrap gap-10   mt-10">
                    {interests.map(interest => (
                        <span className="flex items-center justify-center text-black font-bold">
                            {interest}
                        </span>
                    ))}
                        <div className="flex flex-row items-center">
                        <input type="text" value={interestInput} onChange={(e) => setInterestInput(e.target.value)}  className="bg-teal-100 rounded-l-lg p-2 w-40 focus:outline-0 text-black font-medium placeholder-black" placeholder="UI/UX" />
                        <button className="bg-teal-100 p-2 px-4 rounded-r-lg font-extrabold text-black"
                        onClick={handleAddInterest}
                        >+</button>
                    </div>
                        
                    </div>
                </section>

                <section className="flex flex-col items-center leading-5 ">
                <div className="flex items-center space-x-2">
                <h1 className="font-custom text-2xl text-teal-600">Projects</h1>
                <div className="relative">
                    <button className="focus:outline-none group">
                        <span className="text-teal-600 text-lg font-bold">?</span>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black text-sm rounded-lg shadow-lg p-3 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <h3 className="font-bold text-black ">Make a list of your projects. To add one, enter info about it in the inputs below and click on <span className="text-teal-600">Add</span></h3></div>
                    </button>
                        </div>
                    </div>   
                    
                    <div className="flex flex-wrap gap-14 ">
                    <div className="flex flex-col shadow-xl p-4 bg-teal-100 rounded-lg mt-14">
                    <motion.div
                        className="relative w-80 flex flex-col gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex justify-between items-center gap-2">
                        {isEditing ? (
                            <motion.input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            onBlur={handleBlur}
                            className="border-none bg-transparent focus:outline-none focus:ring-0 text-black font-medium flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
                            autoFocus
                            initial={{ scale: 0.99, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            />
                        ) : (
                            <motion.span
                            onClick={() => setIsEditing(true)}
                            className="cursor-text text-black font-medium flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
                            initial={{ color: 'rgb(0, 0, 0)' }}
                            whileHover={{ color: 'rgb(0, 137, 123)' }}
                            >
                            {projectName || "Add a title..."}
                            </motion.span>
                        )}

                        <motion.span
                            onClick={() => setIsEditing(true)}
                            className="text-gray-400 cursor-pointer p-1"
                            whileHover={{ scale: 1.2, color: "#000" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MdEdit />
                        </motion.span>
                        </div>

                        <div className="flex justify-between items-start gap-2">
                        {isEditingDescription ? (
                            <motion.textarea
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            onBlur={() => setIsEditingDescription(false)}
                            className="border-none bg-transparent focus:outline-none focus:ring-0 text-black font-medium resize-none flex-grow h-20 overflow-y-auto break-words max-h-full"
                            autoFocus
                            initial={{ scale: 0.99, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            />
                        ) : (
                            <motion.p
                            onClick={() => setIsEditingDescription(true)}
                            className="cursor-text text-black font-medium flex-grow overflow-hidden break-words min-h-20"
                            initial={{ color: 'rgb(0, 0, 0)' }}
                            whileHover={{ color: 'rgb(0, 137, 123)' }}
                            >
                            {projectDescription || "Add a description..."}
                            </motion.p>
                        )}

                        <motion.span
                            onClick={() => setIsEditingDescription(true)}
                            className="text-gray-400 cursor-pointer p-1"
                            whileHover={{ scale: 1.2, color: "#000" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MdEdit />
                        </motion.span>
                        </div>
                    </motion.div>


                    <div className="flex flex-wrap gap-3 mt-4 justify-center items-center">
                    <motion.div
                        className="cursor-pointer"
                        animate={{ color: selectedTechs && selectedTechs.includes('js') ? 'rgb(0, 137, 123)' : 'rgb(0, 0, 0)' }}
                        whileHover={{ color: 'rgb(0, 137, 123)' }}
                        transition={{ duration: 0.1 }}
                        onClick={() => handleSelectTech('js')}
                    >
                        <FaSquareJs size='20px'/>
                    </motion.div>
                    <motion.div
                        className="cursor-pointer"
                        animate={{ color: selectedTechs && selectedTechs.includes('html') ? 'rgb(0, 137, 123)' : 'rgb(0, 0, 0)' }}
                        whileHover={{ color: 'rgb(0, 137, 123)' }}
                        transition={{ duration: 0.1 }}
                        onClick={() => handleSelectTech('html')}
                    >
                        <FaHtml5 size='20px'/>
                    </motion.div> 
                    <motion.div
                        className="cursor-pointer"
                        animate={{ color: selectedTechs && selectedTechs.includes('css') ? 'rgb(0, 137, 123)' : 'rgb(0, 0, 0)' }}
                        whileHover={{ color: 'rgb(0, 137, 123)' }}
                        transition={{ duration: 0.1 }}
                        onClick={() => handleSelectTech('css')}
                    >
                        <FaCss3 size='20px'/>
                    </motion.div> 
                    <motion.div
                        className="cursor-pointer"
                        animate={{ color: selectedTechs && selectedTechs.includes('python') ? 'rgb(0, 137, 123)' : 'rgb(0, 0, 0)' }}
                        whileHover={{ color: 'rgb(0, 137, 123)' }}
                        transition={{ duration: 0.1 }}
                        onClick={() => handleSelectTech('python')}
                    >
                        <FaPython size='20px'/>
                    </motion.div> 
                    <motion.div
                        className="cursor-pointer"
                        animate={{ color: selectedTechs && selectedTechs.includes('react') ? 'rgb(0, 137, 123)' : 'rgb(0, 0, 0)' }}
                        whileHover={{ color: 'rgb(0, 137, 123)' }}
                        transition={{ duration: 0.1 }}
                        onClick={() => handleSelectTech('react')}
                    >
                        <FaReact size='20px'/>
                    </motion.div> 
                    <motion.div
                        className="cursor-pointer"
                        animate={{ color: selectedTechs && selectedTechs.includes('electron') ? 'rgb(0, 137, 123)' : 'rgb(0, 0, 0)' }}
                        whileHover={{ color: 'rgb(0, 137, 123)' }}
                        transition={{ duration: 0.1 }}
                        onClick={() => handleSelectTech('electron')}
                    >
                        <IoLogoElectron size='20px'/>
                    </motion.div>
                </div>


                        <button className=" mt-6 flex items-center justify-center bg-teal-600 p-2  rounded-lg hover:text-gray-200 transition"
                        onClick={handleAddProject}
                        >Add</button>

                    </div>
                    {projects.length > 0 && (
                                            <div className="flex flex-wrap items-center">
                                            {projects.map(project => (
                                                <div className="bg-white shadow-xl rounded-lg p-8 flex flex-col w-60 items-center text-center justify-center">
                                                    <h1 className="font-bold text-lg text-black break-words w-full">{project.name}</h1>
                                                    <span className="font-medium text-black break-words w-full">{project.description}</span>
                                                    <div className="flex flex-row gap-2 items-center mt-4">
                                                    {project.techs?.map((tech, index) => {
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
                                            ))}
                                            </div>
                        
                    )}


                    </div>
                </section>

                <section className="flex flex-col items-center leading-5 mt-10">
                <div className="flex items-center space-x-2">
                <h1 className="font-custom text-2xl text-teal-600">Contacts</h1>
                <div className="relative">
                    <button className="focus:outline-none group">
                        <span className="text-teal-600 text-lg font-bold">?</span>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black text-sm rounded-lg shadow-lg p-3 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <h3 className="font-bold text-black">How can people reach out to you?</h3>
                        </div>
                    </button>
                        </div>
                    </div>   

                    <div className="flex gap-10 w-full mt-6">
                            <div className="flex flex-col w-full">
                                <label className="text-black font-medium mb-2" htmlFor="phone">Phone Number</label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={values.phoneNumber}
                                    onChange={(e) => handleInputChange(e, 'phoneNumber')}
                                    className="bg-teal-100 rounded-lg p-2 w-80 focus:outline-0 text-black font-medium"
                                    placeholder="Enter phone number"
                                />
                            </div>
                            
                            {/* Email */}
                            <div className="flex flex-col w-full">
                                <label className="text-black font-medium mb-2" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={values.email}
                                    onChange={(e) => handleInputChange(e, 'email')}
                                    className="bg-teal-100 rounded-lg p-2 w-80 focus:outline-0 text-black font-medium"
                                    placeholder="Enter email"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="text-black font-medium mb-2" htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={values.address}
                                    onChange={(e) => handleInputChange(e, 'address')}
                                    className="bg-teal-100 rounded-lg p-2 w-80 focus:outline-0 text-black font-medium"
                                    placeholder="Enter address"
                                />
                            </div>
                        </div>
                </section>

                <div className="mt-10 flex w-full items-center justify-center">
                    {about.name != (null||'') && about.title  != (null||'') && about.aboutme != (null||'')  ? (
                    <button className={`px-4 py-2  rounded-xl text-lg font-bold cursor-pointer bg-teal-600 `}
                    onClick={handleCreateNewPortfolio}
                    >Submit</button>
                    ) : (
                    <button className={`px-4 py-2  rounded-xl text-lg font-bold cursor-not-allowed bg-gray-400`}
                    onClick={handleCreateNewPortfolio}
                    >Submit</button>
                    )}
                    
                </div>

            </div>
            <AnimatePresence>
      {isPopupVisible && (

      <motion.div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center "
            initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
            animate={{ backdropFilter: "blur(10px)", opacity: 1 }}
            exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
            transition={{ duration: 0.3 }}
          >     
          {loading && (
            <motion.div
            className="bg-teal-600 rounded-xl text-center w-96 max-w-lg shadow-lg h-[250px]"
            layout
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            >
                <div className="w-full h-3 flex justify-end">
                    <a className="p-4 cursor-pointer" onClick={()=>setIsPopupVisible(false)}>
                    <span className="text-white font-black select-none">✕</span>
                    </a>
                </div>   
            <div className="p-8 flex flex-col items-center justify-center">
            <l-ring-2
                size="40"
                stroke="5"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8" 
                color="white" 
                ></l-ring-2>
            <span className="font-bold mt-4">Uploading your data</span>
            <span className="text-sm">This usually doesn't take a lot of time, it depends on your internet connection. If you have issues, <a href='mailto:cristi@cristoi.ro' className="underline" >contact the owner.</a></span>

            </div>

        </motion.div>
          )}
          {!loading && error[0] ? (
                <motion.div
                className="bg-teal-600 rounded-xl text-center w-96 max-w-lg shadow-lg h-[250px]"
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                >
                    <div className="w-full h-3 flex justify-end">
                        <a className="p-4 cursor-pointer" onClick={()=>setIsPopupVisible(false)}>
                        <span className="text-white font-black select-none">✕</span>
                        </a>
                    </div>   
                <div className="p-8 flex flex-col items-center justify-center">
                <video
                    autoPlay
                    muted
                    playsInline
                    className="transparent-video h-20 w-20"
                >
                    <source src={errorAnim} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
                <span className="font-bold ">Sorry, an error occured</span>
                <span className="text-sm">Something happened on our side, we're sorry. If this error persists, <a href='mailto:cristi@cristoi.ro' className="underline" >contact the owner.</a></span>

                </div>

            </motion.div>
          ) : !loading && !error[0] && (
            <motion.div
            className="bg-teal-600 rounded-xl text-center w-96 max-w-lg shadow-lg h-[250px]"
            layout
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            >
                <div className="w-full h-3 flex justify-end">
                    <a className="p-4 cursor-pointer" onClick={()=>setIsPopupVisible(false)}>
                    <span className="text-white font-black select-none">✕</span>
                    </a>
                </div>   
            <div className="p-8 flex flex-col items-center justify-center">
            <video
                autoPlay
                muted
                playsInline
                className="transparent-video h-20 w-20 "
            >
                <source src={doneAnim} type="video/webm" />
                Your browser does not support the video tag.
            </video>
            <span className="font-bold ">Uploaded</span>
            <span className="text-sm">Your portfolio was uploaded and can be accessed <a href={newLink} className="underline" >here.</a></span>

            </div>

        </motion.div>
          )}

        </motion.div>
      )}
      </AnimatePresence>
        </div>
    )
}
export default SectionWrapper(Create, 'create')