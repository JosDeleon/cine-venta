import { Card, Image, View, Heading, Flex, Badge, Text, Button, useTheme, Rating } from '@aws-amplify/ui-react';

function MovieDisplay(props){
    const { tokens } = useTheme();
    const { overview: descripcion, poster_path: posterPelicula, title: titulo, vote_average } = props.info;
    const calificacion = Math.round(vote_average/2);

    return(
        <View
            backgroundColor={tokens.colors.background.tertiary}
            padding={tokens.space.medium}
            width='60%'
        >
            <Card variation='elevated'>
                <Flex direction='row' alignItems='flex-start'>
                    <Image 
                        alt='Poster Pelicula'
                        src={`https://image.tmdb.org/t/p/w500${posterPelicula}`}
                        width='20%'
                    />
                    <Flex direction='column' alignItems='flex-start' gap={tokens.space.medium}>
                        <Flex>
                            {/* <Badge size='large' variation='info'>
                                plus
                            </Badge>
                            <Badge size='large' variation='success'>
                                verified
                            </Badge> */}
                        </Flex>
                        <Heading level={5}>{titulo}</Heading>
                        <Text as='span'>{descripcion}</Text>
                        <br />
                        <Button variation='primary' alignSelf='flex-end'>Comprar Boletos</Button>
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