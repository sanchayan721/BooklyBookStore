import { Add } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addAuthorToDatabase } from '../../actions/authorActions'
import store from '../../store'

const mapStateToProps = (state) => ({
    authorImagePath: state.author.authorImagePath
});

let AuthorAddingForm = () => {

    const [loading, setLoading] = useState(false);

    const [formInputs, setFormInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        bio: ''
    });

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        let inputs = {
            ...formInputs,
            authorImagePath: store.getState()?.author?.authorImagePath
        };
        dispatch(addAuthorToDatabase(inputs));
        
        setTimeout(() => {
            setLoading(false);
            let authorId = store.getState().author?.authorId;
            authorId && history.push(`/authors/${authorId}`);
        }, 1500);
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
                justifyContent={'flex-end'}
            >
                <LoadingButton
                    variant='contained'
                    startIcon={<Add />} sx={{
                        alignSelf: 'flex-end'
                    }}
                    loading={loading}
                    loadingPosition={"start"}
                    onClick={handleSubmit}
                >
                    Add Author
                </LoadingButton>
            </Box>
        </Box>
    )
}

AuthorAddingForm = connect(mapStateToProps)(AuthorAddingForm);

export default AuthorAddingForm;