import { AutoStories, Email, EmailOutlined } from '@mui/icons-material'
import { Card, CardMedia, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_AUTHOR_IMAGE } from '../../utils'

const SingleAuthorInAllAuthorsComponent = ({ author }) => {
    return (
        <li
            style={{
                width: 'max-content',
                borderRadius: '1em'
            }}
        >
            <Link
                to={`/authors/${author.authorId}`}
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}
            >
                <Card
                    elevation={4}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        gap: '1em',
                        width: 'max-connect',
                        padding: '1em',
                        minWidth: '25em',
                        borderRadius: '1em',
                        transition: "var(--transition-base)",
                        ":hover": {
                            backgroundColor: 'var(--secondary-highlight)',
                        }
                    }}
                >
                    <Card
                        elevation={2}
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
                            image={author.authorImagePath || DEFAULT_AUTHOR_IMAGE}
                            alt="author's photo"
                            sx={{
                                height: "8em",
                                width: "8em",
                                objectFit: 'cover',
                            }}
                        />
                    </Card>
                    <Divider orientation='vertical' flexItem />
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'flex-start'}
                        alignItems={'flex-start'}
                    >
                        <Typography variant='h4' fontWeight={'bold'}>{author?.firstName} {author?.lastName}</Typography>
                        <Box>
                            <Box
                                height={'100%'}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'flex-start'}
                                flexDirection='column'
                            >
                                {
                                    (() => {
                                        switch (true) {

                                            case author?.books?.length === 1:
                                                return (
                                                    <Typography
                                                        color={'primary'}
                                                        fontWeight='bold'
                                                        display={'flex'}
                                                        alignItems="center"
                                                        gap="0.5em"
                                                    >
                                                        <AutoStories fontSize='small' /> Published 1 book
                                                    </Typography>
                                                );

                                            case author?.books?.length > 1:
                                                return (
                                                    <Typography
                                                        color={'primary'}
                                                        fontWeight='bold'
                                                        display={'flex'}
                                                        alignItems="center"
                                                        gap="0.5em"
                                                    >
                                                        <AutoStories fontSize='small' /> {`Published ${author?.books?.length} books`}
                                                    </Typography>
                                                );

                                            default:
                                                return (
                                                    <Typography
                                                        color={'error'}
                                                        fontWeight='bold'
                                                        display={'flex'}
                                                        alignItems="center"
                                                        gap="0.5em"
                                                    >
                                                        <AutoStories fontSize='small' /> No book published yet
                                                    </Typography>
                                                );
                                        }
                                    })()
                                }
                            </Box>
                        </Box>
                        <Box
                            height={'100%'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'flex-start'}
                            flexDirection='column'
                        >
                            <Typography color={'secondary'} display={'flex'} alignItems="center" gap="0.5em"><Email fontSize='small' /> Business Contact</Typography>
                            {
                                author?.email ?
                                    <Typography variant='body1' fontWeight={'bold'}>{author?.email}</Typography> :
                                    <Typography color={'error'}>No email provided</Typography>
                            }
                        </Box>
                    </Box>
                </Card>
            </Link>
        </li>
    )
}

export default SingleAuthorInAllAuthorsComponent