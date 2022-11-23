import { Clear, Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editSpecificAuthor } from '../../actions/authorActions'
import store from '../../store'
import BookAddingField from './BookAddingField'

const mapStateToProps = (state) => ({
    authorImagePath: state.author.authorImagePath
});

let AuthorEdittingForm = () => {

    const [formInputs, setFormInputs] = useState({ ...store.getState().author });
    const [loading, setLoading] = useState({
        save: false,
        discard: false
    });
    const dispatch = useDispatch();
    const history = useHistory();

    let completeLoad = (key) => {
        setTimeout(() => {
            let new_loading = { ...loading };
            new_loading[key] = false;
            setLoading(new_loading);
            formInputs.authorId && history.push(`/authors/${formInputs.authorId}`);
        }, 1500);
    }

    const handleSave = (event) => {
        event.preventDefault();
        setLoading({ ...loading, save: true });
        let inputs = {
            ...formInputs,
            books: store.getState()?.author?.books,
            authorImagePath: store.getState()?.author?.authorImagePath
        };
        dispatch(editSpecificAuthor(formInputs.authorId, inputs));
        completeLoad('save');
    }

    const handleDiscard = (event) => {
        event.preventDefault();
        setLoading({ ...loading, discard: true });
        completeLoad('discard');
    }


    return (
        <Box
            minWidth={'50em'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            gap={"2em"}
            alignItems={'center'}
        >
            <Box
                width={'100%'}
                display={'flex'}
                justifyContent={'space-between'}
                gap={"2em"}
            >
                <TextField
                    id='first-name'
                    label="First Name"
                    variant='outlined'
                    fullWidth
                    value={formInputs.firstName}
                    onChange={(event) => {
                        setFormInputs({
                            ...formInputs,
                            firstName: event.target.value
                        })
                    }}
                />
                <TextField
                    id='last-name'
                    label="Last Name"
                    variant='outlined'
                    fullWidth
                    value={formInputs.lastName}
                    onChange={(event) => {
                        setFormInputs({
                            ...formInputs,
                            lastName: event.target.value
                        })
                    }}
                />
            </Box>
            <Box
                width={'100%'}
            >
                <TextField
                    id='email'
                    label='Business Email'
                    variant='outlined'
                    fullWidth
                    value={formInputs.email}
                    onChange={(event) => {
                        setFormInputs({
                            ...formInputs,
                            email: event.target.value
                        })
                    }}
                />
            </Box>
            <Box width={'100%'}>
                <BookAddingField />
            </Box>
            <Box
                width={'100%'}
            >
                <TextField
                    id='bio'
                    label="Biography"
                    variant='outlined'
                    fullWidth
                    multiline
                    minRows={8}
                    value={formInputs.bio}
                    onChange={(event) => {
                        setFormInputs({
                            ...formInputs,
                            bio: event.target.value
                        })
                    }}
                />
            </Box>
            <Box
                width={'100%'}
                display={'flex'}
                justifyContent={'center'}
                gap={'2em'}
            >
                <LoadingButton
                    variant='contained'
                    startIcon={<Clear />}
                    size={'large'}
                    color="error"
                    sx={{
                        width: '10em'
                    }}
                    loading={loading.discard}
                    loadingPosition={"start"}
                    onClick={handleDiscard}
                >
                    Discard
                </LoadingButton>
                <LoadingButton
                    variant='contained'
                    color='primary'
                    startIcon={<Save />}
                    size={'large'}
                    sx={{
                        width: '10em'
                    }}
                    loading={loading.save}
                    loadingPosition={"start"}
                    onClick={handleSave}
                >
                    Save
                </LoadingButton>
            </Box>
        </Box>
    )
}

AuthorEdittingForm = connect(mapStateToProps)(AuthorEdittingForm);

export default AuthorEdittingForm;