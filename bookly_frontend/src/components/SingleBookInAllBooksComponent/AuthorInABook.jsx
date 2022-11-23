import { Avatar, Button, Typography } from '@mui/material';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { randomColor } from '../../utils';

const AuthorInABook = ({ author }) => {

    let history = useHistory();

    return (
        <Button
            variant='outlined'
            color='secondary'
            sx={{
                borderRadius: '4em',
                padding: '0.1em 1em 0.1em 0.4em',
                gap: '0.2em',
                height: '2.5em'
            }}
            startIcon={
                <Avatar
                    src={author.authorImagePath && author.authorImagePath}
                    sx={{
                        height: '1.5em',
                        width: '1.5em'
                    }}
                    style={{
                        backgroundColor: !author.authorImagePath && randomColor()
                    }}
                >
                    {!author.authorImagePath && `${author?.firstName?.charAt(0)}${author?.lastName?.charAt(0)}`?.toLocaleUpperCase()}
                </Avatar>
            }
            onClick={(event) => {
                event.preventDefault();
                history.push(`/authors/${author.authorId}`);
            }}
        >
            <Typography variant='h3' fontSize={'0.8em'} fontWeight='300'>
                {author?.firstName} {author?.lastName}
            </Typography>
        </Button>
    )
}

export default AuthorInABook