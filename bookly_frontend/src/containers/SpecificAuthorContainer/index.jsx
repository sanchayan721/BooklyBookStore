import { Add, Delete, Edit } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button, Divider, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteAuthorWithId } from '../../actions/authorActions'
import AboutAuthor from '../../components/AboutAuthorComponent'
import AuthorDetailsComponent from '../../components/AuthorDetailsComponent'
import store from '../../store'
import SEO from '../SEO'

const mapStateToProps = (state) => ({
    data: state.author
});

let SpecificAuthorContainer = ({ data }) => {

    let { books, bio, ...author_data } = data;
    let { lastName, authorImagePath, email, ...about_author_data } = data;
    let [loading, setLoading] = useState({
        delete: false,
        edit: false
    });
    
    let dispatch = useDispatch();
    let history = useHistory();
    
    let handleEditThisAuthor = (event) => {
        event.preventDefault();
        setLoading({...loading, edit: true});
        setTimeout(() => {
            setLoading({...loading, edit: false});
            history.push(`/authors/${data.authorId}/edit`);
        }, 1500);
    };

    let handleDeleteAuthor = (event) => {
        event.preventDefault();
        setLoading({...loading, delete: true});
        setTimeout(() => {
            dispatch(deleteAuthorWithId(store.getState()?.author?.authorId));
            setLoading({...loading, delete: false});
            history.push(`/`);
        }, 1500);
    }

    return (
        <>
            <SEO title = {`${data?.firstName} ${data?.lastName}`}/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap:"4em",
                    alignItems: 'center',
                    padding: '4em',
                    minHeight: 'calc(100vh - 16em)',
                    height: "max-content"
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        width: '100%',
                        height: '80%',
                        padding: '4em',
                        display: 'flex',
                        gap: '4em'
                    }}
                >
                    <AuthorDetailsComponent data={author_data} />
                    <Divider orientation='vertical' flexItem />
                    <AboutAuthor data={about_author_data} />
                </Paper>

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
                        startIcon={<Delete />} 
                        size="large"
                        loading={loading.delete}
                        loadingPosition={"start"}
                        onClick={handleDeleteAuthor}
                        sx={{
                            height: '3em',
                            width: "15em"
                        }}
                    >
                        Delete Author
                    </LoadingButton>
                    <LoadingButton
                        variant='contained'
                        color='primary'
                        startIcon={<Edit />} 
                        size="large"
                        loading={loading.edit}
                        loadingPosition={"start"}
                        onClick={handleEditThisAuthor}
                        sx={{
                            height: '3em',
                            width: "15em"
                        }}
                    >
                        Edit Author
                    </LoadingButton>
                </Box>

            </Box>
        </>
    )
}

SpecificAuthorContainer = connect(mapStateToProps)(SpecificAuthorContainer);

export default SpecificAuthorContainer;