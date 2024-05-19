import React, { useState } from 'react';
import axios from 'axios';

const AddCarForm = () => {
    // State variables to store form data and response message
    const [formData, setFormData] = useState({
        plate: '',
        model: '',
        color: '',
        vin: '',
        brand: ''
    });
    const [responseMessage, setResponseMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            // Send POST request to API endpoint
            const response = await axios.post('http://127.0.0.1:5002/api/add_car', formData);
            // Update response message state with the message from the API response
            setResponseMessage(response.data.message);
        } catch (error) {
            // Handle errors, if any
            console.error('Error adding car:', error);
            setResponseMessage('An error occurred while adding the car.');
        }
    };

    // Function to handle input changes
    const handleInputChange = (e:any) => {
        // Update form data state with the new input value
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Add Car</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Plate:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="plate"
                        value={formData.plate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Model:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Color:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">VIN:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="vin"
                        value={formData.vin}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Brand:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Car
                    </button>
                </div>
            </form>
            {responseMessage && <p className="mt-4 text-green-500">{responseMessage}</p>}
        </div>
    );
};

export default AddCarForm;
