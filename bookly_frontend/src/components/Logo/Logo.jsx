import React from 'react'
import { ReactComponent as LogoMark } from './logo-mark.svg';
import { IconButton, Typography } from '@mui/material';
import { useHistory } from "react-router-dom";

import "./logo.scss";

const Logo = () => {

    const history = useHistory();

    const handleClick = () => {
        history.push("/");
    }
    return (
        <div
            className='logo'
            style={{ flexGrow: 1 }}
        >
            <IconButton
                onClick={handleClick}
                sx={{
                    borderRadius: '0.5em',
                    gap: '0.5em',

                    svg: {
                        transition: 'var(--transition-base)'
                    },

                    ":hover": {
                        svg: {
                            transform: 'translateY(-0.1em) rotate(-2deg)'
                        }
                    }
                }}
            >
                <LogoMark />
                <Typography variant='h5' fontWeight={'bold'} color={'white'}>
                    Bookly
                </Typography>
            </IconButton>
        </div>
    )
}

export default Logo