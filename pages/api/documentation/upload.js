// import { put ,list } from '@vercel/blob';
import { put } from "@vercel/blob";



export default async function handler(request, response) {

    console.log("inside documentation api", request.query.filename )
    try{
        // const { blobs } = await list();
        // const blob = await put(request.query.filename, request, {
        //     access: 'public',
        // });
        const { url } = await put(request.query.filename, request, { access: 'public' });

        console.log("bolb ",url)
        return response.status(200).json(url);
    }
    catch (e){
        console.log('error ',e)       
    }
}
 
export const config = {
  api: {
    bodyParser: false,
  },
};


