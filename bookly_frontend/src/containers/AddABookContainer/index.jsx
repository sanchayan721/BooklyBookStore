import { CardContent, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { clearBookCache } from '../../actions/bookActions';
import BookAddingFormComponent from '../../components/BookAddingForm';
import CoverUploadComponent from '../../components/CoverUpdateComponent';

const mapStateToProps = (state) => ({
    book: state.book
});

let BookAddingContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(clearBookCache());
    }, []);

    return (
        <Paper
            elevation={0}
            sx={{ maxWidth: 1500 }}
            style={{
                margin: 'auto',
            }}
        >
            <CardContent>
                <Grid container>
                    <Typography
                        variant='h4'
                        sx={{
                            margin: 'auto'
                        }}
                        color={'secondary'}
                        fontWeight={'bold'}
                    >
                        Add New Book
                    </Typography>
                    <Grid
                        container
                        padding={'4em'}
                        gap={'4em'}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid 
                            item md={4} sm={12}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <CoverUploadComponent />
                        </Grid>
                        <Grid item md={7} sm={12}>
                            <BookAddingFormComponent />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Paper>
    )
}

BookAddingContainer = connect(mapStateToProps)(BookAddingContainer);

export default BookAddingContainer