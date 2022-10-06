import React from 'react'
import { useNavigate } from 'react-router-dom';


const Card = ({ data }) => {
    const navigate = useNavigate()
    const dragStart = (e, data) => {
        const { title, mal_id, rank } = data;
        const imgLink = data.images.jpg.small_image_url
        const dataToSend = { mal_id, title, rank, imgLink }
        e.dataTransfer.setData("dragData", JSON.stringify(dataToSend));
    }
    return (
        data.map((_data) => {
            return (
                <div className="card-div" draggable
                    onDragStart={(e) => dragStart(e, _data)}
                    onDragOver={(e) => e.preventDefault()} key={_data.mal_id}
                >
                    <img onClick={() => navigate(`./anime/${_data.mal_id}`)}
                        className="card-image-div" src={_data.images.jpg.image_url} alt="pic" />
                        <div className='anime-title'> <p className='title-background'>Name: {_data.title.slice(0,10)}</p></div>
                </div>
            )
        })

    )
}

export default Card