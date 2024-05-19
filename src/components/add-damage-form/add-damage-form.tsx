import React, { useState } from 'react';
import axios from 'axios';

const AddDamageForm = () => {
    const [formData, setFormData] = useState({
        plate: '',
        damage_type: '',
        part: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5002/api/add_damage', formData);
            setResponseMessage(response.data.message);
            setErrorMessage('');
        } catch (error) {
            setResponseMessage('');
            setErrorMessage('Internal server error. Please try again later.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Add Damage</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plate">
                        Plate Number
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="plate"
                        type="text"
                        name="plate"
                        value={formData.plate}
                        onChange={handleChange}
                        placeholder="Enter plate number"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="damage_type">
                        Damage Type
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="damage_type"
                        type="text"
                        name="damage_type"
                        value={formData.damage_type}
                        onChange={handleChange}
                        placeholder="Enter damage type"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="part">
                        Damaged Part
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="part"
                        type="text"
                        name="part"
                        value={formData.part}
                        onChange={handleChange}
                        placeholder="Enter damaged part"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {responseMessage && (
                <div className="mt-4 text-green-600">
                    {responseMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mt-4 text-red-600">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default AddDamageForm;
