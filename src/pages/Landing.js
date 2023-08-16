import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDisplay from '../components/MovieDisplay';

const config = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzMwZTRjY2EwNTRmYjc5MGE0NmU2NmRiYTFmNTdiNiIsInN1YiI6IjY0ZDgxY2E2MzcxMDk3MDBlMjI1OTU5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._u_zwkZHBKvnB5qoJ4OHhDfFsleJXrow0S5Srkus8ow'
  }
};

const urlInfoPeliculas = 'https://api.themoviedb.org/3/movie/popular?language=es-GT&page=1&api_key=5730e4cca054fb790a46e66dba1f57b6';

function Landing(){
    useEffect(() =>{
        getPeliculas();
    }, []);
    
    const [ peliculas, setPeliculas ] = useState([]);
    
    const getPeliculas = () => {
        axios.get(urlInfoPeliculas, config)
        .then( res => {
            const peliculasObtenidas = res.data.results;
            setPeliculas(peliculasObtenidas.slice(0, 5));
        })
        .catch( err => {
            console.log("ERROR =>", err);
        });
    }

    return(
        <>
            {
                peliculas.map( (pelicula, id) => (
                    <MovieDisplay key={id} info={pelicula}/>
                ))
            }
        </>
    );
}

export default Landing;