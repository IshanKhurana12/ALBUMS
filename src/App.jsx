import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [album,setalbums]=useState([]);
  const [newid,setid]=useState(0);

  const [uptitle,setup]=useState('');



  //getting all the albums
  useEffect(()=>{
     async function data(){
     const result= await fetch("https://jsonplaceholder.typicode.com/albums");
     const data=await result.json();
     setalbums(data);
     }
     data();
  },[]);

  const [newtitle,settitle]=useState('');



  //posting new albums
async function post(e){

 const response=await fetch('https://jsonplaceholder.typicode.com/albums', {
  method: 'POST',
  body: JSON.stringify({
    id:newid,
    title: newtitle,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
const newalbum=await response.json();

if(response.ok){
  
 console.log(newalbum)

 setalbums([...album,newalbum]);
  settitle('');
  setid('');
}

}

//handleing the delete functionality
async function handledelete(e){
  const id=Number(e.target.value);
  console.log(typeof(id))
console.log(id);
  const response=await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`,{
method:'DELETE',
  })
  if(response.ok){
    console.log(response)
  const deleted=album.filter(album => album.id !== id);
  setalbums(deleted);
  console.log(album);
  }
  else{
    console.log(response);
  }

  
}


//updating album title
const update=async(e)=>{
  const id=Number(e.target.value);
  const response=await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      title: uptitle,
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

if(response.ok){

    const updatedAlbums = album.map(album =>
      album.id === id ? { ...album, title: uptitle } : album
    );
   setalbums(updatedAlbums);
    
    setup('');
    console.log("updated");
}
}
 

  return (
  

    <>

    <h1>Album</h1>
    <h2>add a new album</h2>
    <div>
    <input type="text" value={newtitle} onChange={(e)=>settitle(e.target.value)} placeholder='enter title'/>
    <button onClick={post}>Add Album</button>
    </div>
    <div className='maindiv'>
    {
      album.map((record,key)=>(

     <div key={key} className='card'>
         <div className="first-content">
             <span>{record.id}</span>
         </div>
     <div className="second-content">
            <span>{record.title}</span>
            <input type="text" value={uptitle} onChange={(e)=>setup(e.target.value)} />
            <button onClick={update} value={record.id} >Update</button>
            <button onClick={handledelete} value={record.id}>Delete</button>
         </div>
    </div>
      ))

    }
    </div>

     
    </>
  )
}

export default App
