import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDisplay from '../components/MovieDisplay';
import { listPeliculas } from '../graphql/queries';
import { createPelicula } from '../graphql/mutations';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { API } from 'aws-amplify';

const config = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzMwZTRjY2EwNTRmYjc5MGE0NmU2NmRiYTFmNTdiNiIsInN1YiI6IjY0ZDgxY2E2MzcxMDk3MDBlMjI1OTU5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._u_zwkZHBKvnB5qoJ4OHhDfFsleJXrow0S5Srkus8ow'
  }
};

const urlInfoPeliculas = 'https://api.themoviedb.org/3/movie/popular?language=es-GT&page=1&api_key=5730e4cca054fb790a46e66dba1f57b6';
const idPelis = [ 569094, 667538, 298618, 346698];

function Landing(){
    useEffect( () =>{
        getValores()
        getPeliculas();
    }, []);
    
    const [ peliculas, setPeliculas ] = useState([]);
    const [ valores, setValores ] = useState([]);
    const [ cargaValores, setCargaValores ] = useState(false);
    
    const getPeliculas = () => {
        axios.get(urlInfoPeliculas, config)
        .then( res => {
            // console.log(res)
            const peliculasObtenidas = res.data.results.filter( pelicula => idPelis.includes(pelicula.id));
            setPeliculas(peliculasObtenidas.slice(0, 5));
        })
        .catch( err => {
            console.log("ERROR =>", err);
        });
    }
    
    const getValores = async () => {
        try {
            const { data } = await API.graphql({
                query: listPeliculas,
                authMode: GRAPHQL_AUTH_MODE.API_KEY
            });
            // console.log(data.listPeliculas.items)
            setValores(data.listPeliculas.items)
            setCargaValores(true);
        } catch (error) {
            console.log(error)
        }
    }

    if(!cargaValores){
        return (<h1>Cargando Informacion...</h1>);
    }

    return( 
        <>
            {
                peliculas.map( (pelicula, id) => (
                    <MovieDisplay key={id} info={pelicula} peliValor={valores[id].valor}/>
                ))
            }
        </>
    );
}

export default Landing;