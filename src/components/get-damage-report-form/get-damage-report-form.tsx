import React, { useState } from 'react';

import axios from 'axios';

const TakePictureAndDownload = () => {
    const [image, setImage] = useState<string|null>(null);
    const [responseFile, setResponseFile] = useState(null);

    const handleFileChange = (e:any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64String = event.target?.result;
            if (base64String) {
                const base64Data = base64String.toString().split(",")[1]; // Extract the base64 data without the prefix
                setImage(base64Data);
            } else {
                setImage(null); // Set image to null if no file is selected
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5002/api/get_damage_report_from_image', { image }, {
                responseType: 'blob'
            });
            setResponseFile(response.data);
        } catch (error) {
            console.error('Error processing image:', error);
        }
    };

    const handleDownload = () => {
        if (!responseFile) {
            console.error('Response file is null');
            return;
        }
        const url = URL.createObjectURL(new Blob([responseFile]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'damage_report.pdf');
        document.body.appendChild(link);
        link.click();
        // Clean up by revoking the object URL after clicking the link
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Take Picture and Download Report</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input type="file" onChange={handleFileChange} accept="image/*" />
                </div>
                <div className="mb-6">
                    {image && <img src={`data:image/jpeg;base64,${image}`} alt="Uploaded" className="max-w-full mb-4" />}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {responseFile && (
                <div>
                    <button
                        onClick={handleDownload}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Download Report
                    </button>
                </div>
            )}
        </div>
    );
};

export default TakePictureAndDownload;
