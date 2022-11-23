import { Card, CardMedia } from '@mui/material'
import React from 'react'
import { DEFAULT_BOOK_COVER } from '../../utils'

const BookCoverComponent = ({ cover }) => {
    return (
        <Card
            elevation={5}
            sx={{
                width: 'max-content',
                position: 'fixed'
            }}
        >
            <CardMedia
                component="img"
                image={cover || DEFAULT_BOOK_COVER}
                alt="book cover"
                sx={{
                    height: "40em",
                    width: "30em",
                    objectFit: 'cover'
                }}
            />
        </Card>
    )
}

export default BookCoverComponent