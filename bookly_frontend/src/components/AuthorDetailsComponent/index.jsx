import { Card, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { DEFAULT_AUTHOR_IMAGE } from '../../utils';

const AuthorDetailsComponent = ({ data }) => {

    let {
        firstName,
        lastName,
        authorImagePath,
        email
    } = data;

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'4em'}
        >
            <Card
                elevation={0}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'max-content',
                    width: 'max-content',
                    borderRadius: '50%'
                }}
            >
                <CardMedia
                    component="img"
                    image={authorImagePath || DEFAULT_AUTHOR_IMAGE}
                    alt="book cover"
                    sx={{
                        height: "18em",
                        width: "18em",
                        objectFit: 'cover'
                    }}
                />
            </Card>
            <Box 
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'flex-start'}
                gap={'1em'}
            >
                <Box
                    display={'flex'}
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                    gap={'1em'}
                >
                    <Typography variant='h4' color='primary' noWrap>{firstName}</Typography>
                    <Typography variant='h4' color='primary' fontWeight={'bold'} noWrap>{lastName}</Typography>
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'flex-start'}
                >
                    <Typography variant='body1'>Business Email</Typography>
                    <Typography variant='h5' color={'secondary'} noWrap>{email}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default AuthorDetailsComponent;