import { Box } from '@mui/material'
import React from 'react'
import AllAuthorsContainer from '../containers/AllAuthorsContainer'
import AllBooksContainer from '../containers/AllBooksContainer'
import Navbar from '../containers/Navbar'
import SEO from '../containers/SEO'

const Home = () => {

    return (
        <div className="home">
            <SEO title={`Bookly Book Store`} />
            <Navbar />
            <Box
                maxHeight={`calc(100vh - 5.5em - 2*4em)`}
                overflow={'auto'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                padding={'9.5em 0 4em 0'}
                gap={'4em'}
            >
                <AllBooksContainer />
                <AllAuthorsContainer />
            </Box>
        </div>
    )
}

export default Home