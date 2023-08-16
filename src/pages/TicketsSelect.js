import './Seats.css';
import 'react-calendar/dist/Calendar.css';
import clsx from "clsx";
import { Button, Card, Flex, Grid, Heading, Image, SelectField, ToggleButton, ToggleButtonGroup, View } from "@aws-amplify/ui-react";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';

const movies = [
    {
      name: 'Avenger',
      price: 10,
      occupied: [20, 21, 30, 1, 2, 8],
    },
    {
      name: 'Joker',
      price: 12,
      occupied: [9, 41, 35, 11, 65, 26],
    },
    {
      name: 'Toy story',
      price: 8,
      occupied: [37, 25, 44, 13, 2, 3],
    },
    {
      name: 'the lion king',
      price: 9,
      occupied: [10, 12, 50, 33, 28, 47],
    },
]
  
const seats = Array.from({ length: 8 * 8 }, (_, i) => i);

function TicketsSelect(){
    const { state } = useLocation();

    const [ sala, setSala ] = useState('REG');
    const [ dia, setDia ] = useState(new Date());
    const [ pelicula, setPelicula ] = useState(movies[0]);
    const [ asientos, setAsientos ] = useState([]);

    const handleSubmit = () => {
    }

    return(
        <Grid 
            backgroundColor='white'
            templateColumns={{base: '1fr', large: '1fr 1fr'}}
            gap={20}
            marginTop='2rem'
            width='100%'
            paddingTop='3rem'
            paddingBottom='3rem'
        >
            <View style={{display: 'flex', alignContent: 'center', justifyContent:' center'}}>
                <Flex direction='column'>
                    <Heading level={4} marginTop='0rem' marginBottom='0.5rem' paddingLeft='3rem'>{state.nombre}</Heading>
                    <Cinema fondo={state.pantalla} pelicula={pelicula} asientosSeleccionados={asientos} onSelectAsientos={ selectedSeats => setAsientos(selectedSeats)}/>
                </Flex>
            </View>
            <View>
                <Card>
                    <Flex direction='column'>
                        <form onSubmit={handleSubmit}>
                            <SelectField 
                                variation="quiet" 
                                label='Sede' 
                                placeholder="Seleccione Sede" 
                                marginBottom='1rem' 
                                size="small"
                            >
                                <option value='1'>Naranjo</option>
                                <option value='2'>Roosevelt</option>
                                <option value='3'>Zona 10</option>
                                <option value='4'>Zona 16</option>
                            </SelectField>
                            <Flex direction='row' style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Heading level={6} fontWeight='normal'>Sala</Heading>
                                <ToggleButtonGroup 
                                    value={sala}
                                    onChange={(sala) => { setSala(sala) }}
                                    variation="primary"
                                    size="small" 
                                    isExclusive 
                                    isSelectionRequired
                                >
                                    <ToggleButton width='5rem' size="small" value="REG">Regular</ToggleButton>
                                    <ToggleButton width='5rem' size="small" value="VIP">VIP</ToggleButton>
                                </ToggleButtonGroup>
                            </Flex>
                            <View style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'center', }}>
                                <Calendar minDate={new Date()} value={dia} onChange={setDia} calendarType='gregory' />
                            </View>
                            <Button variation="primary" size="small" marginTop='2rem' type="submit">Validar Reserva</Button>
                        </form>
                    </Flex>
                </Card>
            </View>
        </Grid>
    );
}

export default TicketsSelect;

function Cinema({pelicula, asientosSeleccionados, onSelectAsientos, fondo}){
    const handleSelectState = (seat) => {
        const isSelected = asientosSeleccionados.includes(seat);
        if(isSelected){
            onSelectAsientos(
                asientosSeleccionados.filter(selectedSeat => selectedSeat !== seat)
            )
        } else {
            onSelectAsientos([...asientosSeleccionados, seat])
        }
    }

    return(
        <Grid className="cinema">
            <Grid style={{display: 'flex', justifyContent: 'center', transform: 'rotateX(-30deg)'}}>
                <Image src={`https://image.tmdb.org/t/p/w500${fondo}`} width='60%' />
            </Grid>
            <Grid className="seats" >
                {
                    seats.map( seat => {
                        const isSelected = asientosSeleccionados.includes(seat)
                        const isOccupied = pelicula.occupied.includes(seat)
                        return(
                            <span
                                tabIndex='0'
                                key={seat}
                                className={clsx(
                                    'seat',
                                    isSelected && 'selected',
                                    isOccupied && 'occupied'
                                )}
                                onClick={ isOccupied ? null : () => handleSelectState(seat)}
                            />
                        )
                    })
                }
            </Grid>
        </Grid>
    );
}