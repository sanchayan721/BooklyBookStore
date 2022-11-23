
import Navbar from '../containers/Navbar'
import BookAddingContainer from '../containers/AddABookContainer';
import { Box } from '@mui/material';
import SEO from '../containers/SEO';

let AddNewBook = () => {

    return (
        <>
        <SEO title={"Add New Book"} />
            <Navbar />
            <Box
                maxHeight={`calc(100vh - 5.5em - 2*4em)`}
                overflow={'auto'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                padding={'9.5em 0 4em 0'}
                gap={'4em'}
            >
                <BookAddingContainer />
            </Box>
        </>
    )
}

export default AddNewBook