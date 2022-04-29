import { useState } from "react";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import ListMovies from "../components/ListMovies";
import Head from 'next/head'
import Loading from "../components/Loading";
import { useRouter } from 'next/router'

const Details = () => {
  const [activeNav, setActiveNav] = useState(false)
  const [menuHambu, setMenuHambu] = useState(false)
  const [buttonActive, setButtonActive] = useState('')
  const key = 'c94db750ffefe970e4715c2ceb143d9a'
  const [listmovie, setListMovie] = useState([])
  const [movies, setMovies] = useState([])

  const [data, setData] = useState([])

  const id = useRouter().query.id;
  useEffect(()=> {
    window.addEventListener('scroll',()=> {
      if(window.scrollY>= 20) {
        setActiveNav(true)
      } else {
        setActiveNav(false)
      }
    })

    async function fetchData () {

      const getData = async (url) => {
        const page = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${url}&with_watch_monetization_types=flatrate`)
        return await page.json()
      }
     const dataTwo = await getData(1)
    const dataThree = await getData(2)
    const dataFour = await getData(3)
    const dataFive = await getData(4)
      
    movies.push(dataTwo)
    movies.push(dataThree)
    movies.push(dataFour)
    movies.push(dataFive)
  
    if(movies) {
      setListMovie(movies)
    }
    }

    const getUser = async (id) => {
      const response = await fetch('/api/'+id)
      const dataR = await response.json()
      if(dataR) {
        setData(dataR)
      }
    } 

    fetchData()
    getUser(id)
  },[id])

  const [showMenuPoints, setShowMenuPoints] = useState(false)

  const  handleMenuPoints = () => {
    setShowMenuPoints(!showMenuPoints)
  }

  const handleMenuHambu = () => {
    setMenuHambu(!menuHambu)
  }

  const handleButtonActive = (e) => {
      setButtonActive(e.target.dataset.key)
  }
  
  return (
    <div className="userMovies" id={activeNav ? 'activeNav': ""}>
      <Head>
        <title>Movies</title>
      </Head>
      <NavBar main={true} handleMenuPoints={handleMenuPoints} showMenuPoints={showMenuPoints} handleMenuHambu={handleMenuHambu} menuHambu={menuHambu} user={data.user} handleButtonActive={handleButtonActive} buttonActive={buttonActive} active={false}></NavBar>
      {listmovie.length <1 && <Loading></Loading>}
      {listmovie.length > 1 &&  <ListMovies movies={listmovie} buttonActive={buttonActive}></ListMovies>}
    </div>
  );
}

export default Details;