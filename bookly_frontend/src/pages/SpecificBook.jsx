import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../containers/Navbar';
import { useDispatch } from 'react-redux';
import { loadBook } from '../actions/bookActions';
import store from '../store';
import SpecificBookContainer from '../containers/SpecificBookContainer';
import { Box } from '@mui/material';

let SpecificBook = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    let book = store.getState()?.book;
    const [data, setData] = useState({ ...book });

    useEffect(() => {
        if (book && (book.bookId === id)) {
            setData(book);
        } else {
            dispatch(loadBook(id));
            setData(book);
        }
    }, [id, dispatch, book]);

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
                <SpecificBookContainer data={data} />
            </Box>
        </>
    )
}

export default SpecificBook