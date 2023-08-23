import { Flex, Grid, View, Heading, Icon, Menu, MenuItem } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { GiFilmProjector } from 'react-icons/gi';
import '@aws-amplify/ui-react/styles.css';
import './NavBar.css'

function NavBar() {
    const nav = useNavigate();
    return(
        <Grid
            templateColumns={{base: '1fr', large: '15% 70% 15%'}}
            templateRows="4rem "
        >   
            <Flex 
                direction='row'
                backgroundColor="#55efc4" 
                columnSpan={3}
                width='100%'
                backgroundImage="linear-gradient(315deg, #55efc4 0%, #000000 74%)"
                style={{flexDirection: 'row', alignItems: 'center'}}
                height='4.0rem'
            >   
                <View style={{alignItems: 'center' }} marginLeft={{base: "2%", large: '17%'}}>
                    <Menu className="my-menu-content" triggerClassName="my-menu-trigger">
                        <MenuItem onClick={ () => { nav("/")}} >Cartelera</MenuItem>
                        <MenuItem onClick={ () => { nav("/reports")}} >Reportería</MenuItem>
                    </Menu>
                </View>
                <View 
                    as='div'
                    height='4.0rem'
                    width='2.8rem'
                    style={{ flexDirection: 'column'}}
                    marginLeft={{base: '5%', large:'23%' }}
                >            
                    <Icon
                        ariaLabel='Javascript' 
                        as={GiFilmProjector} 
                        viewBox={{ width: 200, height: 200 }} 
                        color="white"
                        alignSelf='center'
                        onClick={() => { nav("/")}}
                        style={{ cursor: 'pointer'}}
                    />
                </View>
                <View 
                    as='div'
                    display='flex'
                    height='4.0rem'
                    width='10.0rem'
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}
                >
                    <Heading 
                        level={4} 
                        color='white' 
                        onClick={() => { nav("/")}}
                        style={{ cursor: 'pointer'}}
                    >Cinema Ticket</Heading>
                </View>
            </Flex>
        </Grid>
    );
}

export default NavBar;
