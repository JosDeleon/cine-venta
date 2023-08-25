import { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import Reports from './pages/Reports';
import TicketsSelect from './pages/TicketsSelect';
import { Grid, View, useTheme } from '@aws-amplify/ui-react';
import { createPelicula } from './graphql/mutations';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { API } from 'aws-amplify';

function App() {
  const { tokens } = useTheme();

  useEffect(()=>{
    // a()
  }, []);
  const a = async () => {
    // 667538, 298618, 346698
    await API.graphql({
      query: createPelicula,
      variables: {
          input: {
              pelicula: '667538',
              valor: 28,
              // email: emailReserva,
              // titulo: state.nombre,
              // asientos: libres.length,
              // valor: total,
              // fecha: fecha,
              // url: state.pantalla
          }
      },
      authMode: GRAPHQL_AUTH_MODE.API_KEY
      }).then( (res) => {
        console.log("PELICULA CREADA")
        console.log(res)
      }).catch( err => {
        console.log("==ERROR AL CREAR LA PELICULA==")
        console.log(err)
        console.log("=============================")
      });
  }
  
  return (
    <Grid
      templateColumns={{base: '1fr', large: '15% 70% 15%'}}
      templateRows="4rem "
      gap={tokens.space.small}
      width='100%'
      backgroundColor={tokens.colors.background.tertiary}
    >
      <BrowserRouter>
        <View columnSpan={3} className='fixed'>
          <NavBar />
        </View>
        <View columnSpan={1} height='0rem'/>
        <View columnSpan={1} marginTop='4rem'>
            <Routes>
              <Route path='/' index element={<Landing />} />
              <Route path='/tickets' element={<TicketsSelect />}/>
              <Route path='/reports' element={<Reports />}/>
            </Routes>
        </View>
        <View columnSpan={1} />
      </BrowserRouter>
    </Grid>
  );
}

export default App;
