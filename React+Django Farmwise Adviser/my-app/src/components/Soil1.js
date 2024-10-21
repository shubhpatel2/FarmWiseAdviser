import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";  // Assuming Navbar is a part of your project

function SoilTest() {
    const [csrfToken, setCsrfToken] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        Water_Percentage: "",
        Air_Percentage: '',
        sand: '',
        silt: '',
        clay: '',
        Organic_Matter_Percentage: '',
        pH: '',
        Nitrogen_Content: '',
        Phosphorus_Content: '',
        Potassium_Content: ''
    });
    const [geminiResponse, setGeminiResponse] = useState(null);

    // Fetch CSRF token
    useEffect(() => {
        const getCsrfToken = async () => {
            const response = await fetch('/get-csrf-token/');
            const data = await response.json();
            setCsrfToken(data.csrfToken);
        };
        getCsrfToken();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Send form data to backend
        fetch('http://localhost:8000/submit-soil-test/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            // Set the Gemini response in state
            setGeminiResponse(data);
        })
        .catch(error => console.error('Error during submission:', error));
    };

    return (
        <>
            <div className="container" style={{ marginTop: '100px' }}>
                {/* Button to show the form */}
                <button 
                    className="get-soil-test-button" 
                    onClick={() => setShowForm(true)} 
                    style={{ marginBottom: '20px' }}
                >
                    Get Soil Test
                </button>

                {/* Display form on button click */}
                {showForm && (
                    <div className="form-container" style={{ marginTop: '20px' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Water Percentage (%):</label>
                                <input type="text" name="Water_Percentage" value={formData.Water_Percentage} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Air Percentage (%):</label>
                                <input type="text" name="Air_Percentage" value={formData.Air_Percentage} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Sand Content (%):</label>
                                <input type="text" name="sand" value={formData.sand} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Silt Content (%):</label>
                                <input type="text" name="silt" value={formData.silt} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Clay Content (%):</label>
                                <input type="text" name="clay" value={formData.clay} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Organic Matter (%):</label>
                                <input type="text" name="Organic_Matter_Percentage" value={formData.Organic_Matter_Percentage} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>pH Level:</label>
                                <input type="text" name="pH" value={formData.pH} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Nitrogen Content (%):</label>
                                <input type="text" name="Nitrogen_Content" value={formData.Nitrogen_Content} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Phosphorus Content (%):</label>
                                <input type="text" name="Phosphorus_Content" value={formData.Phosphorus_Content} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Potassium Content (%):</label>
                                <input type="text" name="Potassium_Content" value={formData.Potassium_Content} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                    </div>
                )}

                {/* Display Gemini response in table format */}
                {geminiResponse && (
                    <div className="gemini-response-table" style={{ marginTop: '20px' }}>
                        <h3>Gemini AI Response</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Soil Condition</th>
                                    <th>Soil Fertility (%)</th>
                                    <th>Recommended Crop</th>
                                    <th>Nutrients Needed</th>
                                    <th>Other Suggestions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{geminiResponse.soil_condition}</td>
                                    <td>{geminiResponse.soil_fertility_percentage}</td>
                                    <td>{geminiResponse.recommended_crop}</td>
                                    <td>{geminiResponse.nutrients_needed}</td>
                                    <td>{geminiResponse.other_suggestions}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default SoilTest;
