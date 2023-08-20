import './Seats.css';
import 'react-calendar/dist/Calendar.css';
import clsx from "clsx";
import Calendar from 'react-calendar';
import Swal from 'sweetalert2';
import { Badge, Button, Card, Flex, Grid, Heading, Image, Radio, RadioGroupField, SelectField, TabItem, Tabs, View } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { listFuncions } from '../graphql/queries';
import { createFuncion, updateFuncion, createReserva } from '../graphql/mutations';
import { API } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { graphqlOperation } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const formatFecha = (fecha) => {
    return `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`
}
  
const seats = Array.from({ length: 8 * 8 }, (_, i) => i);
const salas = ["REG1", "REG2", "VIP1", "VIP2"];

function TicketsSelect(){
    const nav = useNavigate();
    const { state } = useLocation();
    const valor = state.valor;
    
    const [ idFuncion, setIdFuncion ] = useState('');
    const [ ocupados, setOcupados ] = useState([]);
    const [ libres, setLibres ] = useState([]);

    // const [ valor, setValor ] = useState(state.valor);
    const [ total, setTotal ] = useState(0);
    const [ sala, setSala ] = useState('REG1');
    const [ hora, setHora ] = useState('11');
    const [ sede, setSede ] = useState('');
    const [ fecha, setFecha ] = useState(formatFecha(new Date()));
    
    const [ formCompleto, setFormCompleto ] = useState(!false);
    const [ esVip, setEsVip ] = useState(false);
    const [ crearFuncion, setCrearFuncion ] = useState(false);

    useEffect(() => {
        if(esVip){
            setTotal((valor + 50) * libres.length)
        } else {
            setTotal((valor) * libres.length)
        }
    }, [libres, esVip, valor]);

    useEffect(() => {
        if(sede !== '' && libres.length !== 0) {
            setFormCompleto(false);
        } else {
            setFormCompleto(true);
        }
    }, [sede, libres]);

    const crearReservaDB = async (emailReserva) => {
        await API.graphql({
            query: createReserva,
            variables: {
                input: {
                    email: emailReserva,
                    titulo: state.nombre,
                    asientos: libres.length,
                    valor: total,
                    fecha: fecha,
                    url: state.pantalla
                }
            },
            authMode: GRAPHQL_AUTH_MODE.API_KEY
        }).then( (res) => {
            console.log("FUNCION CREADA")
            console.log(res)
        }).catch( err => {
            console.log("==ERROR AL CREAR LA FUNCION==")
            console.log(err)
            console.log("=============================")
        });
    }

    const handleReservaBoletos = async () => {
        console.log('intentamos ENVIAR')
        
        Swal.fire({
            title: "Ingresa tu correo electrónico",
            text: `Ingresa tu correo electronico para recibir la confirmación de tu reserva por un total de Q.${total} para la película ${state.nombre}`,
            input: 'email',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar Reserva',
            confirmButtonColor: '#008b8b',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: (correo) => {
                crearReservaDB(correo);
                if(crearFuncion){
                    crearFuncionDB();
                } else {
                    actualizarFuncion();
                }
                // return fetch(`//api.github.com/users/${login}`)
                // .then(response => {
                //     if (!response.ok) {
                //     throw new Error(response.statusText)
                //     }
                //     return response.json()
                // })
                // .catch(error => {
                //     Swal.showValidationMessage(
                //     `Request failed: ${error}`
                //     )
                // })
            }
        }).then( res => {
            console.log("==EXITO AL RESERVAR BOLETOS==");
            console.log(res);
            console.log("=============================");
            Swal.fire({
                icon: 'success',
                title: 'Reserva Confirmada',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                nav("/");
            });
        }).catch( err => {
            console.log("==ERROR AL RESERVAR BOLETOS==");
            console.log(err);
            console.log("=============================");
        });

    } 
    
    const handleFechaChange = (e) => {
        let fechaSeleccionada = `${e.getDate()}/${e.getMonth()}/${e.getFullYear()}`;
        console.log(fechaSeleccionada)
        setFecha(fechaSeleccionada);
        consultarFuncion(sede, sala, fechaSeleccionada, hora)
    }
    
    const handleSedeChange = async (e) => {
        let sedeSeleccionada = e.target.value;
        setSede(e.target.value)
        consultarFuncion(sedeSeleccionada, sala, fecha, hora);
    }

    const handleHoraChange = (e) => {
        let horaSeleccionada = e.target.value;
        setHora(horaSeleccionada);
        consultarFuncion(sede, sala, fecha, horaSeleccionada)
    }

    const handleSalaChange = async (e) => {
        if(e === '2' || e === '3'){
            setEsVip(true);
        }else {
            setEsVip(false);
        }

        let salaSeleccionada = salas[e];

        setSala(salaSeleccionada);
        consultarFuncion(sede, salaSeleccionada, fecha, hora);
    }

    const consultarFuncion = async (sede, sala, fecha, hora) => {
        await API.graphql(graphqlOperation(listFuncions, {
            filter: {
                sede: {
                    eq : sede
                },
                sala: {
                    eq : sala
                },
                fecha: {
                    eq: fecha
                },
                idPelicula: {
                    eq: state.idPeli
                },
                hora: {
                    eq: hora
                }
            },
            authMode: GRAPHQL_AUTH_MODE.API_KEY
        })).then( ({data}) => {
            console.log(data.listFuncions.items);
            setCrearFuncion(false);
            setIdFuncion(data.listFuncions.items[0].id)
            let asientos = data.listFuncions.items[0].asientos;

            if(asientos.length > 0){
                setOcupados(asientos);
                asientos.forEach(asiento => {
                    if(libres.includes(asiento)){

                        libres.splice(libres.indexOf(asiento), 1);
                        // libres.pop(asiento);
                    }
                });

            }
        }).catch( err => {
            setCrearFuncion(true);
            setOcupados([]);
        });
    }

    const crearFuncionDB = async () => {
        await API.graphql({
            query: createFuncion,
            variables: {
                input: {
                    sede: sede,
                    idPelicula: state.idPeli,
                    sala: sala,
                    fecha: fecha,
                    hora: hora,
                    asientos: ocupados.concat(libres)
                }
            },
            authMode: GRAPHQL_AUTH_MODE.API_KEY
        }).then( (res) => {
            console.log("FUNCION CREADA")
            console.log(res)
        }).catch( err => {
            console.log("==ERROR AL CREAR LA FUNCION==")
            console.log(err)
            console.log("=============================")
        });
    }

    const actualizarFuncion = async () => {
        console.log(idFuncion)
        await API.graphql({
            query: updateFuncion,
            variables: {
                input: {
                    id: idFuncion,
                    asientos: ocupados.concat(libres)
                }
            }
        }).then( res => {
            console.log("FUNCION ACTUALIZADA")
            console.log(res)
        }).catch( err => {
            console.log("==ERROR AL ACTUALIZAR LA FUNCION==")
            console.log(err)
            console.log("=============================")
        })
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
                    <Tabs justifyContent='center' marginBottom='0.8rem' onChange={handleSalaChange}>
                        <TabItem title="Regular 1" onClick={() => setSala("REG1")}
                        >
                            <Cinema fondo={state.pantalla} pelicula={ocupados} asientosSeleccionados={libres} onSelectAsientos={ selectedSeats => setLibres(selectedSeats)}/>
                        </TabItem>
                        <TabItem title="Regular 2" onClick={() => setSala("REG2")}
                        >
                            <Cinema fondo={state.pantalla} pelicula={ocupados} asientosSeleccionados={libres} onSelectAsientos={ selectedSeats => setLibres(selectedSeats)}/>
                        </TabItem>
                        <TabItem title="Vip 1" onClick={() => setSala("VIP1")}>
                            <Cinema fondo={state.pantalla} pelicula={ocupados} asientosSeleccionados={libres} onSelectAsientos={ selectedSeats => setLibres(selectedSeats)}/>
                        </TabItem>
                        <TabItem title="Vip 2" onClick={() => setSala("VIP2")}>
                            <Cinema fondo={state.pantalla} pelicula={ocupados} asientosSeleccionados={libres} onSelectAsientos={ selectedSeats => setLibres(selectedSeats)}/>
                        </TabItem>
                    </Tabs>
                    <Flex direction='row' justifyContent='center'>
                        <Button 
                            variation="link" 
                            onClick={() => {setLibres([])}}
                            style={{ borderColor: 'white'}}
                        >Limpiar Seleccion</Button>
                        <Badge variation='success' width="30%" alignSelf="center" >Total: Q.{total}</Badge>
                    </Flex>
                </Flex>
            </View>
            <View>
                <Card>
                    <Flex direction='column'>
                            <SelectField 
                                variation="quiet" 
                                label='Sede' 
                                placeholder="Seleccione Sede" 
                                marginBottom='1rem' 
                                size="small"
                                value={sede}
                                onChange={handleSedeChange}
                            >
                                <option value='N'>Naranjo</option>
                                <option value='R'>Roosevelt</option>
                                <option value='Z1'>Zona 10</option>
                                <option value='Z6'>Zona 16</option>
                            </SelectField>
                            <Flex direction='row' style={{flexDirection: 'row', alignItems: 'center', marginTop: '0.8rem'}}>
                                <Heading level={6} fontWeight='normal'>Horario: </Heading>
                                <RadioGroupField
                                    direction='row'
                                    value={hora}
                                    onChange={handleHoraChange}
                                >
                                    <Radio value='11' onClick={() => setHora("11")}>11:00</Radio>
                                    <Radio value='3' onClick={() => setHora("3")}>15:00</Radio>
                                    <Radio value='6' onClick={() => setHora("6")}>18:00</Radio>
                                    <Radio value='9' onClick={() => setHora("9")}>21:00</Radio>
                                </RadioGroupField>
                            </Flex>
                            <View style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'center', }}>
                                <Calendar minDate={new Date()} onChange={handleFechaChange} calendarType='gregory' />
                            </View>
                            <Button onClick={handleReservaBoletos} variation="primary" isDisabled={formCompleto} size="small" marginTop='2rem' type="button" width='100%'>Reservar Asientos</Button>
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
                        const isOccupied = pelicula.includes(seat)
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