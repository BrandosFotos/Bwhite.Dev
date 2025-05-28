import React from 'react';

interface HobbyCardProps {
    hobby: string;
}

const HobbyCard: React.FC<HobbyCardProps> = ({ hobby }) => {
    return (
        <div className='hobby-card'>
            <h2>{hobby}</h2>
        </div>
    );
};

export default HobbyCard;
