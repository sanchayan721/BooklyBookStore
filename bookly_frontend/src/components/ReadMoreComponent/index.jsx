import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const ReadMoreComponent = ({ children, textlength }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <Typography variant="body1" component={'span'}>
            {isReadMore ? text.slice(0, textlength) : text}
            {
                text.length > textlength &&
                <Button onClick={toggleReadMore} className="read-or-hide">
                    <Box
                        display={'flex'}
                        justifyContent={'flex-start'}
                        alignItems={'center'}
                        height={'1em'}
                    >
                        {
                            isReadMore ?
                                <Typography variant="body2">...read more</Typography> :
                                <Typography variant="body2">show less</Typography>
                        }
                    </Box>
                </Button>
            }
        </Typography>
    );
};

export default ReadMoreComponent;