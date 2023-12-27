
import axios from 'axios';
import Link from 'next/link';
import React from 'react'

export default function id({data}) {
  const user = JSON.parse(data.user);
  const documents = JSON.parse(data.documents)
  // console.log('user ',user )


  async function updateStatus(index ,objectId){
    await axios.post("../../../api/documentation/updateStatus",{id:data.id,ind : index , objectId : objectId})
    
  }
  console.log( " Documents ",documents)
  return (
    <div>

      <div className='mt-24'>
        Order By : {data.user}
      </div>

      <div>
        <p>Documents</p>

    
        <p>Amount : {documents.amount}</p>

        <p  className="font-bold text-xl"> Pending Documents</p>

        {documents?.filePath?.map((document,index)=>(
        <div>
          {console.log("document ",typeof( document.status) )}
          {document.status == 'In progress' && (
            <div>
                <div className='my-10'>
              <p>Name : {document.name}</p>
              <p>Status : {document.status}</p>
              <p>Id:  {document._id}</p>
              <button>Get Link</button>
              <p className='text-black bg-red-500'>
              <a href={document.url} target="_blank" rel="noopener noreferrer">Click me to get the pdf</a>

              </p>
              <button onClick={()=>{updateStatus(index , document._id)}}>Update Status to Completed</button>
          </div>
            </div>
          )}
        </div>
        ))}

        <p className="font-bold text-xl">
          Completed Documents 
          </p>

          {documents?.filePath?.map((document,index)=>(
        <div>
          {document.status ==  "complete" && (
            <div>
                <div className='my-10'>
              <p>Name : {document.name}</p>
              <p>Status : {document.status}</p>
              <p>Id:  {document._id}</p>
              <button>Get Link</button>
              <p className='text-black bg-red-500'>
              <a href={document.url} target="_blank" rel="noopener noreferrer">Click me to get the pdf</a>

              </p>
              <button onClick={()=>{updateStatus(index , document._id)}}>Update Status to Completed</button>
          </div>
            </div>
          )}
        </div>
        ))}
      
      </div>

    </div>
  )
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params; // Access the slug from the URL parameters
  const response = await axios.post(`${process.env.HOST_URL}/api/documentation/singleDocument`,{id:id})
  const documents = response.data.document
  console.log("id in server",documents)
  const userResponse = await axios.post(`${process.env.HOST_URL}/api/getUser`,{user:documents.user})
  const u = userResponse.data.user
  console.log("user ",u)
  


  const data = {
    id: id || null,
    user : JSON.stringify(u),
    documents : JSON.stringify(documents)
  };

  return {
    props: {
      data,
    },
  };
}
