import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


const Animedisplay = () => {

  const [showTrailer, setShowTrailer] = useState(false);
  const [loader, setLoader] = useState(false);

  const YoutubeEmbed = () => {
    return (
      <div className="video-responsive-div" >
        <iframe className="video-responsive"
          src={animeDetails.trailer.embed_url} title="Embedded youtube"
        />
      </div>
    )

  };
  const handleShowTraler = () => {
    setShowTrailer(!showTrailer)
  }



  const { id } = useParams();

  const [animeDetails, setAnimeDetails] = useState({});
  const [isLoadng, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchApi = async () => {

      const url = `https://api.jikan.moe/v4/anime/${id}`
      const respose = await fetch(url);
      const resJson = await respose.json();
      setAnimeDetails(resJson.data);
      setIsLoading(false)
    }
    fetchApi()
  }, [id]);
  { }
  if (isLoadng) {
    return (
      <div className='loader-mainpage'>
        <p >Loading.....</p>
      </div>
    )
  }
  return (
    <div>
      <div className='img-des-div'>
        <img className='route-image' src={animeDetails.images.jpg.image_url} alt="pic" />
        <div>
          <div className='anime-des-name'>
            {animeDetails.title}
          </div>
          <p>{animeDetails.synopsis}</p>

        </div>
      </div>
      <div>
        {
          showTrailer && <YoutubeEmbed />
        }

      </div>
      <div className='trailer-button-div'>
        <button className='trailer-button' onClick={handleShowTraler} >{!showTrailer ? "Watch Trailer" : "Hide Trailer"}</button>
      </div>
    </div>

  )
}

export default Animedisplay;