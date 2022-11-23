import { Avatar, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useHistory } from 'react-router-dom';

const AboutAuthor = ({ data }) => {
    let { firstName, bio, books } = data;
    const history = useHistory();
    return (
        <Box
            height={'100%'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'flex-start'}
            gap={'4em'}
        >
            <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                gap={'1em'}
                className={'about-section'}
            >
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    gap={'1em'}
                >
                    <Typography variant='h4' >Biography</Typography>
                </Box>
                <Box>
                    <Typography variant='body1' textAlign={'justify'}>{bio}</Typography>
                </Box>
            </Box>
            <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                gap={'1em'}
                className={'about-section'}
            >
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    gap={'1em'}
                >
                    <Typography variant='h4' >Books By</Typography>
                    <Typography variant='h4' color={'primary'}>{firstName}</Typography>
                </Box>
                {
                    !books || books?.length < 1 ?
                        <Typography variant="body1" color={'error'}>No book has been published yet. Please add books by editting.</Typography> :
                        <Box
                            display={"flex"}
                            justifyContent={"flex-start"}
                            flexWrap="wrap"
                            gap={'0.5em'}
                        >
                            {
                                books.map((book, key) => {
                                    return (
                                        <Button
                                            key={key}
                                            variant='outlined'
                                            color='secondary'
                                            sx={{
                                                borderRadius: '1em',
                                                padding: '0.5em 1em',
                                                gap: '0.5em',
                                            }}
                                            startIcon={
                                                <Avatar
                                                    src={book.coverImagePath && book.coverImagePath}
                                                    sx={{
                                                        height: '8em',
                                                        width: '6em',
                                                        borderRadius: '0.5em'
                                                    }}
                                                    style={{
                                                        backgroundColor: !book.coverImagePath && 'gray'
                                                    }}
                                                >
                                                    {!book.coverImagePath && `No Cover`?.toLocaleUpperCase()}
                                                </Avatar>
                                            }
                                            href = {`/books/${book.bookId}`}
                                        >
                                            <Box
                                                display={'flex'}
                                                flexDirection={'column'}
                                                justifyContent={'flex-start'}
                                                minWidth= '15em'
                                            >
                                                <Typography variant='h6' fontWeight={'bold'}>{book?.title}</Typography>
                                                <Typography variant='body1'>Volume: {book?.volume && book.volume}</Typography>
                                            </Box>
                                        </Button>
                                    )
                                })
                            }
                        </Box>
                }
            </Box>
        </Box>
    )
}

export default AboutAuthor