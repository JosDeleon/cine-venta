import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useState } from "react";
import { Card, Flex, Grid, Heading, Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider, ToggleButton, ToggleButtonGroup, View } from "@aws-amplify/ui-react";
import { listFuncions } from "../graphql/queries";
import { API } from 'aws-amplify';
import { graphqlOperation } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { useEffect } from "react";

const theme = {
    name: 'table-theme',
    tokens: {
      components: {
        table: {
          row: {
            hover: {
              backgroundColor: { value: '{colors.blue.20}' },
            },
  
            striped: {
              backgroundColor: { value: '{colors.blue.10}' },
            },
          },
  
          header: {
            color: { value: '{colors.blue.60}' },
            fontSize: { value: '{fontSizes.large}' },
          },
  
          data: {
            fontWeight: { value: '{fontWeights.semibold}' },
          },
        },
      },
    },
};

const formatFecha = (fecha) => {
    return `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`
}

const infoFunciones = {
    '569094': {'id': 569094, 'reg': 0, 'vip': 0, 'valor': 28, 'nombre': 'Spider-Man: Cruzando el Multiverso'},
    '667538': {'id': 667538, 'reg': 0, 'vip': 0, 'valor': 30, 'nombre': 'Transformers: El despertar de las bestias'},
    '346698': {'id': 346698, 'reg': 0, 'vip': 0, 'valor': 35, 'nombre': 'Barbie'}, 
    '298618': {'id': 298618, 'reg': 0, 'vip': 0, 'valor': 33, 'nombre': 'Flash'}
};

const idPelis = [ '569094', '667538', '298618', '346698'];

function Reports() {
    useEffect(() => {
        getFuncionesFecha(formatFecha(new Date()))
    }, []);
    
    const [ dataTabla, setDataTabla ] = useState(infoFunciones);
    const [ tipoReporte, setTipoReporte ] = useState('generales');
    const [ fecha, setFecha ] = useState(formatFecha(new Date()));
    
    
    const getFuncionesFecha = async (fecha) => {
        await API.graphql(graphqlOperation(listFuncions, {
            filter: {
                fecha: {
                    eq: fecha
                }
            },
            authMode: GRAPHQL_AUTH_MODE.API_KEY
        })).then( ({data}) => {
            console.log("ResultadoDB: ",data.listFuncions.items)
            const resultadoFunciones = data.listFuncions.items;
            
            idPelis.map( id => {
                dataTabla[id].reg = 0;
                dataTabla[id].vip = 0;
            })

            resultadoFunciones.map( (funcion) => {
                const { idPelicula, sala, asientos } = funcion;
                if(sala === 'REG1' || sala === 'REG2'){
                    dataTabla[idPelicula].reg = dataTabla[idPelicula].reg + asientos.length
                } else {
                    dataTabla[idPelicula].vip = dataTabla[idPelicula].vip + asientos.length
                }
            })
        }).catch( err => {
            console.log(err)
        });
    }

    const handleFechaChange = (e) => {
        let fechaSeleccionada = `${e.getDate()}/${e.getMonth()}/${e.getFullYear()}`;
        setFecha(fechaSeleccionada);
        getFuncionesFecha(fechaSeleccionada);
    }

    return(
        <Grid
            templateColumns={{base: '1fr', large: '15% 85%'}}
            marginTop='1rem'
        > 
            <Flex direction={{base: 'column', large: 'row'}} columnSpan={3} width='100%'>

                <Flex direction='column' width='19%'>
                    <Heading level={5}>Película</Heading>
                    <ToggleButtonGroup
                        value={tipoReporte}
                        onChange={setTipoReporte}
                        variation='primary'
                        direction='column'
                        isExclusive
                    >
                        <ToggleButton value='generales' width='100%'> Ventas Generales </ToggleButton>
                        {/* <ToggleButton value='2' width='100%'> ALGO AQUI </ToggleButton>
                        <ToggleButton value='3' width='100%'> ALGO AQUI </ToggleButton> */}
                    </ToggleButtonGroup>
                    <View style={{ marginTop: '0.8rem'}}>
                        <Calendar onChange={handleFechaChange} calendarType='gregory' />
                    </View>
                </Flex>
                <Flex direction='row' marginTop='2.5rem'>
                    <ThemeProvider theme={theme} colorMode='dark'>
                        <Card variation='elevated'>
                            <Table
                                highlightOnHover={true}
                                variation='striped'
                                caption={`Ventas del dia ${fecha}`}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell as='th'>Película</TableCell>
                                        <TableCell as='th'>Boletos Vendidos</TableCell>
                                        <TableCell as='th'>Salas Regulares</TableCell>
                                        <TableCell as='th'>Salas Vip</TableCell>
                                        <TableCell as='th'>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{dataTabla['569094'].nombre}</TableCell>
                                        <TableCell>{dataTabla['569094'].reg  + dataTabla['569094'].vip}</TableCell>
                                        <TableCell>{dataTabla['569094'].reg}</TableCell>
                                        <TableCell>{dataTabla['569094'].vip}</TableCell>
                                        <TableCell>Q{(dataTabla['569094'].reg * dataTabla['569094'].valor) + ((dataTabla['569094'].valor + 50) * dataTabla['569094'].vip) }.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{dataTabla['667538'].nombre}</TableCell>
                                        <TableCell>{dataTabla['667538'].reg  + dataTabla['667538'].vip}</TableCell>
                                        <TableCell>{dataTabla['667538'].reg}</TableCell>
                                        <TableCell>{dataTabla['667538'].vip}</TableCell>
                                        <TableCell>Q{(dataTabla['667538'].reg * dataTabla['667538'].valor) + ((dataTabla['667538'].valor + 50) * dataTabla['667538'].vip) }.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{dataTabla['298618'].nombre}</TableCell>
                                        <TableCell>{dataTabla['298618'].reg  + dataTabla['298618'].vip}</TableCell>
                                        <TableCell>{dataTabla['298618'].reg}</TableCell>
                                        <TableCell>{dataTabla['298618'].vip}</TableCell>
                                        <TableCell>Q{(dataTabla['298618'].reg * dataTabla['298618'].valor) + ((dataTabla['298618'].valor + 50) * dataTabla['298618'].vip) }.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{dataTabla['346698'].nombre}</TableCell>
                                        <TableCell>{dataTabla['346698'].reg  + dataTabla['346698'].vip}</TableCell>
                                        <TableCell>{dataTabla['346698'].reg}</TableCell>
                                        <TableCell>{dataTabla['346698'].vip}</TableCell>
                                        <TableCell>Q{(dataTabla['346698'].reg * dataTabla['346698'].valor) + ((dataTabla['346698'].valor + 50) * dataTabla['346698'].vip) }.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Card>
                    </ThemeProvider>
                </Flex>
            </Flex>
        </Grid>
    );
}

export default Reports;