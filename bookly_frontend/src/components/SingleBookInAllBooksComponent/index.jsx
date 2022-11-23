import { Card, CardMedia, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { Link } from 'react-router-dom';
import { DEFAULT_BOOK_COVER, NUMBER_OF_AUTHORS_TO_SHOW } from '../../utils';
import AuthorInABook from './AuthorInABook';

const SingleBookInAllBooksComponent = ({ book }) => {

    return (
        <li
            style={{
                width: 'max-content',
                borderRadius: '1em'
            }}
        >
            <Link
                to={`/books/${book.bookId}`}
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
                        transition: "var(--transition-base)",
                        minWidth: '25em',
                        height: '14em',
                        ":hover": {
                            backgroundColor: 'var(--secondary-highlight)',
                        }
                    }}
                >
                    <Card
                        elevation={5}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 'max-content',
                            width: 'max-content',
                            borderRadius: '0.3em'
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={book.coverImagePath || DEFAULT_BOOK_COVER}
                            alt="book cover"
                            sx={{
                                height: "14em",
                                width: "9em",
                                objectFit: 'cover'
                            }}
                        />
                    </Card>
                    <Divider flexItem orientation='vertical' />
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'flex-start'}
                        alignItems={'flex-start'}
                        gap={'1em'}
                    >
                        <Typography variant='h4' fontWeight={'bold'}>{book?.title}</Typography>
                        {
                            book?.authors && book?.authors.length > 0 &&
                            <Box
                                display={'flex'}
                                justifyContent='flex-start'
                                alignItems={'flex-end'}
                                gap='0.5em'
                            >
                                {
                                    book?.authors?.slice(0, NUMBER_OF_AUTHORS_TO_SHOW).map((author, key) => {
                                        return (
                                            <React.Fragment key={key}>
                                                <AuthorInABook author={author} />
                                            </React.Fragment>
                                        )
                                    })
                                }
                                {
                                    book?.authors.length > NUMBER_OF_AUTHORS_TO_SHOW &&
                                    <Typography color={'primary'}>{`... + ${book?.authors.length - NUMBER_OF_AUTHORS_TO_SHOW} more`}</Typography>
                                }
                            </Box>
                        }
                        <Box
                            height={'100%'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'flex-start'}
                            flexDirection='column'
                        >
                            <Box
                                display={'flex'}
                                justifyContent={'flex-start'}
                                alignItems={'center'}
                                gap={'1em'}
                            >
                                <Typography variant='h6' color={'secondary'} sx={{ width: '4.5em' }}>Volume</Typography>
                                {
                                    book?.volume ?
                                        <Typography variant='h6'>{book?.volume}</Typography> :
                                        <Typography variant='h6'>1</Typography>
                                }
                            </Box>
                            <Box
                                display={'flex'}
                                justifyContent={'flex-start'}
                                alignItems={'center'}
                                gap={'1em'}
                            >
                                <Typography variant='h6' color={'secondary'} sx={{ width: '4.5em' }}>Genere</Typography>
                                {
                                    book?.genere ?
                                        <Typography variant='h6'>{book?.genere}</Typography> :
                                        <Typography variant='body1' >General</Typography>
                                }
                            </Box>
                            <Box
                                display={'flex'}
                                justifyContent={'flex-start'}
                                alignItems={'center'}
                                gap={'1em'}
                            >
                                <Typography variant='h6' color={'secondary'} sx={{ width: '4.5em' }}>Price</Typography>
                                {
                                    book?.price ?
                                        <Typography variant='h6' fontWeight={'bold'}>€{book?.price}</Typography> :
                                        <Typography variant='body1' color={'error'} >No Data</Typography>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Link>
        </li>
    )
}

export default SingleBookInAllBooksComponent;