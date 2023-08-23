import './App.css';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import Reports from './pages/Reports';
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
