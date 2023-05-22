import React, { useState, useEffect } from 'react'
import '../../Styles/home.css'
import axios from 'axios'
import {Link} from 'react-router-dom' 
import {BiPlay} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'

const apiKey="c3391dd77e45baf44982f12c3f3b5e9f";
const url="https://api.themoviedb.org/3";
const imgUrl="https://image.tmdb.org/t/p/original";
const upcoming="upcoming";
const nowPlaying="now_playing";
const popular="popular";
const topRated="top_rated"

const Card=({img})=>(
  <div className='card'>
    <img src={img} alt='cover'/>
  </div>
)
const Row=({title, arr=[]})=>(
     <div className='row'>
      <h2>{title}</h2>

      <div>
      {
        arr.map((item, index)=>(
          <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
        ))
      }

      </div>
     </div>
     
  
)

const Home = () => {

  const [upcomingMovies, setUpcomingMovies ]=useState([]);
  const [nowPlayingMovies, setNowPlayingMovies ]=useState([]);
  const [popularMovies, setPopularMovies ]=useState([]);
  const [topRatedMovies, setTopRatedMovies ]=useState([]);
  const [genre, setGenre]=useState([]);


  useEffect(() => {
    const fetchUpcoming=async()=>{
      const {data:{results}}=await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
    };

    const fetchnowPlaying=async()=>{
      const {data:{results}}=await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    };

    const fetchPopularMovies=async()=>{
      const {data:{results}}=await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
    };

    const fetchTopRated=async()=>{
      const {data:{results}}=await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
    };

    const getAllGenre=async()=>{
      const {data:{genres}}=await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
    };

  getAllGenre();
  fetchUpcoming();
  fetchnowPlaying();
  fetchPopularMovies();
  fetchTopRated();

  }, []);
  
  return (
    <section className='home'>
    <div className='banner' style={{backgroundImage:popularMovies[0] ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`: "rgb(16, 16, 16)"}}>
<div>
{popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
      {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

   <div>
   <button>Play <BiPlay/></button>
      <button>MyList <AiOutlinePlus/></button>
   </div>
</div>

    </div>
    <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
    <Row title={"Movies"} arr={nowPlayingMovies}/>
    <Row title={"TV Shows"} arr={popularMovies}/>
    <Row title={"My List"} arr={topRatedMovies}/>

    <div className="genreBox">
      {
        genre.map((item, index)=>(
          <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))
      }
    </div>
    </section>
  )
}

export default Home