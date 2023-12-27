import React, { useEffect, useState } from 'react'

import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Index({userDetails , documentation}) {
  const user = JSON.parse(userDetails)
  const documents = JSON.parse(documentation)
  console.log(documents)
  const [name, setName] = useState()
  const [filteredDoc, setFilteredDoc] = useState(documents)
  const [college, setCollege] = useState()
  const router  = useRouter()
  useEffect(()=>{
 
      const searchPattern = new RegExp(name, 'i');
      const filteredEmails = documents.filter(file => searchPattern.test(file.email));
      setFilteredDoc(filteredEmails)
      // console.log(filteredEmails)

  },[name])

  useEffect(()=>{
  
      const searchPattern = new RegExp(college, 'i');
      const filteredEmails = documents.filter(file => searchPattern.test(file.address?.college));
      setFilteredDoc(filteredEmails)
      console.log(filteredEmails)

  },[college])

  return (
    <div className='mt-24'>
        this is documentation page

        {documents.map((document)=>(
          <div className=' mx-96 my-10'>
            <div>
              {/* {console.log("document ",document )} */}
             <p> sent by: {document.user}</p>
         <p>     Email : {document.email}</p>
              <p>Date : { document.date}</p>
              {document.filePath.map((file)=>(
                <div className='mx-10 my-5'>
              <p>    name : {file.name}</p>
               <p>   Number of pages : {file.numberOfPages}</p>
                <p>  Number of copies : {file.numberOfCopies}</p>
                <button onClick={()=>{router.push(`/dashboard/admin/documentation/${document._id}`)}}>
                  GO to file
                </button>
                </div>
              ))}
            </div>


          </div>
        ))}


              <div className='my-24 mx-24'>

        <p>Documentation Search</p>

        <div>
          <input type="text" name="search" id="search" placeholder='Search by email' value={name} onChange={(e)=>{setName(e.target.value)}} />
          <input type="text" name="search" id="search"  placeholder='Search by colllege code'  value={college} onChange={(e)=>{setCollege(e.target.value)}} />
        </div>  

        <div>
        {filteredDoc.map((document)=>(
          <div className=' mx-96 my-10'>
            <div>
              {/* {console.log("document ",document )} */}
             <p> sent by: {document.user}</p>
         <p>     Email : {document.email}</p>
              <p>Date : { document.date}</p>
              {document.filePath.map((file)=>(
                <div className='mx-10 my-5'>
              <p>    name : {file.name}</p>
               <p>   Number of pages : {file.numberOfPages}</p>
                <p>  Number of copies : {file.numberOfCopies}</p>
                <button onClick={()=>{router.push(`/dashboard/admin/documentation/${document._id}`)}}>
                  GO to file
                </button>
                </div>
              ))}
            </div>


          </div>
        ))}

        </div>


              </div>

                
        
    </div>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  const documentation = await axios.get(`${process.env.HOST_URL}/api/documentation`)
  const documents = await documentation.data.done;
  // console.log("docm ", documentation.data.done);
  // console.log(documents);
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  if (user && !user.detailsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }
  if (user && user.category !== "admin") {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      userDetails : JSON.stringify(user),
      documentation : JSON.stringify(documents)
    }
    
  };
};