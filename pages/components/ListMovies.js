import CardMovies from "./CardMovie";
import { useEffect } from "react";

const ListMovies = ({movies, buttonActive}) => {

    const results = movies ? [...movies[0].results] : [];
    const imgPath = 'https://image.tmdb.org/t/p/original/';
    const resultsTwo = movies ? [...movies[1].results] : [];
    const resultsThree = movies ? [...movies[2].results] : [];
    const resultsFour =  movies ? [...movies[3].results] : [];

    // console.log(recomentsTwo.results)
    let slideIndex = [0,0, 0,0];
    function filter (movies,x)  {
        //    return movies.filter(movie => movie.genre_ids.includes(27))
        
        return [...movies.sort((a, b)=> {
            const sorting = a.genre_ids.includes(parseInt(x))
            const sortingTwo = b.genre_ids.includes(parseInt(x))
    
            if(sorting > sortingTwo) {
                return -1
            } else {
                return 1
            }
        })]
    }

    function changeSlider (e, slider, n) {
        e.preventDefault();
        const slides = [...document.querySelectorAll(`.${slider}`)]
        const next = document.querySelectorAll('.next')
        const prev = document.querySelectorAll('.prev')
        if(e.target.classList.contains('next') || e.target.classList.contains('nextTwo')) {
            e.target.style.setProperty('opacity', '1')
           slideIndex[n]+=1
        } else {
            slideIndex[n]-=1
        }

        // single
        if(slideIndex[n] > slides.length -1) {
            e.target.classList.add('activeSlider')
            slideIndex[n] = slideIndex[n] -1 
           } else {
            next.forEach(x => x.classList.remove('activeSlider'))
           }
        
        if(slideIndex[n] < 0) {
            slideIndex[n] = 0
            e.target.classList.add('activeSlider')
          } else {
              prev[n].classList.remove('activeSlider')
          }

          

        // many
        for(let i = 0; i<8;i++) {
            if(slideIndex[n]+i > slides.length -1) {
                e.target.classList.add('activeSlider')
             slideIndex[n] = slideIndex[n] -1
            } else {
               next.forEach(x => x.classList.remove('activeSlider'))
            }
          }

           for(let i =0; i< slides.length; i++) {
            slides[i].style.display = 'none'
          }
        
             slides[slideIndex[n]].style.display = 'block'
             for(let i = 0;i< 8; i++) {
                slides[slideIndex[n]+i].style.display = 'block'
             }
             
    }


    useEffect(()=>{
        const slides = [...document.querySelectorAll('.cardMovie')]
        const slidesTwo = [...document.querySelectorAll('.cardMovieTwo')]
        const slidesThree = [...document.querySelectorAll('.cardMovieThree')]
        const slidesFour = [...document.querySelectorAll('.cardMovieFour')]
        const prev = document.querySelectorAll('.prev')
        prev.forEach(x => x.classList.add('activeSlider'))
        
        for(let i = 0;i< 8; i++) {
            slides[i].style.display = 'block'
            slidesTwo[i].style.display = 'block'
            slidesThree[i].style.display = 'block'
            slidesFour[i].style.display = 'block'
         }
    },[])

    return (
        <div>
                <div className="back">
                                {movies && <div className="movieBack" style={{background:`url(${imgPath+movies[0].results[3].backdrop_path})`,  backgroundSize: "cover", backgroundPosition:"center center", backgroundRepeat:"no-repeat"}}>
                        
                        <div className="cta">
                            <h1>{movies[0].results[3].title}</h1>
                            <div><button><img src="/play.svg" alt="play_icon" />Play</button> <button><img src="/plus.svg" alt="add plus icon" />My list</button></div>
                            <p>{movies[0].results[3].overview}</p>

                            <div><h2>See Movie</h2></div>
                        </div>
                </div>}
                                
                                
                </div>
                <div className="titleListMovie"><h3>Populars</h3></div>
                <div className="slider">

                    <div className="prev" onClick={(e)=>changeSlider(e,'cardMovie',0)}>
                    </div>

                    <div className="sliderCards">
                        {movies &&  filter(results, buttonActive).map((movie) => {
                            if(movie.backdrop_path === null || movie.poster_path === null) return
                            return (
                                <CardMovies key={movie.id} movie={movie} cardMovie={true} cardMovieTwo={false} cardMovieThree={false} cardMovieFour={false}/>
                            )
                        })}
                    </div>

                    <div className="next"  onClick={(e)=>changeSlider(e,'cardMovie',0)}>
                    </div>

                </div>

                <div className="titleListMovie titleListMovieTwo"><h3>New launches</h3></div>
                <div className="slider slideTwo">

                    <div className="prev" onClick={(e)=>changeSlider(e,'cardMovieTwo',1)}>
                    </div>

                    <div className="sliderCards">
                        {movies &&  filter(resultsTwo, buttonActive).map((movie) => {
                            if(movie.backdrop_path === null || movie.poster_path === null) return
                            return (
                                <CardMovies key={movie.id} movie={movie} cardMovie={false} cardMovieTwo={true} cardMovieThree={false} cardMovieFour={false}/>
                            )
                        })}
                    </div>

                    <div className="next nextTwo"  onClick={(e)=>changeSlider(e,'cardMovieTwo',1)}>
                    </div>

                </div>

                <div className="titleListMovie titleListMovieTwo"><h3>keep watching</h3></div>
                <div className="slider slideTwo slideThree">

                    <div className="prev" onClick={(e)=>changeSlider(e,'cardMovieThree',2)}>
                    </div>

                    <div className="sliderCards">
                        {movies &&  resultsThree.map((movie,i) => {
                            if(movie.backdrop_path === null || movie.poster_path === null) return
                            return (
                                <CardMovies key={movie.id} movie={movie} cardMovie={false} cardMovieTwo={false} cardMovieThree={true} cardMovieFour={false}/>
                            )
                        })}
                    </div>

                    <div className="next nextTwo"  onClick={(e)=>changeSlider(e,'cardMovieThree',2)}>
                    </div>

                </div>

                <div className="titleListMovie titleListMovieTwo"><h3>From Hollywood to your screen</h3></div>
                <div className="slider slideTwo">

                    <div className="prev" onClick={(e)=>changeSlider(e,'cardMovieFour',3)}>
                    </div>

                    <div className="sliderCards">
                        {movies &&  filter(resultsFour, buttonActive).map((movie,i) => {
                             if(movie.backdrop_path === null || movie.poster_path === null) return
                            return (
                                <CardMovies key={movie.id} movie={movie} cardMovie={false} cardMovieTwo={false} cardMovieThree={false} cardMovieFour={true}/>
                            )
                        })}
                    </div>

                    <div className="next nextTwo"  onClick={(e)=>changeSlider(e,'cardMovieFour',3)}>
                    </div>

                </div>

             
                     
        </div>
    )
}

export default ListMovies