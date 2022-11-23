import { Avatar, Box, Button, Card, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { randomColor } from '../../utils';
import { useHistory } from "react-router-dom";
import ReadMoreComponent from '../ReadMoreComponent';

const StyledDiv = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: "2em",
    padding: '0.25em 1em'
});

const BookDetailsComponent = ({ data }) => {

    const history = useHistory();

    return (
        <Card
            elevation={0}
            sx={{
                width: "45em",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
            }}
        >
            <StyledDiv>
                <Typography variant="h3" fontWeight={'bold'}>
                    {data.title}
                </Typography>
            </StyledDiv>

            <Box
                sx={{
                    padding: '0.5em 1em',
                    flexDirection: 'column',
                    gap: '1em'
                }}
            >
                <Typography variant='h6' color={'primary'} >Authors:</Typography>
                {
                    !data.authors || data.authors.length < 1 ?
                        <Typography variant="h5">No Information Provided</Typography> :
                        <Box
                            display={"flex"}
                            justifyContent={"flex-start"}
                            flexWrap="wrap"
                            gap={'0.5em'}
                        >
                            {
                                data.authors.map((author, key) => {
                                    return (
                                        <Button
                                            key={key}
                                            variant='outlined'
                                            color='secondary'
                                            sx={{
                                                borderRadius: '4em',
                                                padding: '0.5em 1em',
                                                gap: '0.5em'
                                            }}
                                            startIcon={
                                                <Avatar
                                                    src={author.authorImagePath && author.authorImagePath}
                                                    sx={{
                                                        height: '2em',
                                                        width: '2em'
                                                    }}
                                                    style={{
                                                        backgroundColor: !author.authorImagePath && randomColor()
                                                    }}
                                                >
                                                    {!author.authorImagePath && `${author?.firstName?.charAt(0)}${author?.lastName?.charAt(0)}`?.toLocaleUpperCase()}
                                                </Avatar>
                                            }
                                            href={`/authors/${author.authorId}`}
                                        >
                                            {author?.firstName} {author?.lastName}
                                        </Button>
                                    )
                                })
                            }
                        </Box>
                }
            </Box>
            <StyledDiv>
                <Typography variant='h6' color={'primary'}>Volume:</Typography>
                <Typography variant="h6">
                    {data.volume ? data.volume : 'No Information Provided'}
                </Typography>
            </StyledDiv>
            <StyledDiv>
                <Typography variant='h6' color={'primary'}>Price:</Typography>
                <Typography variant="h6">
                    &euro; {data.price ? data.price : 'No Information Provided'}
                </Typography>
            </StyledDiv>
            <StyledDiv>
                <Typography variant='h6' color={'primary'}>Publisher:</Typography>
                <Typography variant="h6">
                    {data.publisher ? data?.publisher : 'No Information Provided'}
                </Typography>
            </StyledDiv>
            <StyledDiv>
                <Typography variant='h6' color={'primary'}>Publication Date:</Typography>
                <Typography variant="h6">
                    {data.pubdate ? data.pubdate : 'No Information Provided'}
                </Typography>
            </StyledDiv>
            <StyledDiv>
                <Typography variant='h6' color={'primary'}>Language:</Typography>
                <Typography variant="h6">
                    {data.language ? data.language : 'No Information Provided'}
                </Typography>
            </StyledDiv>
            <StyledDiv>
                <Typography variant='h6' color={'primary'}>Genere:</Typography>
                <Typography variant="h6">
                    {data.genere ? data.genere : 'No Information Provided'}
                </Typography>
            </StyledDiv>
            <StyledDiv>
                <Typography variant='h6' color={'primary'}>Binding:</Typography>
                <Typography variant="h6">
                    {data.binding ? data.binding : 'No Information Provided'}
                </Typography>
            </StyledDiv>
            <Box
                sx={{
                    padding: '0.5em 1em',
                    flexDirection: 'column',
                    gap: '1em'
                }}
            >
                <Typography variant='h6' color={'primary'} >description:</Typography>
                <Typography textAlign="justify" variant="body1">
                    {
                        data.description ?
                        <ReadMoreComponent textlength={500}>
                            {data.description}
                        </ReadMoreComponent> :
                        'No Information Provided'
                    }
                </Typography>
            </Box>
        </Card>
    )
}

export default BookDetailsComponent