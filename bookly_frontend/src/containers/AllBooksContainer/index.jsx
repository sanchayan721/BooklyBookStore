import { Add } from '@mui/icons-material';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadAllBooks } from '../../actions/bookActions';
import SingleBookInAllBooksComponent from '../../components/SingleBookInAllBooksComponent';
import store from '../../store';

const mapStateToProps = (state) => ({
    books: state.books
});

let AllBooksContainer = () => {

    const dispatch = useDispatch();
    const [books, setAllBooks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        dispatch(loadAllBooks());
    }, [dispatch]);

    let bookState = store.getState()?.books;

    useEffect(() => {
        setAllBooks([...bookState])
    }, [bookState]);

    return (
        <Box
            margin={'auto'}
        >
            <Paper
                elevation={1}
                sx={{
                    height: 'max-content',
                    width: '80vw',
                    padding: '2em',
                    margin: 'auto'
                }}
            >
                <Typography
                    variant='h5'
                    fontWeight={'bold'}
                >
                    All Books
                </Typography>
                <ul
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        gap: '2em',
                        listStyle: 'none',
                        padding: '0'
                    }}
                >
                    {
                        !books?.length > 0 &&
                        <>
                            <Typography variant='body1'>No books are added yet</Typography>
                            <Box
                                width={'100%'}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <IconButton
                                    aria-label='add a book'
                                    size='large'
                                    sx={{
                                        height: 'max-content',
                                        width: '8em',
                                        borderRadius: '0.2em',
                                        border: '0.8px solid var(--primary-color)'
                                    }}
                                    color={'primary'}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        history.push("/books/add_new_book");
                                    }}
                                >
                                    <Box>
                                        <Add fontSize="inherit" />
                                        <Typography variant='body1'>Add New Book</Typography>
                                    </Box>
                                </IconButton>
                            </Box>
                        </>
                    }
                    {
                        books?.length > 0 && books.map((book, key) => {
                            return (
                                <React.Fragment key={key}>
                                    <SingleBookInAllBooksComponent book={book} />
                                </React.Fragment>
                            )
                        })
                    }
                </ul>
            </Paper>
        </Box>
    )
}

AllBooksContainer = connect(mapStateToProps)(AllBooksContainer);

export default AllBooksContainer;