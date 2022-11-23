import React from 'react'
import { AppBar, Toolbar, Stack, Button, Box, Typography, IconButton, Divider, ButtonGroup } from '@mui/material'
import Logo from '../../components/Logo/Logo';
import { useHistory } from 'react-router-dom';
import "./navbar.scss";
import { Home, MenuBook, PersonAdd } from '@mui/icons-material';


const Navbar = () => {

    const history = useHistory();
    return (
        <AppBar
            position="fixed"
            className='navbar'
            height='5.5em'
            sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(88, 61, 136, 0.85)'
            }}
        >
            <Toolbar className='barcontent'>
                <Logo />
                <ButtonGroup
                    size="large"
                    aria-label='navbar actions'
                    color='secondary'
                >
                    <IconButton
                        aria-label='add an author'
                        size='large'
                        sx={{
                            height: 'max-content',
                            padding: '1em',
                            borderRadius: '0.2em',

                        }}
                        color={'inherit'}
                        onClick={(event) => {
                            event.preventDefault();
                            history.push("/");
                        }}
                    >
                        <Box
                            gap={'0.5em'}
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'

                        >
                            <Home fontSize="inherit" />
                            <Typography variant='body1'>Home</Typography>
                        </Box>
                    </IconButton>
                    <Divider flexItem orientation='vertical' />
                    <IconButton
                        aria-label='add an author'
                        size='large'
                        sx={{
                            height: 'max-content',
                            padding: '1em',
                            borderRadius: '0.2em',

                        }}
                        color={'inherit'}
                        onClick={(event) => {
                            event.preventDefault();
                            history.push("/books/add_new_book");
                        }}
                        disabled={history.location.pathname === '/books/add_new_book'}
                    >
                        <Box
                            gap={'0.5em'}
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'

                        >
                            <MenuBook fontSize="inherit" />
                            <Typography variant='body1'>Add Book</Typography>
                        </Box>
                    </IconButton>
                    <Divider flexItem orientation='vertical' />
                    <IconButton
                        aria-label='add an author'
                        size='large'
                        sx={{
                            height: 'max-content',
                            padding: '1em',
                            borderRadius: '0.2em',

                        }}
                        color={'inherit'}
                        onClick={(event) => {
                            event.preventDefault();
                            history.push("/authors/add_new_author");
                        }}
                        disabled={history.location.pathname === '/authors/add_new_author'}
                    >
                        <Box
                            gap={'0.5em'}
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'

                        >
                            <PersonAdd fontSize="inherit" />
                            <Typography variant='body1'>Add Author</Typography>
                        </Box>
                    </IconButton>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar