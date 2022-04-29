import { useEffect } from "react";
import { useState } from "react";


const DetailMovie = ({title, img, year,review, handleClick,id}) => {
    const [random, setRandom] = useState(Math.floor(Math.random()* 100)) 
    const [recomends, setRecomends] = useState([])
    const imgPath = 'https://image.tmdb.org/t/p/original';
    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=c94db750ffefe970e4715c2ceb143d9a&language=en-US&page=1`)
          const rest = await data.json()
         setRecomends(rest.results)
        }
        fetchData()
    },[title])
    return (
       <div className="detailsMovie" onClick={handleClick}>

          <div id="detailsMovie">
              <div className="detailsMovieBack" style={{background:`url(${imgPath+img})`, backgroundPosition:"center center", backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
                  <div className="closeDetailMovieBack">
                      <img src="/close.svg" alt="close_icon" className="closeDetailMovieBack" />
                  </div>
                 <div className="playDetailMovieBack">
                 <img src="/playTwo.svg" alt="play_icon" />
                 </div>
                  <h2>{title}</h2>
              </div>

              <div className="detailsMovieInfo">

                    <div className="forYou">
                        <p>{random}% for you</p> <p>{year}</p> <img src="/hd.svg" alt="" />
                    </div>

                    <div className="review">
                        <p>{review}</p>
                    </div>

                    <div className="like">
                    <div className="add">
                            <img src="/plus.svg" alt="plus_icon" />
                            <p>My list</p>
                    </div>

                    <div className="dislike">
                            <img src="/like.svg" alt="like_icon" />
                            <p>Vote</p>
                    </div>
                    </div>
                        <div className="recomends">
                            {recomends.length > 0 && recomends.map((movie,i)=> {
                                if(i>=8) return 
                                return (
                                    <div className="cardRecomends" key={movie.id}>
                                    <img src={imgPath+movie.poster_path} alt={movie.title} />
                                    </div>
                                )
                            })}
                        </div>

                  
              </div>
          </div>
       </div>
    )
}

export default DetailMovie;