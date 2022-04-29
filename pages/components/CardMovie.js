import { useState } from "react";
import { useEffect } from "react";
import DetailMovie from "./DetailMovie";

const CardMovies = ({movie, cardMovie, cardMovieTwo, cardMovieThree, cardMovieFour}) => {
    const imgPath = 'https://image.tmdb.org/t/p/original/';
    const random = Math.floor(Math.random()*90)
    const [bars, setBars] = useState(0)
    const width = {
        width : `${bars}%`
    }

    useEffect(()=> {
        setBars(random)
    },[])

    const [details, setDetails] = useState(false)
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [review, setReview] = useState('')
    const[img, setImg] = useState('')
    const [movieId, setmovieId] = useState('')

    const handleClick= (e) => {
        const yearSlice = movie.release_date.slice(0,4)
       setTitle(movie.title)
       setYear(yearSlice)
       setImg(movie.backdrop_path)
       setReview(movie.overview)
       setmovieId(movie.id)

       if(title && img) {
           setDetails(true)
          if(e.target.classList.contains('detailsMovie') || e.target.classList.contains('closeDetailMovieBack')) {
            setDetails(false)
          }
       } 
}

 
    return (
        <div className={cardMovie ? 'cardMovie':"" || cardMovieTwo ? "cardMovieTwo":"" || cardMovieThree ? "cardMovieThree":""|| cardMovieFour ? 'cardMovieFour':""}>
                {!cardMovieThree && movie && <img src={imgPath+movie.poster_path} alt="" onClick={(e)=> handleClick(e)} />}
                {cardMovieThree &&
                 
                    <div className="cardMoviePlay">
                      {movie && <img src={imgPath+movie.backdrop_path } alt="" className="cardMoviePlayMainImg"/>}
                        <div id="cardMovieIcon">
                            <div className="carMovieIconImg"> <img src="/playTwo.svg" alt="" /></div>
                            <div className="carMovieBar" style={width}></div>
                        </div>
                        <div className="cardMoviePlayInfo"><p>{movie.title}</p><div><img src="/info.svg" alt="info_incon" onClick={handleClick}/></div></div>
                    </div>
                 
                 }

                 {details && 
                    <div className="detailsMovie">
                 <DetailMovie title={title} img={img} year={year} review={review} handleClick={(e)=> handleClick(e)} id={movieId}></DetailMovie>
                 </div>
                 }
        </div>
    )
}

export default CardMovies;