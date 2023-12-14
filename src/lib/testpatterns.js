import testdetails from '../../models/company_test';
const cloudinary = require('cloudinary');

//POST company and test details

export async function addCompany(req,res)
{
    try
    {
        const data = new testdetails(req.body);
        const status = data.save();
        return res.json({"status":"saved"});

    }
    catch(err)
    {
        return res.json(err);
    }
}





//GET company name & details  https://localhost:3000/api/patterns

export async function getAllPatternsCompany(req,res){
     const data = await testdetails.find();
     return res.json(data);


}

export async function addImagetoCloudinary(req,res){
    const url_image = req.body.url_image;
    cloudinary.config({
        cloud_name: "djmhakv9l",
        api_key: "682166194484921",
        api_secret: "qJ4GlFC30Wet9cvOGoGf5xLatvY"
      });
    
      cloudinary.uploader.upload(url_image, (err, result) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json(result);
        }})

}
