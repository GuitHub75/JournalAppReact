
export const fileUpload = async (file) => {

    if( !file ) throw new Error('No tenemos archivos a subir');

   const CloudUrl = 'https://api.cloudinary.com/v1_1/dg1hgnuj1/upload';

   const formData = new FormData();
   formData.append('upload_preset','reactJournal');
   formData.append('file', file);

   try {

     const resp = await fetch(CloudUrl, {
        method:'POST',
        body:formData
     })

     console.log(resp);

     if(!resp.ok) throw Error('No se pudo subir la imagen');

     const cloudResp = await resp.json();
     //console.log(cloudResp);
     
     return cloudResp.secure_url;
   } catch (error) {
    //console.log(error);
        throw new Error('Ocurrio un error!!!!'+error)
   }
}
