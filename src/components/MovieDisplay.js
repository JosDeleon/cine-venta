import { Card, Image, View, Heading, Flex, Text, Button, useTheme, Rating } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';


function MovieDisplay(props){
    const nav = useNavigate();
    const { tokens } = useTheme();
    const { overview: descripcion, poster_path: posterPelicula, title: titulo, vote_average, id: idPelicula, backdrop_path: fondo } = props.info;
    const peliValor = props.peliValor;

    const calificacion = Math.round(vote_average/2);
    
    return(
        <View
            backgroundColor={tokens.colors.background.tertiary}
            padding={tokens.space.medium}
            width='100%'
        >
            <Card variation='elevated'>
                <Flex direction='row' alignItems='flex-start'>
                    <Image 
                        alt='Poster Pelicula'
                        src={`https://image.tmdb.org/t/p/w500${posterPelicula}`}
                        width='20%'
                    />
                    <Flex direction='column' alignItems='flex-start' gap={tokens.space.medium}>
                        <Heading level={5}>{titulo}</Heading>
                        <Text as='span'>{descripcion}</Text>
                        <br />
                        <Button 
                            variation='primary' 
                            alignSelf='flex-end' 
                            onClick={() => {
                                nav("/tickets", { 
                                    state: { 
                                        idPeli: idPelicula, 
                                        valor: peliValor, 
                                        nombre: titulo, 
                                        pantalla: fondo 
                                    }
                                })}
                            }>Comprar Boletos</Button>
                        <Flex direction='row'>
                            <Text as='span'>Clasificación General: </Text>
                            <Rating value={calificacion} maxValue={5} fillColor="hsl(300, 95%, 30%)" emptyColor="hsl(210, 5%, 94%)" />
                        </Flex>
                    </Flex>
                </Flex>
            </Card>

        </View>
    );
 }

 export default MovieDisplay;