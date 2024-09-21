const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });
  
    const responseData = await response.json();
    return responseData;
  };
  
  export default uploadFile;
  