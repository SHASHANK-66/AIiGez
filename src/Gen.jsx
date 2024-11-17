import React, { useRef, useState } from 'react';
import './Gen.css';
import hi from './assets/hi.png';

const Gen = () => {
  const [image, setImage] = useState('/');
  const inputRef = useRef(null);

  const imageGenerate = async () => {
    if (inputRef.current.value === '') {
      console.log("Input is empty.");
      return;
    }
``
    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,  // Replace with your environment variable in production
        },
        body: JSON.stringify({
          prompt: inputRef.current.value,
          n: 1,
          size: "512x512",
        }),
      });

      console.log("Response status:", response.status); // Check if the response status is 200

      if (!response.ok) {
        throw new Error("Failed to generate image. Status code: " + response.status);
      }

      const data = await response.json();
      console.log("API response data:", data);  // Log data to confirm the format

      if (data.data && data.data.length > 0) {
        const imageUrl = data.data[0].url;
        setImage(imageUrl);
      } else {
        console.error("Unexpected API response format:", data);
      }

    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div>
      <div className='page'>
        <div className='text1'>AI Image <span>Generator</span></div>
        <div className='image'>
          <div className='ii'>
            <img src={image === '/' ? hi : image} alt="Generated" />
          </div>
        </div>

        <div className="ent">
          <input
            type="text"
            ref={inputRef}
            className='text'
            placeholder='Describe what you want'
          />
          <button className='btn' onClick={imageGenerate}>Generate</button>
        </div>
      </div>
    </div>
  );
};

export default Gen;
