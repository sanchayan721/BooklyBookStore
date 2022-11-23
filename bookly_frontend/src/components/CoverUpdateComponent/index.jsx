import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import "./index.scss";
import {
    ACCEPTED_FILETYPES,
    DEFAULT_BOOK_COVER,
    FILE_UPLOAD_LIMIT
} from '../../utils';
import { addBookCover, removeBookCover } from '../../actions/bookActions';
import store from '../../store';
import { Clear, Edit } from '@mui/icons-material';

const mapStateToProps = (state) => ({
    coverImagePath: state.book.coverImagePath
});

let CoverUploadComponent = () => {

    const [fileError, setFileError] = useState(null);
    const [coverURL, setCoverURL] = useState(null);

    let coverImagePath = store.getState().book?.coverImagePath;

    useEffect(() => {
        coverImagePath ? setCoverURL(coverImagePath) : setCoverURL(DEFAULT_BOOK_COVER);
    }, [coverImagePath]);

    const dispatch = useDispatch();


    const handleFileSelect = (event) => {
        event.preventDefault();
        let selected_file = event.target.files[0];

        if (selected_file && ACCEPTED_FILETYPES.includes(selected_file.type.toLowerCase())) {

            if (selected_file.size > FILE_UPLOAD_LIMIT) {

                setFileError("File size must be less than 5MB");

            } else {

                setFileError(null);
                const formData = new FormData();
                formData.append("file", selected_file);
                dispatch(addBookCover(formData));
            }

        } else {
            setFileError("Select Jpeg or PNG");
            console.log("hi")
        }
    };

    const handleClear = (event) => {
        event.preventDefault();
        setFileError(null);
        dispatch(removeBookCover());
    }

    return (
        <Box
            height={'100%'}
            width="30em"
            position={"relative"}
            className="cover-image-holder"
        >
            <Card 
                elevation={3} 
                className={"cover-upload-container"} 
                sx={{
                    position: 'fixed'
                }}
            >
                <CardMedia
                    component="img"
                    image={coverURL}
                    alt="book cover"
                    sx={{
                        height: "40em",
                        width: "30em",
                        objectFit: 'cover'
                    }}
                />
                <div className={`overlay ${coverImagePath && "edit-cover"}`}>
                    <IconButton 
                        aria-label="upload" 
                        color='primary' 
                        size='large' 
                        component="label"
                    >
                        <div className='icon-text'>
                            {
                                !coverImagePath ?
                                    <UploadIcon /> : 
                                    <>
                                        <Edit />
                                        <Typography variant='h6' color={'primary'} fontWeight={'bold'}>Edit</Typography>
                                    </>
                            }
                        </div>
                        <input
                            type="file"
                            accept="image/jpeg, image/png, image/jpg"
                            hidden
                            onChange={handleFileSelect}
                        />
                    </IconButton>
                    {
                        coverImagePath &&
                        <IconButton
                            aria-label="clear"
                            color='error'
                            size='large'
                            component="label"
                            onClick={handleClear}
                        >
                            <div className='icon-text'>
                                <Clear />
                                <Typography variant='h6' color={'error'} fontWeight={'bold'}>Cancel</Typography>
                            </div>
                        </IconButton>
                    }
                    <Typography className='no-cover' variant='h6' color={'primary'} fontWeight={'bold'}>Upload a Cover</Typography>
                    {
                        fileError &&
                        <Typography
                            color={'white'}
                            align={'center'}
                            gutterBottom
                            variant='body2'
                            className='file-upload-error'
                        >
                            {fileError}
                        </Typography>
                    }
                </div>
            </Card>
        </Box>
    )
};

CoverUploadComponent = connect(mapStateToProps)(CoverUploadComponent);

export default CoverUploadComponent;