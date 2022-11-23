import { Add, Clear } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Avatar, Box, createFilterOptions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { addBookInAuthor, modifyBooksInOneAuthor } from '../../actions/authorActions';
import { addBookToDatabase, clearBookCache, loadAllBooks } from '../../actions/bookActions';
import store from '../../store';
import { BOOK_BINDING_TYPES } from '../../utils';
import CoverUploadComponent from '../CoverUpdateComponent';
import './BookAddingField.scss';


const filter = createFilterOptions();

const mapStateToProps = (state) => ({
    book: state.book
});

let BookAddingField = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState([...store.getState()?.author?.books]);
    const [open, toggleOpen] = useState(false);

    const [loading, setLoading] = useState({
        add: false,
        close: false
    });

    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(loadAllBooks());
        setData([...store.getState()?.books]);
    }, [dispatch])


    const handleClose = () => {
        setLoading({
            ...loading,
            close: true,
        });

        setTimeout(() => {
            setDialogValue({
                title: '',
                language: '',
                volume: '',
                price: '',
                genere: '',
                publisher: '',
                pubdate: dayjs().format('DD MMMM YYYY'),
                binding: '',
            });
            dispatch(clearBookCache());
            setLoading({
                ...loading,
                close: false,
            });
            toggleOpen(false);
        }, 500);
    };

    const [dialogValue, setDialogValue] = useState({
        title: '',
        language: '',
        volume: '',
        price: '',
        genere: '',
        publisher: '',
        pubdate: dayjs().format('DD MMMM YYYY'),
        binding: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading({ ...loading, add: true })

        let inputs = {
            ...dialogValue,
            coverImagePath: store.getState()?.book?.coverImagePath
        };
        dispatch(addBookToDatabase(inputs));

        setTimeout(() => {
            setValue([...value, { ...store.getState()?.book }]);
            dispatch(addBookInAuthor({ ...store.getState()?.book }));
            dispatch(clearBookCache());
            setLoading({ ...loading, add: false });
            setDialogValue({
                title: '',
                language: '',
                volume: '',
                price: '',
                genere: '',
                publisher: '',
                pubdate: dayjs().format('DD MMMM YYYY'),
                binding: '',
            });
            dispatch(clearBookCache());
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
                                title: newValue,
                            });
                        });
                    }
                    else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({
                            ...dialogValue,
                            title: newValue.inputValue,
                        });
                    }
                    else {
                        setValue(newValueList);
                        dispatch(modifyBooksInOneAuthor(newValueList));
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            title: params.inputValue,
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
                    return `${option.title}`;
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
                                                src={option.coverImagePath && option.coverImagePath}
                                                sx={{
                                                    height: '5em',
                                                    width: '5em'
                                                }}
                                                style={{
                                                    backgroundColor: !option.coverImagePath && 'gray'
                                                }}
                                            >
                                                {'No Cover'}
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
                                                <Typography variant='h6' fontWeight={'bold'}>{option.title}</Typography>
                                            </Box>
                                            {
                                                option.volume &&
                                                <Box>
                                                    <Typography variant='body2' color={'secondary'}>Volume</Typography>
                                                    <Typography variant='body1'>{option.volume}</Typography>
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
                                            <Typography variant='h5' fontWeight={'bold'}>{`“${option.title}”`}</Typography>
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
                        <TextField {...params} label="Books" />
                    )
                }}
            />

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='xl'
                scroll={'paper'}
                xs={{ padding: "2em" }}
                className="book-adding-field-dialogue"
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle
                        variant='h5'
                        color={'secondary'}
                        display='flex'
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        Add a new Book
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
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <CoverUploadComponent />
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
                                    Book not listed? Please, add it! You can edit it later as well.
                                </DialogContentText>
                                <Box
                                    width={'100%'}
                                    display={'flex'}
                                    justifyContent={'center'}
                                >
                                    <TextField
                                        id="book-title"
                                        label="Title"
                                        variant="outlined"
                                        value={dialogValue.title}
                                        inputProps={{ style: { fontWeight: 'bold' } }}
                                        onChange={(event) => {
                                            setDialogValue({
                                                ...dialogValue,
                                                title: event.target.value
                                            });
                                        }}
                                        fullWidth
                                    />
                                </Box>
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
                                            value={dialogValue.language}
                                            onChange={(event) => {
                                                setDialogValue({
                                                    ...dialogValue,
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
                                            value={dialogValue.volume}
                                            onChange={(event) => {
                                                setDialogValue({
                                                    ...dialogValue,
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
                                    width={'100%'}
                                >
                                    <Box
                                        width={'30%'}
                                    >
                                        <TextField
                                            id="book-price"
                                            label="Price"
                                            variant="outlined"
                                            fullWidth
                                            value={dialogValue.price}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        €
                                                    </InputAdornment>
                                                )
                                            }}
                                            onChange={(event) => {
                                                setDialogValue({
                                                    ...dialogValue,
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
                                            value={dialogValue.genere}
                                            onChange={(event) => {
                                                setDialogValue({
                                                    ...dialogValue,
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
                                    width={'100%'}
                                >
                                    <Box
                                        flexGrow={1}
                                    >
                                        <TextField
                                            id="book-publisher"
                                            label="Publisher"
                                            variant="outlined"
                                            fullWidth
                                            value={dialogValue.publisher}
                                            onChange={(event) => {
                                                setDialogValue({
                                                    ...dialogValue,
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
                                                value={dialogValue.pubdate}
                                                fullWidth
                                                renderInput={(params) => <TextField {...params} />}
                                                onChange={(date) => {
                                                    setDialogValue({
                                                        ...dialogValue,
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
                                    fullWidth
                                    value={dialogValue.binding}
                                    onChange={(event) => {
                                        setDialogValue({
                                            ...dialogValue,
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
                                    value={dialogValue.description}
                                    onChange={(event) => {
                                        setDialogValue({
                                            ...dialogValue,
                                            description: event.target.value
                                        })
                                    }}
                                />
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
};

BookAddingField = connect(mapStateToProps)(BookAddingField);
export default BookAddingField