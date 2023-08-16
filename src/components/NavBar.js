import { Flex, View, Heading, Icon } from '@aws-amplify/ui-react';
import { GiFilmProjector } from 'react-icons/gi';

function NavBar() {
    return(
        <Flex 
            direction='row'
            backgroundColor="#55efc4" 
            backgroundImage="linear-gradient(315deg, #55efc4 0%, #000000 74%)"
            style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}
            height='4.0rem'
        >   

            <View 
                as='div'
                height='4.0rem'
                width='2.8rem'
                style={{ flexDirection: 'column'}}
            >            
                <Icon 
                    ariaLabel='Javascript' 
                    as={GiFilmProjector} 
                    viewBox={{ width: 200, height: 200 }} 
                    color="white"
                    alignSelf='center'
                />
            </View>
            <View 
                as='div'
                display='flex'
                height='4.0rem'
                width='10.0rem'
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}
            >
                <Heading level={4} color='white'>Cinema Ticket</Heading>
            </View>
        </Flex>
    );
}

export default NavBar;
