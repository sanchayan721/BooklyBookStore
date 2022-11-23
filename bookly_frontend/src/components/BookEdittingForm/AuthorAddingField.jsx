import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { Add, Clear } from '@mui/icons-material';
import { Avatar, Divider, Typography } from '@mui/material';
import AuthorImageUpdateComponent from '../AuthorImageUpdateComponent';
import './AuthorAddingField.scss';
import store from '../../store';
import { connect, useDispatch } from 'react-redux';
import { addAuthorToDatabase, clearAuthorCache, loadAllAuthors } from '../../actions/authorActions';
import { addAuthorInBook, modifyAuthorsInOneBook } from '../../actions/bookActions';
import { randomColor } from '../../utils';

const filter = createFilterOptions();

const mapStateToProps = (state) => ({
    value: state.book.authors,
    authors: state.authors 
});

let AuthorAddingField = () => {

    const dispatch = useDispatch();
    const [value, setValue] = useState([...store.getState()?.book?.authors]);
    const [open, toggleOpen] = useState(false);

    const [loading, setLoading] = useState({
        add: false,
        close: false
    });

    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(loadAllAuthors());
        setData([...store.getState()?.authors]);
    }, [dispatch])


    const handleClose = () => {
        setLoading({
            ...loading,
            close: true,
        });

        setTimeout(() => {
            setDialogValue({
                firstName: '',
                lastName: '',
                email: '',
                bio: ''
            });
            dispatch(clearAuthorCache());
            setLoading({
                ...loading,
                close: false,
            });
            toggleOpen(false);
        }, 500);
    };

    const [dialogValue, setDialogValue] = useState({
        firstName: '',
        lastName: '',
        email: '',
        bio: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading({ ...loading, add: true })

        let inputs = {
            ...dialogValue,
            authorImagePath: store.getState()?.author?.authorImagePath
        };
        dispatch(addAuthorToDatabase(inputs));

        setTimeout(() => {
            setValue([...value, { ...store.getState()?.author }]);
            dispatch(addAuthorInBook({ ...store.getState()?.author }));
            dispatch(clearAuthorCache());
            setLoading({ ...loading, add: false });
            setDialogValue({
                firstName: '',
                lastName: '',
                email: '',
                bio: ''
            });
            dispatch(clearAuthorCache());
            toggleOpen(false);
        }, 1500)
    };

    return (
        <>
            <Autocomplete
                value={value}
                onChange={(event, newValueList) => {

                    event.preventDefault();
                    let newValue = newValueList.slice(-1)[0];

                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                                ...dialogValue,
                                firstName: newValue,
                            });
                        });
                    }
                    else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({
                            ...dialogValue,
                            firstName: newValue.inputValue,
                        });
                    }
                    else {
                        setValue(newValueList);
                        dispatch(modifyAuthorsInOneBook(newValueList));
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            firstName: params.inputValue,
                            lastName: '',
                            addItem: true
                        });
                    }

                    return filtered;
                }}
                id="authors-form-component"
                options={data}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return `${option.firstName} ${option.lastName}`;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => {
                    return (
                        <li {...props}
                            key={option.authorId}
                            style={{
                                border: option.addItem && '2px solid var(--secondary-color)'
                            }}
                        >
                            {
                                !option.addItem ?
                                    <Box
                                        display={'flex'}
                                        justifyContent={'flex-start'}
                                        alignItems={'center'}
                                        padding={'1em 2em'}
                                        gap={'3em'}
                                    >
                                        <Box>
                                            <Avatar
                                                src={option.authorImagePath && option.authorImagePath}
                                                sx={{
                                                    height: '5em',
                                                    width: '5em'
                                                }}
                                                style={{
                                                    backgroundColor: !option.authorImagePath && randomColor()
                                                }}
                                            >
                                                {!option.authorImagePath && `${option.firstName?.charAt(0)}${option.lastName?.charAt(0)}`?.toLocaleUpperCase()}
                                            </Avatar>
                                        </Box>
                                        <Box
                                            display={'flex'}
                                            flexDirection={'column'}
                                            justifyContent={'center'}
                                            alignItems={'flex-start'}
                                            gap={'0.5em'}
                                        >
                                            <Box
                                                display={'flex'}
                                                justifyContent={'flex-start'}
                                                alignItems={'center'}
                                                gap={'0.5em'}
                                            >
                                                <Typography variant='h6'>{option.firstName}</Typography>
                                                <Typography variant='h6' fontWeight={'bold'}>{option.lastName}</Typography>
                                            </Box>
                                            {
                                                option.email &&
                                                <Box>
                                                    <Typography variant='body2' color={'secondary'}>Business Email</Typography>
                                                    <Typography variant='body1'>{option.email}</Typography>
                                                </Box>
                                            }
                                        </Box>
                                    </Box> :
                                    <Box
                                        width={'100%'}
                                        height={'100%'}
                                        display={'flex'}
                                        flexDirection={'column'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                    >
                                        <Add style={{
                                            height: '2em',
                                            width: '2em',
                                            color: 'var(--primary-color)'
                                        }} />
                                        <Box
                                            display={'flex'}
                                            justifyContent={'center'}
                                            alignItems="center"
                                            gap={'1em'}
                                        >
                                            <Typography variant='h5'>Add</Typography>
                                            <Typography variant='h5' fontWeight={'bold'}>{`“${option.firstName}”`}</Typography>
                                        </Box>
                                    </Box>
                            }
                        </li>
                    )
                }}
                fullWidth
                freeSolo
                multiple={true}
                renderInput={(params) => {
                    return (
                        <TextField {...params} label="Authors" />
                    )
                }}
            />

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='xl'
                scroll={'paper'}
                xs={{ padding: "2em" }}
                className="author-adding-field-dialogue"
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle
                        variant='h5'
                        color={'secondary'}
                        display='flex'
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        Add a new Author
                    </DialogTitle>
                    <DialogContent
                        dividers
                        sx={{ width: '70vw' }}
                    >
                        <Box
                            display={'flex'}
                            justifyContent={'space-between'}
                            gap={"1.5em"}
                            height={'100%'}
                        >
                            <Box
                                width={'30em'}
                                height={'30em'}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <AuthorImageUpdateComponent elevation={0} />
                            </Box>
                            <Divider orientation='vertical' flexItem />
                            <Box
                                display={'flex'}
                                paddingTop={'1em'}
                                flexDirection={'column'}
                                justifyContent={'space-between'}
                                gap={"2em"}
                                alignItems={'center'}
                                flexGrow={1}
                            >
                                <DialogContentText
                                    variant='body1'
                                    alignSelf={'flex-start'}
                                >
                                    Author not listed? Please, add it! You can edit it later as well.
                                </DialogContentText>
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
                                        value={dialogValue.firstName}
                                        onChange={(event) => {
                                            setDialogValue({
                                                ...dialogValue,
                                                firstName: event.target.value
                                            })
                                        }}
                                    />
                                    <TextField
                                        id='last-name'
                                        label="Last Name"
                                        variant='outlined'
                                        fullWidth
                                        value={dialogValue.lastName}
                                        onChange={(event) => {
                                            setDialogValue({
                                                ...dialogValue,
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
                                        value={dialogValue.email}
                                        onChange={(event) => {
                                            setDialogValue({
                                                ...dialogValue,
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
                                        value={dialogValue.bio}
                                        onChange={(event) => {
                                            setDialogValue({
                                                ...dialogValue,
                                                bio: event.target.value
                                            })
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            padding: "1em 1.5em"
                        }}
                    >
                        <Box
                            display={'flex'}
                            justifyContent={'flex-end'}
                            gap={'2em'}
                        >
                            <LoadingButton
                                variant='contained'
                                color='error'
                                size='large'
                                startIcon={<Clear />}
                                loading={loading.close}
                                loadingPosition={"start"}
                                onClick={handleClose}
                            >
                                Close
                            </LoadingButton>
                            <LoadingButton
                                variant='contained'
                                size='large'
                                startIcon={<Add />}
                                loading={loading.add}
                                loadingPosition={"start"}
                                onClick={handleSubmit}
                            >
                                Add
                            </LoadingButton>
                        </Box>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

AuthorAddingField = connect(mapStateToProps)(AuthorAddingField);
export default AuthorAddingField;