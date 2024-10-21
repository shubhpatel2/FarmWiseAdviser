import React from 'react';
import farmImage from '../assets/farm.jpg'; // Make sure to add a farm image in the assets folder
import cardImage1 from '../assets/card1.jpg'; // Add your card images in the assets folder
import cardImage2 from '../assets/card2.jpg';
import cardImage3 from '../assets/card3.jpg';
import cardImage4 from '../assets/card4.jpg';
import cardImage5 from '../assets/card5.jpg';
import cardImage6 from '../assets/card6.jpg';

const Home = () => {
  const cardData = [
    { title: 'Card Title 1', description: 'This is a description for card 1.', image: cardImage1 },
    { title: 'Card Title 2', description: 'This is a description for card 2.', image: cardImage2 },
    { title: 'Card Title 3', description: 'This is a description for card 3.', image: cardImage3 },
    { title: 'Card Title 4', description: 'This is a description for card 4.', image: cardImage4 },
    { title: 'Card Title 5', description: 'This is a description for card 5.', image: cardImage5 },
    { title: 'Card Title 6', description: 'This is a description for card 6.', image: cardImage6 },
  ];

  return (
    <div className="home-container">
      <img src={farmImage} alt="Farm" className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome to FarmviseAdvaser</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <div key={index} className="card bg-white p-4 rounded shadow-md fade-in">
              <img src={card.image} alt={card.title} className="w-full h-32 object-cover rounded mb-2" />
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-700">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
