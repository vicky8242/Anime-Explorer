import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import WatchlistCard from './WatchlistCard';
import Card from './Card';
const Home = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState([]);
    const [initialData, setInitialData] = useState([])

    const [loading, setLoading] = useState(false);
    const [watchListData, setWatchListData] = useState([]);
    const [genreList, setGenrelist] = useState([]);
    const [has_nextPage, sethasNextPage] = useState(null)
    const [searchInput, setSearchInput] = useState("")
    const [clearSearchState, setClearSearchState] = useState(false)

    const getgenres = (data) => {
        let arr = []
        data?.forEach(({ genres }) => {
            genres.forEach(({ name }) => {
                if (!arr.includes(name)) {
                    arr.push(name)
                }
            })
        })
        setGenrelist(arr);

    }
    const fetchSearch = async () => {
        setLoading(true)

        let searchdata = initialData.filter(({ title }) => title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1)
        setData(searchdata);
        setLoading(false)
        setClearSearchState(true);
    };

    const fetchApi = async () => {
        setLoading(true)
        const url = `https://api.jikan.moe/v4/anime?page=${pageNumber}`
        const response = await fetch(url);
        const resJson = await response.json();
        setData(resJson.data);

        setInitialData(resJson.data);

        sethasNextPage(resJson.data?.pagination?.has_next_page)
        genreList.length === 0 && getgenres(resJson.data)
        setLoading(false)
    };
    useEffect(() => {
        fetchApi();
    }, [pageNumber])

    const onDrop = (e) => {
        const data = JSON.parse(e.dataTransfer.getData("dragData"))
        e.preventDefault();
        const isExists = watchListData.map(({ mal_id }) => mal_id).includes(data?.mal_id)
        if (!isExists) {
            setWatchListData(watchListData.concat(data))
        } else alert("Already exists in watchlist")
    }
    const clearSearch = () => {
        setData(initialData);
        console.log(data);
        setClearSearchState(false);
    }
    const filterHandler = value => {
        if (value) {
            let filterdata = data.filter(({ genres }) => {
                return genres.map(({ name }) => name).includes(value)
            })
            setData(filterdata)
        } else setData(initialData)

    }
    return (
        <div className='main-container'>
            <div className='top-header'>
                <h1 className='anime-header'> Anime Explorer</h1>
                <div className='select-search-container'>
                    <select className='select-genre' onChange={({ target: { value } }) => filterHandler(value)}>
                        <option value="" > Select genre</option>
                        <option value="" > None</option>
                        {
                            genreList.map((genre) => {
                                return <option key={genre} value={genre}> {genre} </option>
                            }
                            )
                        }
                    </select>
                    <div>
                        <input className='search-input' onChange={(e) => setSearchInput(e.target.value)} placeholder="Type here ..."></input>
                        <button className='search-btn' onClick={() => fetchSearch()} >Search</button>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='cardlist-container'>

                    {loading ? <p className='loader-mainpage'>Loading...</p> :

                        data.length === 0 ? <p> No Data Available</p> :

                            <>
                                <Card key={data.mal_id} data={data} />
                                {clearSearchState && <button className='clearsearch-btn'
                                    onClick={clearSearch}> Clear Search</button>}
                            </>
                    }
                </div>
                <div className='watchlist-container'
                    droppable="true"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDrop}>
                    <div className='watchlist-header'>
                        <p>Watchlist</p>
                    </div>
                    {
                        watchListData.length === 0 ? <div className='empty-div'>
                            <p>empty...</p>
                            <p>( Drag and Drop )</p>
                        </div>
                            : watchListData.map((el) => <WatchlistCard key={el.mal_id} el={el} />)
                    }
                </div>
            </div>
            <div className='footer-div'>
                <button className='prev-btn'
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber(pageNumber - 1)}>prev..</button>
                <button className='prev-btn'
                    disabled={has_nextPage}
                    onClick={() => setPageNumber(pageNumber + 1)}>next..</button>
            </div>
        </div>
    )
}

export default Home