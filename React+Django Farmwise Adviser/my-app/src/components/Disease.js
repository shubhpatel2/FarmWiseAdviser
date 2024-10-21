import React, { useState } from 'react';
import axios from 'axios';

const Disease = () => {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (e) => {
    setSymptoms(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/predict/', { symptoms });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div className="fade-in">
      <h2 className="text-2xl font-bold mb-4">Disease Prediction</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          Enter Symptoms:
          <input
            type="text"
            value={symptoms}
            onChange={handleInputChange}
            className="border p-2 w-full"
            placeholder="e.g., fever, cough, fatigue"
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2 hover:bg-blue-700 transition duration-300">
          Predict
        </button>
      </form>
      {prediction && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Prediction Result:</h3>
          <p>{prediction}</p>
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">Common Crop Diseases</h3>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Blight:</strong> Affects potatoes and tomatoes, causing leaves to turn brown and die.</li>
        <li><strong>Rust:</strong> Affects wheat, barley, and other cereals, causing orange or brown pustules on leaves.</li>
        <li><strong>Powdery Mildew:</strong> Affects a wide range of crops, causing white powdery spots on leaves and stems.</li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Prediction Methods</h3>
      <p className="mb-4">
        Disease prediction can be done using various methods, including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Weather Data Analysis:</strong> Using temperature, humidity, and rainfall data to predict disease outbreaks.</li>
        <li><strong>Machine Learning Models:</strong> Training models on historical data to predict future disease occurrences.</li>
        <li><strong>Remote Sensing:</strong> Using satellite imagery and drones to monitor crop health and detect early signs of disease.</li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Preventive Measures</h3>
      <p className="mb-4">
        Farmers can take several preventive measures to protect their crops from diseases, such as:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Crop Rotation:</strong> Changing the type of crop grown in a particular field each season to prevent disease buildup.</li>
        <li><strong>Resistant Varieties:</strong> Planting crop varieties that are resistant to common diseases.</li>
        <li><strong>Proper Irrigation:</strong> Ensuring adequate water supply without overwatering, which can promote disease.</li>
        <li><strong>Regular Monitoring:</strong> Regularly inspecting crops for early signs of disease and taking prompt action.</li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Resources</h3>
      <p>
        For more information on crop disease prediction and management, you can refer to resources such as agricultural extension services, research institutions, and online databases.
      </p>
    </div>
  );
};

export default Disease;
