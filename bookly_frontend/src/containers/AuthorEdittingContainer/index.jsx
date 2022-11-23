import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadAuthor } from '../../actions/authorActions';
import AuthorEdittingForm from '../../components/AuthorEdittingForm';
import AuthorImageUpdateComponent from '../../components/AuthorImageUpdateComponent';
import store from '../../store';
import SEO from '../SEO';

const mapStateToProps = (state) => ({
    author: state.author
});

let AuthorEdittingContainer = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(loadAuthor(id));
    }, [dispatch, id])

    return (
        <>
            <SEO title={`Editting --> ${store.getState().author?.firstName} ${store.getState().author?.lastName}`} />
            <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                gap={'4em'}
            >
                <Typography
                    variant='h4'
                    sx={{
                        margin: 'auto'
                    }}
                    color={'secondary'}
                    fontWeight={600}
                >
                    {
                        `Editting "${store.getState().author?.firstName} ${store.getState().author?.lastName}"`
                    }
                </Typography>
                <Paper
                    elevation={5}
                    sx={{
                        width: '90%',
                        height: '100%',
                        padding: '4em',
                        borderRadius: '1em',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '4em'
                    }}
                >
                    <AuthorImageUpdateComponent />
                    <AuthorEdittingForm />
                </Paper>
            </Box>
        </>
    )
};

AuthorEdittingContainer = connect(mapStateToProps)(AuthorEdittingContainer);

export default AuthorEdittingContainer