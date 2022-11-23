import { Box } from '@mui/material';
import React from 'react';
import BookEdittingContainer from '../containers/BookEdittingContainer';
import Navbar from '../containers/Navbar';

const EditBook = () => {
    return (
        <>
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
                <BookEdittingContainer />
            </Box>
        </>
    )
}

export default EditBook;