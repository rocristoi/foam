import { BrowserRouter, Route, Routes, useParams  } from 'react-router'
import Landing from './Landing'
import Navbar from './Navbar'
import Footer from './Footer'
import Create from './Create'
import RenderPortfolio from './RenderPortfolio'

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <div className={` w-full h-full `}>
              <div className='bg-gradient-to-b from-white to-teal-100 '>
            <Navbar/>
            <Landing/>

             </div>
             <div className='bg-teal-100 '>
             <Footer />
             </div>
            </div>
            }/>
            <Route path='/create' element={
            <div className={` w-full h-full `}>
              <div className='bg-gradient-to-b from-white to-teal-100 '>
            <Navbar/>
            <Create/>

             </div>
             <div className='bg-teal-100 '>
             <Footer />
             </div>
            </div>
            }/>

             <Route path='/:id/:name' element={
            <div className={` w-full h-full `}>
              <RenderPortfolio />
            </div>
            }/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
