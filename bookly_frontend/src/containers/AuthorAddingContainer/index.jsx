import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { clearAuthorCache } from '../../actions/authorActions';
import AuthorAddingForm from '../../components/AuthorAddingForm'
import AuthorImageUpdateComponent from '../../components/AuthorImageUpdateComponent'

const mapStateToProps = (state) => ({
    author: state.author
});

let AuthorAddingContainer = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearAuthorCache());
    },[dispatch]);

    return (
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
                Add a New Author
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
                <AuthorAddingForm />
            </Paper>
        </Box>
    )
};

AuthorAddingContainer = connect(mapStateToProps)(AuthorAddingContainer);

export default AuthorAddingContainer;