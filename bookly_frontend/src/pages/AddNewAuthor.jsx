import { Box } from '@mui/material'
import React from 'react'
import AuthorAddingContainer from '../containers/AuthorAddingContainer'
import Navbar from '../containers/Navbar'
import SEO from '../containers/SEO'

const AddNewAuthor = () => {
    return (
        <>
            <SEO title={"Add An Author"}/>
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
                <AuthorAddingContainer />
            </Box>
        </>
    )
}

export default AddNewAuthor