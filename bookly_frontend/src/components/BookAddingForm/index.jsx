import React, { useState } from 'react'
import { Box, FormControl, InputAdornment, MenuItem, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { BOOK_BINDING_TYPES } from '../../utils';
import store from '../../store';
import { Add } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { connect, useDispatch } from 'react-redux';
import { addBookToDatabase } from '../../actions/bookActions';
import { useHistory } from 'react-router-dom';
import AuthorAddingField from '../BookEdittingForm/AuthorAddingField';

const mapStateToProps = (state) => ({
    coverImagePath: state.book.coverImagePath
});

let BookAddingFormComponent = () => {

    const [formInputs, setFormInputs] = useState({
        title: '',
        language: '',
        volume: '',
        price: '',
        genere: '',
        publisher: '',
        pubdate: dayjs().format('DD MMMM YYYY'),
        binding: '',
        authors: []
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        let inputs = {
            ...formInputs,
            authors: store.getState()?.book?.authors,
            coverImagePath: store.getState()?.book?.coverImagePath
        };
        dispatch(addBookToDatabase(inputs));
        setTimeout(() => {
            setLoading(false);
            let bookId = store.getState().book?.bookId;
            bookId && history.push(`/books/${bookId}`);
        }, 1500);
    }

    return (
        <FormControl
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '2em'
            }}
        >
            <TextField
                id="book-title"
                label="Title"
                variant="outlined"
                value={formInputs.title}
                inputProps={{ style: { fontWeight: 'bold' } }}
                onChange={(event) => {
                    setFormInputs({
                        ...formInputs,
                        title: event.target.value
                    });
                }}
            />
            <AuthorAddingField />
            <Box
                display={'flex'}
                justifyContent={'center'}
                gap={'2em'}
                width={'100%'}
            >
                <Box
                    flexGrow={'1'}
                >
                    <TextField
                        id="book-language"
                        label="Language"
                        variant="outlined"
                        fullWidth
                        value={formInputs.language}
                        onChange={(event) => {
                            setFormInputs({
                                ...formInputs,
                                language: event.target.value
                            });
                        }}
                    />
                </Box>
                <Box
                    width={'30%'}
                >
                    <TextField
                        id="book-volume"
                        label="Volume"
                        variant="outlined"
                        fullWidth
                        value={formInputs.volume}
                        onChange={(event) => {
                            setFormInputs({
                                ...formInputs,
                                volume: event.target.value
                            });
                        }}
                    />
                </Box>

            </Box>
            <Box
                display={'flex'}
                justifyContent={'center'}
                gap={'2em'}
            >
                <Box
                    width={'30%'}
                >
                    <TextField
                        id="book-price"
                        label="Price"
                        variant="outlined"
                        fullWidth
                        value={formInputs.price}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    €
                                </InputAdornment>
                            )
                        }}
                        onChange={(event) => {
                            setFormInputs({
                                ...formInputs,
                                price: event.target.value
                            });
                        }}
                    />
                </Box>
                <Box
                    flexGrow={1}
                >
                    <TextField
                        id="book-genere"
                        label="Genere"
                        variant="outlined"
                        fullWidth
                        value={formInputs.genere}
                        onChange={(event) => {
                            setFormInputs({
                                ...formInputs,
                                genere: event.target.value
                            })
                        }}
                    />
                </Box>
            </Box>
            <Box
                display={'flex'}
                justifyContent={'center'}
                gap={'2em'}
            >
                <Box
                    flexGrow={1}
                >
                    <TextField
                        id="book-publisher"
                        label="Publisher"
                        variant="outlined"
                        fullWidth
                        value={formInputs.publisher}
                        onChange={(event) => {
                            setFormInputs({
                                ...formInputs,
                                publisher: event.target.value
                            })
                        }}
                    />
                </Box>
                <Box
                    width={'30%'}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Publication Date"
                            inputFormat="DD/MM/YYYY"
                            value={formInputs.pubdate}
                            fullWidth
                            renderInput={(params) => <TextField {...params} />}
                            onChange={(date) => {
                                setFormInputs({
                                    ...formInputs,
                                    pubdate: dayjs(date).format('DD MMMM YYYY')
                                })
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>
            <TextField
                id="book-binding"
                label="Select Binding Type"
                variant="outlined"
                select
                value={formInputs.binding}
                onChange={(event) => {
                    setFormInputs({
                        ...formInputs,
                        binding: event.target.value
                    });
                }}
            >
                {
                    BOOK_BINDING_TYPES.map((binding_type, key) => {
                        return (
                            <MenuItem key={key} value={binding_type}>{binding_type}</MenuItem>
                        )
                    })
                }
            </TextField>
            <TextField
                id="book-description"
                label="Description"
                variant="outlined"
                multiline
                minRows={8}
                fullWidth
                value={formInputs.description}
                onChange={(event) => {
                    setFormInputs({
                        ...formInputs,
                        description: event.target.value
                    })
                }}
            />
            <LoadingButton
                variant='contained'
                startIcon={<Add />}
                sx={{
                    alignSelf: 'flex-end'
                }}
                size={'large'}
                loading={loading}
                loadingPosition={"start"}
                onClick={handleSubmit}
            >
                Add Book
            </LoadingButton>
        </FormControl>
    )
}

BookAddingFormComponent = connect(mapStateToProps)(BookAddingFormComponent);
export default BookAddingFormComponent;