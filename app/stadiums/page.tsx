'use client'
import React from 'react'
import StadiumCard from '../components/StadiumCard'

const Stadiums = () => {
  // Sample stadium data
  const stadiums = [
    {
      id: '1',
      name: 'Green Valley Sports Complex',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      maxPlayers: 22,
      pricePerHour: 45,
      location: '123 Sports Avenue, Downtown',
      rating: 4.5
    },
    {
      id: '2',
      name: 'City Center Football Pitch',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop',
      maxPlayers: 14,
      pricePerHour: 35,
      location: '456 Main Street, City Center',
      rating: 4.2
    },
    {
      id: '3',
      name: 'Riverside Mini Stadium',
      image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=300&fit=crop',
      maxPlayers: 10,
      pricePerHour: 25,
      location: '789 River Road, Westside',
      rating: 4.8
    },
    {
      id: '4',
      name: 'Urban Sports Arena',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop',
      maxPlayers: 16,
      pricePerHour: 40,
      location: '321 Urban Plaza, North District',
      rating: 4.0
    },
    {
      id: '5',
      name: 'Elite Football Ground',
      image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=300&fit=crop',
      maxPlayers: 18,
      pricePerHour: 55,
      location: '654 Elite Avenue, Premium Zone',
      rating: 4.9
    },
    {
      id: '6',
      name: 'Community Sports Field',
      image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&h=300&fit=crop',
      maxPlayers: 12,
      pricePerHour: 20,
      location: '987 Community Street, Suburbs',
      rating: 3.8
    }
  ];

  const handleBookStadium = (id: string) => {
    console.log('Booking stadium with ID:', id);
    
  };

  const handleViewDetails = (id: string) => {
    console.log('Viewing details for stadium with ID:', id);
  
  };

  return (
    <div className='p-6'>
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='h2 text-gradient mb-2'>Available Stadiums</h1>
        <p className='opacity-90'>Find and book the perfect stadium for your next match</p>
      </div>

      {/* Stadiums Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {stadiums.map((stadium) => (
          <StadiumCard
            key={stadium.id}
            id={stadium.id}
            name={stadium.name}
            image={stadium.image}
            maxPlayers={stadium.maxPlayers}
            pricePerHour={stadium.pricePerHour}
            location={stadium.location}
            rating={stadium.rating}
            onBook={handleBookStadium}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Empty State (if no stadiums) */}
      {stadiums.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>No stadiums available at the moment.</p>
        </div>
      )}
    </div>
  )
}

export default Stadiums