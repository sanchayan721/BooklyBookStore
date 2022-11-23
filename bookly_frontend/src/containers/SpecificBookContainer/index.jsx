import React, { useState } from 'react'
import { Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/material';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BookCoverComponent from '../../components/BookCoverComponent';
import BookDetailsComponent from '../../components/BookDetailsComponent';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { deleteBookWithId } from '../../actions/bookActions';
import store from '../../store';
import SEO from '../SEO';


const mapStateToProps = (state) => ({
    data: state.book
});

let SpecificBookContainer = ({ data }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    let [loading, setLoading] = useState({
        delete: false,
        edit: false
    });

    const handleDeleteBook = (event) => {
        event.preventDefault();
        setLoading({ ...loading, delete: true });
        setTimeout(() => {
            dispatch(deleteBookWithId(store.getState()?.book?.bookId));
            setLoading({ ...loading, delete: false });
            history.push('/');
        }, 1500);
    };

    const handleEditThisBook = (event) => {
        event.preventDefault();
        setLoading({ ...loading, edit: true });
        setTimeout(() => {
            setLoading({ ...loading, edit: false });
            history.push(`/books/${data.bookId}/edit`);
        }, 1500);
    };

    return (
        <>
            <SEO title={`${data?.title}`} />
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '5em',
                        paddingBottom: '4em',
                        minHeight: "40em",
                    }}
                >
                    <Box
                        sx={{
                            width: "30em",
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'flex-start',

                        }}
                    >
                        <BookCoverComponent cover={data?.coverImagePath} />
                    </Box>

                    <Box>
                        <BookDetailsComponent data={data} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '3em',
                        paddingBottom: '4em'
                    }}
                >
                    <LoadingButton
                        variant='contained'
                        color='error'
                        size='large'
                        startIcon={<Delete />}
                        loading={loading.delete}
                        loadingPosition={"start"}
                        onClick={handleDeleteBook}
                        sx={{
                            width: '15em',
                            height: "3em"
                        }}
                    >
                        Delete This Book
                    </LoadingButton>
                    <LoadingButton
                        variant='contained'
                        color='primary'
                        size='large'
                        startIcon={<Edit />}
                        loading={loading.edit}
                        loadingPosition={"start"}
                        onClick={handleEditThisBook}
                        sx={{
                            width: '15em',
                            height: "3em"
                        }}
                    >
                        Edit This Book
                    </LoadingButton>
                </Box>
            </Box>
        </>
    )
}

SpecificBookContainer = connect(mapStateToProps)(SpecificBookContainer);

export default SpecificBookContainer