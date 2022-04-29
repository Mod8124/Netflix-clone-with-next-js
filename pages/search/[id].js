import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import NavBar from '../components/NavBar'
import DetailMovie from "../components/DetailMovie";
import Head from 'next/head'

const Search= () => {
    const key = 'c94db750ffefe970e4715c2ceb143d9a'
    const router = useRouter()
    const { id } = router.query
    const [movies, setMovies] = useState([])
    const [error, setError] = useState('')
    const imgPath = 'https://image.tmdb.org/t/p/original';

    const [details, setDetails] = useState(false)
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [review, setReview] = useState('')
    const[img, setImg] = useState('')
    const [movieId, setmovieId] = useState('')
    const [movieValue, setMovieValue] = useState(id)
    
    const changeValue = (e) => {
       setMovieValue(e.target.value)
    }

    const handleClick= (e) => {
            if(title && img) {
                setDetails(true)
               if(e.target.classList.contains('detailsMovie') || e.target.classList.contains('closeDetailMovieBack')) {
                 setDetails(false)
               }
            } 
     }
    
    useEffect(()=> {
      async function fetchData() {
        if(movieValue) {
            const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${movieValue}&page=1&include_adult=false`)
             const rest = await data.json()
             if(rest) {
                 setMovies(rest)
             }
            }
      }
      fetchData()
    },[movieValue])

    return (
        <div className='searchDetail'>
        <Head>
        <title>Search</title>
      </Head>

            <NavBar  main={true} active={true} changeValue={changeValue}></NavBar>
            <div className="searchSuggestions">
            <div className="cardSearchDetail">
                <h1>Movies</h1>
               <div className="cardSearchDetails">
               {movies && movies.results && movies.results.map(movie => {
                   if(movie.poster_path === null) return

                   return (
                    <div key={movie.id} className="cardSearchDetailImg">
                    <img src={imgPath+movie.poster_path} alt={movie.titel}  onClick={(e)=>  {
                              const yearSlice = movie.release_date.slice(0,4)
                              setTitle(movie.title)
                              setYear(yearSlice)
                              setImg(movie.backdrop_path)
                              setReview(movie.overview)
                              setmovieId(movie.id)
                              handleClick(e)
                    }}/>
                    {details && 
                    <div className="detailsMovie">
                 <DetailMovie title={title} img={img} year={year} review={review} handleClick={handleClick} id={movieId}></DetailMovie>
                 </div>
                 }
                 </div>
                   )
               })}

               {!movies.results && 
                    <div className='loading'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                    </div>
                }

               </div>
            </div>
            <div className="suggestions">
                <h2>Suggestions</h2>
            {movies && movies.results && movies.results.map((movie, i) => {
                if(i>9) return
                return (
                    <div key={movie.id}>
                    <p>{movie.title}</p>
                      </div>
                )
              
                
            })}
            </div>
            </div>
        </div>
    )
}

export default Search