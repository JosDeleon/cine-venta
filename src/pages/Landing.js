import { useState, useEffect } from 'react';
// import axios from 'axios';
import MovieDisplay from '../components/MovieDisplay';
import { listPeliculas } from '../graphql/queries';
// import { createPelicula } from '../graphql/mutations';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { API } from 'aws-amplify';

// const config = {
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzMwZTRjY2EwNTRmYjc5MGE0NmU2NmRiYTFmNTdiNiIsInN1YiI6IjY0ZDgxY2E2MzcxMDk3MDBlMjI1OTU5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._u_zwkZHBKvnB5qoJ4OHhDfFsleJXrow0S5Srkus8ow'
//   }
// };

// const urlInfoPeliculas = 'https://api.themoviedb.org/3/movie/popular?language=es-GT&page=1&api_key=5730e4cca054fb790a46e66dba1f57b6';
// const idPelis = [ 569094, 667538, 298618, 346698];
const peliculasInfo = [
    {
        "adult": false,
        "backdrop_path": "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
        "genre_ids": [
            16,
            28,
            12
        ],
        "id": 569094,
        "original_language": "en",
        "original_title": "Spider-Man: Across the Spider-Verse",
        "overview": "Miles Morales regresa para una aventura épica que transportará al amigable vecino de Brooklyn Spider-Man a través del Multiverso para unir fuerzas con Gwen Stacy y un nuevo equipo de Spider-People, y enfrentarse así a un villano mucho más poderoso que cualquier cosa que hayan conocido antes.",
        "popularity": 599.982,
        "poster_path": "/37WcNMgNOMxdhT87MFl7tq7FM1.jpg",
        "release_date": "2023-05-31",
        "title": "Spider-Man: Cruzando el Multiverso",
        "video": false,
        "vote_average": 8.5,
        "vote_count": 4266
    },
    {
        "adult": false,
        "backdrop_path": "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
        "genre_ids": [
            35,
            12,
            14
        ],
        "id": 346698,
        "original_language": "en",
        "original_title": "Barbie",
        "overview": "Barbie vive en Barbieland donde todo es ideal y lleno de música y color. Un buen día decide conocer el mundo real. Cuando el CEO de Mattel se entere, tratará de evitarlo a toda costa y devolver a Barbie a una caja.",
        "popularity": 1763.378,
        "poster_path": "/fNtqD4BTFj0Bgo9lyoAtmNFzxHN.jpg",
        "release_date": "2023-07-19",
        "title": "Barbie",
        "video": false,
        "vote_average": 7.3,
        "vote_count": 4800
    },
    {
        "adult": false,
        "backdrop_path": "/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
        "genre_ids": [
            28,
            12,
            878
        ],
        "id": 298618,
        "original_language": "en",
        "original_title": "The Flash",
        "overview": "Flash, el héroe más rápido, viaja a una línea temporal en que la Tierra está en crisis y sus héroes perdidos o dispersados.",
        "popularity": 562.82,
        "poster_path": "/x9Qc86JEyYkAKsdzjDpS5kbaAB7.jpg",
        "release_date": "2023-06-13",
        "title": "Flash",
        "video": false,
        "vote_average": 6.9,
        "vote_count": 2878
    },
    {
        "adult": false,
        "backdrop_path": "/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg",
        "genre_ids": [
            28,
            12,
            878
        ],
        "id": 667538,
        "original_language": "en",
        "original_title": "Transformers: Rise of the Beasts",
        "overview": "Cuando surge una nueva amenaza capaz de destruir todo el planeta, Optimus Prime y los Autobots deben unirse a una poderosa facción conocida como los Maximals. Con el destino de la humanidad en juego, los humanos Noah y Elena harán lo que sea necesario para ayudar a los Transformers mientras se involucran en la batalla final para salvar la Tierra.",
        "popularity": 622.248,
        "poster_path": "/8HBYMQkF6cFpupgRDhsrrKskXOE.jpg",
        "release_date": "2023-06-06",
        "title": "Transformers: El despertar de las bestias",
        "video": false,
        "vote_average": 7.5,
        "vote_count": 3193
    }
];

function Landing(){
    useEffect( () =>{
        getValores()
        getPeliculas();
    }, []);
    
    const [ peliculas, setPeliculas ] = useState([]);
    const [ valores, setValores ] = useState([]);
    const [ cargaValores, setCargaValores ] = useState(false);
    
    const getPeliculas = () => {
        setPeliculas(peliculasInfo);
        // axios.get(urlInfoPeliculas, config)
        // .then( res => {
        //     const peliculasObtenidas = res.data.results.filter( pelicula => idPelis.includes(pelicula.id));
        //     setPeliculas(peliculasObtenidas.slice(0, 5));
        // })
        // .catch( err => {
        //     console.log("ERROR =>", err);
        // });
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