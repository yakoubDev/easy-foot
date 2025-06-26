'use client'
import React from 'react';
import { 
  MdLocationOn, 
  MdPeople, 
  MdStar, 
  MdStarBorder,
} from 'react-icons/md';

interface StadiumCardProps {
  id: string;
  name: string;
  image: string;
  maxPlayers: number;
  pricePerHour: number;
  location: string;
  rating: number;
  onBook?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const StadiumCard: React.FC<StadiumCardProps> = ({
  id,
  name,
  image,
  maxPlayers,
  pricePerHour,
  location,
  rating,
  onBook,
  onViewDetails
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<MdStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<MdStarBorder key={i} className="text-white/30" />);
      }
    }

    return stars;
  };

  return (
    <div className="backdrop-blur-md bg-black/20 border border-white/10 rounded-xl shadow-xl hover:shadow-2xl hover:bg-black/30 transition-all duration-300 overflow-hidden group hover:border-accent/30">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Available Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-black bg-accent shadow-lg">
            Available
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 backdrop-blur-sm bg-black/70 border border-accent/30 px-3 py-1 rounded-full">
          <span className="text-sm font-bold text-accent">${pricePerHour}/hr</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-accent transition-colors duration-200">
            {name}
          </h3>
          <div className="flex items-center text-white/70 text-sm">
            <MdLocationOn className="mr-2 text-red-500 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex mr-3">
            {renderStars(rating)}
          </div>
          <span className="text-sm font-semibold text-white">
            {rating}
          </span>
        </div>

        {/* Stadium Info */}
        <div className="flex items-center mb-6">
          <MdPeople className="text-accent mr-2 text-lg" />
          <span className="text-sm font-medium text-white/80">Max {maxPlayers} players</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onViewDetails?.(id)}
            className="flex-1 px-4 py-2.5 border border-white/20 text-white/90 rounded-lg hover:bg-white/5 hover:border-accent/50 hover:text-accent transition-all duration-200 text-sm font-medium backdrop-blur-sm"
          >
            View Details
          </button>
          <button
            onClick={() => onBook?.(id)}
            className="flex-1 cta"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Example usage component
export const StadiumCardExample = () => {
  const exampleStadium = {
    id: '1',
    name: 'Green Valley Sports Complex',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
    maxPlayers: 22,
    pricePerHour: 45,
    location: '123 Sports Avenue, Downtown',
    rating: 4.5
  };

  return (
    <div className="max-w-sm">
      <StadiumCard
        {...exampleStadium}
        onBook={(id) => console.log('Book stadium:', id)}
        onViewDetails={(id) => console.log('View details:', id)}
      />
    </div>
  );
};

export default StadiumCard;