import React, { useEffect, useState } from 'react';
import './index.scss';
import { Card, CardMedia, IconButton, Typography } from '@mui/material';
import { ACCEPTED_FILETYPES, DEFAULT_AUTHOR_IMAGE, FILE_UPLOAD_LIMIT } from '../../utils';
import { Clear, Edit } from '@mui/icons-material';
import UploadIcon from '@mui/icons-material/Upload';
import { connect, useDispatch } from 'react-redux';
import { addAuthorProfileImage, removeAuthorProfileImage } from '../../actions/authorActions';

import store from '../../store';

const mapStateToProps = (state) => ({
    authorImagePath: state.author.authorImagePath
});

let AuthorImageUpdateComponent = (props) => {

    const [fileError, setFileError] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    let authorImagePath = store.getState()?.author?.authorImagePath;
    useEffect(() => {
        authorImagePath ? setImageURL(authorImagePath) : setImageURL(DEFAULT_AUTHOR_IMAGE);
    }, [authorImagePath])

    const dispatch = useDispatch();

    let handleFileSelect = (event) => {
        event.preventDefault();
        let selected_file = event.target.files[0];

        if (selected_file && ACCEPTED_FILETYPES.includes(selected_file.type.toLowerCase())) {
            if (selected_file.size > FILE_UPLOAD_LIMIT) {
                setFileError("File size must be less than 5MB");
            } else {
                setFileError(null);
                const formData = new FormData();
                formData.append("file", selected_file);
                dispatch(addAuthorProfileImage(formData));
            }
        } else {
            setFileError("Select Jpeg or PNG");
        };
    };

    let handleClear = (event) => {
        event.preventDefault();
        setFileError(null);
        dispatch(removeAuthorProfileImage());
    }

    return (
        <Card
            elevation={props.hasOwnProperty('elevation') ? props.elevation : 5}
            sx={{
                height: 'max-content',
                width: 'max-content',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%'
            }}
            className={"author-image-upload-component"}
        >
            <CardMedia
                component={"img"}
                alt="author's image"
                image={imageURL}
                sx={{
                    height: '15em',
                    width: '15em',
                    objectFit: 'cover'
                }}
            />
            <div className={`overlay ${authorImagePath && "edit-image"}`}>
                <IconButton
                    aria-label='upload'
                    color='primary'
                    size='small'
                    component="label"
                >
                    <div className="icon-text">
                        {
                            !authorImagePath ?
                                <UploadIcon /> :
                                <>
                                    <Edit />
                                    <Typography variant='body1' color={'primary'} fontWeight={'bold'}>Edit</Typography>
                                </>
                        }
                    </div>
                    <input
                        type={'file'}
                        accept="image/jpeg, image/png, image/jpg"
                        hidden
                        onChange={handleFileSelect}
                    />
                </IconButton>
                {
                    authorImagePath &&
                    <IconButton
                        aria-label="clear"
                        color='error'
                        size='small'
                        component="label"
                        onClick={handleClear}
                    >
                        <div className='icon-text'>
                            <Clear />
                            <Typography variant='body1' color={'error'} fontWeight={'bold'}>Cancel</Typography>
                        </div>
                    </IconButton>
                }
                <Typography className='no-image' variant='body1' color={'primary'} fontWeight={'bold'}>Upload a Picture</Typography>
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
    )
}

AuthorImageUpdateComponent = connect(mapStateToProps)(AuthorImageUpdateComponent);

export default AuthorImageUpdateComponent;