import { CardContent, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearAuthorCache } from '../../actions/authorActions';
import { loadBook } from '../../actions/bookActions';
import BookEdittingFormComponent from '../../components/BookEdittingForm';
import CoverUploadComponent from '../../components/CoverUpdateComponent';
import store from '../../store';
import SEO from '../SEO';


const mapStateToProps = (state) => ({
    book: state.book
});

let BookEdittingContainer = () => {
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(loadBook(id));
        dispatch(clearAuthorCache());
    }, [dispatch, id]);

    return (
        <>
            <SEO title = {`Editting --> ${ store.getState().book?.title }`}/>
            <Paper
                elevation={0}
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
                            {

                                `Editting “${ store.getState().book?.title }”`
                            }
                        </Typography>
                        <Grid
                            container
                            padding={10}
                            gap={10}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid 
                                item md={4} sm={12}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <CoverUploadComponent />
                            </Grid>
                            <Grid item md={7} sm={12}>
                                <BookEdittingFormComponent />
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Paper>
        </>
    )
}

BookEdittingContainer = connect(mapStateToProps)(BookEdittingContainer);

export default BookEdittingContainer