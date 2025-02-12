import React from 'react';

export function Document(data:any,func:any) {
  console.log(data, "2345");

  return (
    <>
      <style>
        {`
          
          .upload-container input {
            padding: 10px;
          
            width: 80%;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 13px;
            outline: none;
          }
          .upload-container input:focus {
            border-color:rgb(215, 219, 222);
          }
        `}
      </style>
      <div className="upload-container">
       
        <input
          id="resume-upload"
          placeholder="Upload resume"
          type="file"
          onChange={(e) => {
            data.func(e);
          }}
        />
      </div>
    </>
  );
}
