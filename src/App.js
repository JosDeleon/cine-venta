import './App.css';
import { API } from 'aws-amplify';
import { createFuncion } from './graphql/mutations'
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import TicketsSelect from './pages/TicketsSelect';
import { Grid, View, useTheme } from '@aws-amplify/ui-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const { tokens } = useTheme();
  
  return (
    <Grid
      templateColumns={{base: '1fr', large: '15% 70% 15%'}}
      templateRows="4rem "
      gap={tokens.space.small}
      width='100%'
      backgroundColor={tokens.colors.background.tertiary}
    >
      <View columnSpan={3} className='fixed'>
        <NavBar />
      </View>
      <View columnSpan={1} />
      <View columnSpan={1} marginTop='4rem'>
        <BrowserRouter>
          <Routes>
            <Route path='/' index element={<Landing />} />
            <Route path='tickets' element={<TicketsSelect />}/>
          </Routes>
        </BrowserRouter>
      </View>
      <View columnSpan={1} />
    </Grid>
  );
}

export default App;
