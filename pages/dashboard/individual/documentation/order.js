import Head from "next/head";
import styles from "../../../../styles/Home.module.css";
// import Sidebar from "../components/Sidebar";
import { NotificationManager } from "react-notifications";
import { useState, useEffect, useRef } from "react";
// import Sidebar from "../../src/components/Sidebar";
import { Document, Page, pdfjs } from 'react-pdf';
import { toast } from "react-toastify";
import { ar } from "date-fns/locale";
import { useResumeContext } from "../../../../src/context/ResumeContext";
import { useRouter } from "next/router";



export default function Home() {


    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [pdfFile, setPdfFile] = useState(null);
    const {pages , setPages , fileName , numberOfColor , numberOfBW ,money ,setMoney ,setAllPDFFiles}  = useResumeContext();

    const [pdfUrl, setPdfUrl] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [images, setImages] = useState([]);
    const [documents, setDoc] = useState([]);
    const [videos, setVideos] = useState([]);
    const [audios, setAudio] = useState([]);
    const [others, setOthers] = useState([]);
    const [recent, setRecent] = useState([]);
    const [email, setEmail] = useState("");
    const [file, setFile] = useState();
    const [allUrls, setallUrls] = useState([])
    const wigRef = useRef();
    const [totalBW, setTotalBW] = useState(0);
    const [totalColor, setTotalColor] = useState(0);
    // const [currentBW, setCurrentBW] = useState(0);
    // const [currentColor, setCurrentColor] = useState(0);
    const [filesCalculated, setFilesCalculated] = useState(0)
    const [allFiles, setAllFiles] = useState([])
    const [totalMoney, setTotalMoney] = useState(0)

    const router = useRouter()
    const fetchPdfFromUrl = async () => {
       
        try {
            const response = await fetch(file.url);
            const blob = await response.blob();
            setPdfFile(blob);


            const temporaryUrl = URL.createObjectURL(blob);

            // Load the PDF using the temporary URL
            pdfjs.getDocument(temporaryUrl).promise.then((pdf) => {
                // Get the total number of pages in the PDF
                const totalPages = pdf.numPages;
                console.log("Total pages:", totalPages);

                URL.revokeObjectURL(temporaryUrl);
            });
        } catch (error) {
            console.error('Error fetching PDF from URL:', error);
        }
    };


    const showWidget = async () => {
        const myWidget = await window.cloudinary.createUploadWidget(
        {
            cloudName: "dvl0qtkko",
            uploadPreset: "vo99iup5"
        },
        (error, result) => {
            const arr =[]
            if (!error && result && result.event === "success") {
            const typelist = result.info.secure_url.split(".");
            // console.log(result.info)
            const len = typelist.length - 1;
            let type;
            if (
                typelist[len] === "jpeg" ||
                typelist[len] === "jpg" ||
                typelist[len] === "png" ||
                typelist[len] === "svg"
            ) {
                type = "image";
            } else if (
                typelist[len] === "mp4" ||
                typelist[len] === "mov" ||
                typelist[len] === "webm"
            ) {
                type = "video";
            } else if (
                typelist[len] === "pdf" ||
                typelist[len] === "dox" ||
                typelist[len] === "docx" ||
                typelist[len] === "xlx" ||
                typelist[len] === "xlxs" ||
                typelist[len] === "txt" ||
                typelist[len] === "ppt" ||
                typelist[len] === "ppts"
            ) {
                type = "documents";
            } else if (
                typelist[len] === "mp3" ||
                typelist[len] === "ma4" ||
                typelist[len] === "wav"
            ) {
                type = "audio";
            } else {
                type = "others";
            }

            const cred = {
                userid: "123",
                name: result.info.original_filename,
                url: result.info.secure_url,
                type,
                date: new Date(),
            };
            setallUrls(cred)

            }
        }
        );
        myWidget.open();
    };


  useEffect(()=>{
    
    const arr = [...allFiles]
    arr.push(allUrls)
    setAllFiles(arr)
    setAllPDFFiles(arr)
  },[allUrls])



  useEffect(()=>{
    if(file){
        fetchPdfFromUrl()
    }
  },[file])


  useEffect(()=>{
    console.log('money ',totalMoney , " pages : ",totalBW+totalColor )
  },[totalMoney,totalBW,totalColor])

  function startCheckOut(){
    setPages(totalBW  + totalColor)
    setMoney(totalMoney)
    console.log(pages , money)
    router.push("/packages/checkout/1")
  }

  
  useEffect(()=>{
    setAllPDFFiles(allFiles)
    // console.log("all files ",)
  },[allFiles])


const onDocumentLoadSuccess = ( numPages ,index ,file) => {
   
    // Create a new object representing the PDF file
    file["numberOfPages"] = numPages
    // console.log("Index ",index ,"Pages : ", numPages, "File " , allFiles[index]);
    const arr = [] 
    allFiles.map((f ,ind)=>{
        if(index  == ind){
          arr.push(file)
        }
        else{
          arr.push(f)
        }
    })
    setAllFiles(arr)
 };



  return (
    <div>
      <Head>
        <title>CloudDrop - Home</title>
        <meta name="description" content="Clouddrop" />
        {/*  eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          src="https://upload-widget.cloudinary.com/global/all.js"
          type="text/javascript"
        ></script>
      </Head>

      <div className={styles.homeflex}>
        {/* <Sidebar /> */}
        <div className={styles.home}>
      
          <button type="button" onClick={showWidget} className={styles.upload}>
            Upload File
          </button>
 
          {recent.length > 0 ? (
            <div className={styles.box1}>
              <h3 className={styles.head}>Recent</h3>
              {recent.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a className={styles.home_text} href={`${item.url}`}>
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}

          {images.length > 0 ? (
            <div className={styles.box1}>
              <h3 className={styles.head}>Images</h3>
              {images.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a className={styles.home_text} href={`${item.url}`}>
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}

          {audios.length > 0 ? (
            <div className={styles.box1}>
              <h3 className={styles.head}>Audios</h3>
              {audios.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a className={styles.home_text} href={`${item.url}`}>
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}

          {videos.length > 0 ? (
            <div className={styles.box1}>
              <h3 className={styles.head}>Videos</h3>
              {videos.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a className={styles.home_text} href={`${item.url}`}>
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}

          {documents.length > 0 ? (
            <div className={styles.box1}>
              <h3 className={styles.head}>Documents</h3>
              {documents.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a className={styles.home_text} href={`${item.url}`}>
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}

          {others.length > 0 ? (
            <div className={styles.box1}>
              <h3 className={styles.head}>Others</h3>
              {others.map((item) => {
                return (
                  <div className={styles.file} key={item.name}>
                    <a className={styles.home_text} href={`${item.url}`}>
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}



        </div>
      </div>
        <div  className="">
        {/* {pdfFile && (
                <div>
                    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                    
                    </Document>
                </div>
            )} */}


<table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '10%', border: '1px solid black', overflow: 'auto' }}>
                                    Name
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Url
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Number of pages
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Number of black and white
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Number of colored 
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Number of copies
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Calculate
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Total Price
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Delete 
                                </th>
                            </tr>
                        </thead>
                     

            {allFiles?.map((file ,index)=>(
              <div>
                
               

              {index!=0 && (
                
                <div>
                   <Document file={file} onLoadSuccess={({numPages}) => {onDocumentLoadSuccess(numPages, index ,file)} }>
                    
                    </Document>
          
                    <tbody>
                          
                          <tr key={index}>
                              <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                  {file.name}
                              </td>
                              <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                  {file.url}
                              </td>
                              <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                  {file.numberOfPages}
                              </td>
                              <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                  <input type="text" name="" id={`fileBW-${index}`} />
                              </td>
                              <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                  <input type="text" name="" id={`fileColor-${index}`} />
                              </td>
                              <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                  <input type="text" name="" id={`number-${index}`} />
                              </td>
                              <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                  <button onClick={()=>{
                                      const bw =  document.getElementById(`fileBW-${index}`).value
                                      const blackAndWhite =  document.getElementById(`fileBW-${index}`)
                                      
                                      const colorInput = document.getElementById(`fileColor-${index}`)
                                      const color = document.getElementById(`fileColor-${index}`).value

                                      const num = document.getElementById(`number-${index}`).value

                                      if((Number(bw) || bw== 0) && (Number(color) ||color == 0) && Number(num) && Number(num)>=1){

                                      try{
                                        
                                          if(Number(bw) + Number(color) == Number(file.numberOfPages) ){
                                              toast.success("Added",{
                                                  toastId:"Added"
                                              })
                                              setFilesCalculated(filesCalculated+1)
                                              setTotalBW(totalBW+Number(bw))
                                              setTotalColor(totalColor+ Number(color));
                                              setTotalMoney((totalMoney + (Number(document.getElementById(`fileColor-${index}`)?.value) * 3 + Number(document.getElementById(`fileBW-${index}`)?.value) * 5)*num  ))
                                              
                                              blackAndWhite.disabled = true;
                                              colorInput.disabled = true;
                                              const updatedFiles = allFiles?.map(f => {
                                                if (f.url === file.url) {
                                                  
                                                    return { ...f, numberOfCopies: num ,status:"In progress"};
                                                }
                                                return f;
                                                });

                                                setAllFiles(updatedFiles);

                                          }   
                                          else{
                                            console.log(Number(bw) + Number(color))
                                              toast.error("Number of pages not matching", {
                                                  toastId: "Number of pages not matching",
                                              });
                                          }
                                          // toast.success("Added",{
                                          //     toastId:"Added"
                                          // })
                                          // console.log("bw ",bw , " color ",color , "total ",Number(bw)+Number(color))
                                      }
                                      catch(e){
                                          toast.error("Invalid entry", {
                                              toastId: "Invalid entry",
                                          });
                                      }
                                  }
                                  else{
                                      toast.error("Invalid entry", {
                                          toastId: "Invalid entry",
                                      });
                                  }
                                  }
                                  
                                      }>Calculate</button>
                              </td>
                              <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                              {
                              (Number(document.getElementById(`fileColor-${index}`)?.value) * 3 + Number(document.getElementById(`fileBW-${index}`)?.value) * 5  )*Number(document.getElementById(`number-${index}`)?.value)
                              }
                              
                              </td>
                              <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                  <button>
                                      Delete
                                  </button>
                              </td>
                              <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                  <button onClick={()=>{
                                      const bw =  document.getElementById(`fileBW-${index}`).value
                                      const color = document.getElementById(`fileColor-${index}`).value
                                      const blackAndWhite =  document.getElementById(`fileBW-${index}`)
                                      
                                      const colorInput = document.getElementById(`fileColor-${index}`)
                                      const num = document.getElementById(`number-${index}`).value

                                      setTotalMoney(totalMoney - (((Number(color) * 3 + Number(bw) * 5)*num )))
                                      setTotalBW(totalBW - Number(bw))
                                      setTotalColor(totalColor- Number(color));
                                      setFilesCalculated(filesCalculated-1)
                                      document.getElementById(`fileBW-${index}`).value = 0;
                                      document.getElementById(`fileColor-${index}`).value = 0;


                                      blackAndWhite.disabled = false;
                                      colorInput.disabled = false;
                                      
                                      }}>
                                      Edit
                                  </button>
                              </td>


                          </tr>

                  </tbody> 
                 
                   
                </div>
              )}
              </div>
            ))}


</table>


{/* {console.log("filesCalculated" ,totalMo)} */}

{/* {console.log("total files :",filesCalculated , "total bw :" , totalBW, " total color: ", totalColor )} */}  {
  console.log("all files length ", allFiles?.length , " files calculated ", filesCalculated)
}
                    {allFiles?.length == filesCalculated+1 && (
                        <div>
                        <button className="bg-green-400" onClick={startCheckOut}>
                                Check Out 
                          </button>
                        </div>
                    )}
                    {allFiles?.length != filesCalculated+1 && (
                        <div>
                        <button className="bg-red-400 disabled:">
                                Check Out 
                          </button>
                        </div>
                    )}
            {/* {pdfFile && (
                <div>
           
                    All files 
                    <table>
                                <thead>
                                    <th className="mx-10">
                                        Name
                                    </th>
                                    <th className="mx-10">
                                        Url
                                    </th>
                                    <th className="mx-10"   >
                                        Number of pages
                                    </th>
                                </thead>
                                <tbody>

                    {allUrls.map((file)=>(

                        <div>
                            {console.log(file)}
                            <td>{file.name}</td>
                            <td>{file.url}</td>
                            <td>{file.numPages}</td>
                        </div>
                    )
                    )}
                    </tbody>
                    </table>

                    
                </div>
            )} */}


{/* {pdfFile && (
                <div>
                    All files 
                    <table>
                        <thead>
                            <tr>
                                <th className="mx-10">
                                    Name
                                </th>
                                <th className="mx-10">
                                    Url
                                </th>
                                <th className="mx-10">
                                    Number of pages
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUrls.map((file, index) => (
                                <tr key={index}>
                                    <td>{file.name}</td>
                                    <td>{file.url}</td>
                                    <td>{file.numPages}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )} */}

{/* {pdfFile && (
                <div>
                    All files  here
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '10%', border: '1px solid black', overflow: 'auto' }}>
                                    Name
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Url
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Number of pages
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Number of black and white
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Number of colored 
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Calculate
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Total Price
                                </th>
                                <th style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    Delete 
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUrls.map((file, index) => (
                                <tr key={index}>
                                    <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                        {file.name}
                                    </td>
                                    <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                        {file.url}
                                    </td>
                                    <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                        {file.numPages}
                                    </td>
                                    <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                        <input type="text" name="" id={`fileBW-${index}`} />
                                    </td>
                                    <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                        <input type="text" name="" id={`fileColor-${index}`} />
                                    </td>
                                    <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                        <button onClick={()=>{
                                            const bw =  document.getElementById(`fileBW-${index}`).value
                                            const color = document.getElementById(`fileColor-${index}`).value
                                        if(Number(bw) && Number(color)){

                                            try{
                                                if(Number(bw) + Number(color) == Number(file.numPages) ){
                                                    toast.success("Added",{
                                                        toastId:"Added"
                                                    })
                                                    setFilesCalculated(filesCalculated+1)
                                                    setTotalBW(totalBW+Number(bw))
                                                    setTotalColor(totalColor+ Number(color));
                                                }   
                                                else{
                                                    toast.error("Number of pages not matching", {
                                                        toastId: "Number of pages not matching",
                                                    });
                                                }
                                                // toast.success("Added",{
                                                //     toastId:"Added"
                                                // })
                                                // console.log("bw ",bw , " color ",color , "total ",Number(bw)+Number(color))
                                            }
                                            catch(e){
                                                toast.error("Invalid entry", {
                                                    toastId: "Invalid entry",
                                                });
                                            }
                                        }
                                        else{
                                            toast.error("Invalid entry", {
                                                toastId: "Invalid entry",
                                            });
                                        }
                                        }
                                        
                                            }>Calculate</button>
                                    </td>
                                    <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                    {Number(document.getElementById(`fileColor-${index}`)?.value) * 3 + Number(document.getElementById(`fileBW-${index}`)?.value) * 5}
                                    </td>
                                    <td style={{ width: '25%', border: '1px solid black', overflow: 'auto' }}>
                                        <button>
                                            Delete
                                        </button>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {console.log("total files :",filesCalculated , "total bw :" , totalBW, " total color: ", totalColor )}
                    {allUrls.length == filesCalculated && (
                        <div>
                        <button className="bg-green-400">
                                Check Out 
                          </button>
                        </div>
                    )}
                    {allUrls.length != filesCalculated && (
                        <div>
                        <button className="bg-red-400 disabled:">
                                Check Out 
                          </button>
                        </div>
                    )}
                   
                </div>
            )} */}
        </div>
    </div>
  );
}