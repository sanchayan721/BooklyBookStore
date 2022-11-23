import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadAuthor } from '../actions/authorActions';
import Navbar from '../containers/Navbar';
import SpecificAuthorContainer from '../containers/SpecificAuthorContainer';
import store from '../store';

const SpecificAuthor = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const [data, setData] = useState({});

    useEffect(() => {
        dispatch(loadAuthor(id));
        setData({ ...store.getState()?.author });
    }, [id, dispatch]);

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
                <SpecificAuthorContainer data={data} />
            </Box>
        </>
    )
}

export default SpecificAuthor