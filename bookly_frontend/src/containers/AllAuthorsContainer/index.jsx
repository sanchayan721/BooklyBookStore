import { Add } from '@mui/icons-material';
import { Box, Card, CardMedia, Divider, IconButton, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { loadAllAuthors } from '../../actions/authorActions';
import SingleAuthorInAllAuthorsComponent from '../../components/SingleAuthorInAllAuthorsComponent';
import store from '../../store';
import { DEFAULT_AUTHOR_IMAGE } from '../../utils';

const mapStateToProps = (state) => ({
    authors: state.authors
})

let AllAuthorsContainer = () => {
    const dispatch = useDispatch();
    const [authors, setAllAuthors] = useState([]);
    const history = useHistory();


    useEffect(() => {
        dispatch(loadAllAuthors());
    }, [dispatch])

    let authorsState = store.getState()?.authors;

    useEffect(() => {
        setAllAuthors([...authorsState])
    }, [authorsState]);

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
                    All Authors
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
                        !authors?.length > 0 &&
                        <>
                            <Typography variant='body1'>No authors are added yet</Typography>
                            <Box
                                width={'100%'}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <IconButton
                                    aria-label='add an author'
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
                                        history.push("/authors/add_new_author");
                                    }}
                                >
                                    <Box>
                                        <Add fontSize="inherit" />
                                        <Typography variant='body1'>Add New Author</Typography>
                                    </Box>
                                </IconButton>
                            </Box>
                        </>
                    }
                    {
                        authors?.length > 0 && authors.map((author, key) => {
                            return (
                                <React.Fragment key={key}>
                                    <SingleAuthorInAllAuthorsComponent author={author} />
                                </React.Fragment>
                            )
                        })
                    }
                </ul>
            </Paper>
        </Box>
    )
}

AllAuthorsContainer = connect(mapStateToProps)(AllAuthorsContainer);
export default AllAuthorsContainer