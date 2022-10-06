import React from 'react'

const WatchlistCard = ({el}) => {
return (
    <div className='dragged-div' key={el.rank}>
    <img src={el.imgLink} alt="pic" />
    
    <div className='dragged-inner-div'>
    <p> Name: {el.title}</p>
    <p>Rank: {el.rank}</p>
    </div>
</div>
)
    
    
}

export default WatchlistCard