import { useState, useEffect } from 'react';
import axios from 'axios';
import { BsSearch } from "react-icons/bs";
//BsSearch
function App() {
  //search api
  ///users/:username
  //https://api.unsplash.com/search/photos?query=fire&per_page=30&orientation=portrait&page=1&client_id=3-slli4ErZRcen476eiQy0yNuRmV_7h9upDL4Onga6U
  //https://api.unsplash.com/users/:username/supergios&client_id=3-slli4ErZRcen476eiQy0yNuRmV_7h9upDL4Onga6U

  const [data, SetData] = useState([]);
  const [search, Setsearch] = useState('')
  const [Searchdata, Setsearchdata] = useState([]);
  const [apipicture, Setapipictue] = useState("");
  const [apilocation, Setapilocation] = useState("")
  const [apiname, Setapiname] = useState("");
  const [open, Setopen] = useState(false)
  useEffect(()=>{
    let url = 'https://api.unsplash.com/photos/?client_id=3-slli4ErZRcen476eiQy0yNuRmV_7h9upDL4Onga6U';
    axios.get(url, {
  }).then(res=>{
    SetData(res.data)
       })

  },[])

  const handleSearch=(e)=>{
    Setsearch(e.target.value)
    let url = `https://api.unsplash.com/search/photos?query=${e.target.value}&per_page=10&orientation=portrait&page=1&client_id=3-slli4ErZRcen476eiQy0yNuRmV_7h9upDL4Onga6U`;
    axios.get(url, {
  }).then(res=>{
    Setsearchdata(res.data.results)
       })


  }

  const handleOpen = (picture, location, person)=>{
    Setapipictue(picture)
    Setapilocation(location)
    Setapiname(person)
    Setopen(true)
  }
  const handleCloseView = ()=>{
    Setopen(false)
    Setapipictue("")
    Setapilocation("")
  }

  return (
    <div className="w-full">

      <article className='bg-gray-400 px-2 w-full  flex   items-center justify-center  py-14'>
    
         <div className='flex flex-row items-center  w-2/3  rounded-md'>
           <BsSearch className="pointer-events-none w-1/12 text-black text-md h-8 bg-white  rounded-l-md"/>
           <input type="text" value={search} onChange={(e)=>handleSearch(e)} name="search"  className='w-11/12 h-8  rounded-r-md  outline-none border-none' placeholder='search for photo...'/>
         </div>
           
      </article>

         <div className='w-3/4 m-auto  absolute   top-32 left-36 grid grid-cols-3 place-content-center  gap-5'>

           {Searchdata.length > 0? 
           Searchdata.map((item, index)=>{
          
            return <article className='  rounded-md  relative' key={index} onClick={()=>handleOpen(item.urls.regular, item.user.location, item.user.name)}>
                  <img src={item.urls.small} className="rounded-sm" />
              
                 <span className='flex flex-col items-center w-full absolute   top-44'>
                  <h2 className='text-lg capitalize text-white'>{item.user.name}</h2>
                  <h2 className='text-md capitalize text-white'>{item.user.location}</h2>
                 </span>
            </article>
          }):data.map((item, index)=>{
             return <article className='  rounded-md  relative' key={index} onClick={()=>handleOpen(item.urls.regular, item.user.location, item.user.name)}>
                   <img src={item.urls.small} className="rounded-sm" />
               
                  <span className='flex flex-col items-center w-full absolute   top-44'>
                   <h2 className='text-lg capitalize text-white'>{item.user.name}</h2>
                   <h2 className='text-md capitalize text-white'>{item.user.location}</h2>
                  </span>
             </article>
           })}
              
             
         </div>

          
    <section className={open?"z-40  flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10 fixed":"hidden"} >
                  
                  <div className="w-3/4  bg-white py-4 rounded-md ">
                     <article className="w-full px-3">
                         <label className="float-right">
                         <button className="rounded-full h-6 w-6 flex items-center justify-center bg-purple-600 text-white text-xs" onClick={()=>handleCloseView()} >x</button>
                         </label>
                     </article>
                   
                     <div className="w-full  h-[32rem]  mt-5 grid place-content-center font-semibold text-xl">
                          <img src={apipicture} className=" w-full   h-[32rem]  object-cover " /> 
                     </div>
                     <div className='flex flex-col items-center w-1/2  m-auto text-left'>
                      <h2 className='text-left font-normal font-sans w-full px-4'>{apiname}</h2>
                      <h2 className='text-left font-normal font-sans w-full px-4'>{apilocation}</h2>
                     </div>

            
                  </div>    
            </section>
     
    </div>
  );
}

export default App;
