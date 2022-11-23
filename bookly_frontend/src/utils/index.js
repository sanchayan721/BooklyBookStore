export const ACCEPTED_FILETYPES = ["image/jpeg", "image/png", "image/jpd"];
export const FILE_UPLOAD_LIMIT = 5e6;
export const DEFAULT_BOOK_COVER = "https://static.vecteezy.com/system/resources/previews/005/938/832/original/african-american-woman-portrait-outline-in-doodle-style-on-white-background-beauty-concept-graphics-abstract-female-face-beautiful-girl-drawing-vector.jpg";
export const BOOK_BINDING_TYPES = [ "Hard Cover Binding", "Paperback Binding", "Interscrew Binding", "Singer Sewn Binding"];

export const DEFAULT_AUTHOR_IMAGE = "https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/writer-blogger-author-icon.png";

export const randomColor = () => {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let color = "#" + hex.toString(16);

    return color;
};

export const NUMBER_OF_AUTHORS_TO_SHOW = 1;

export const DEFAULT_TIMEOUT = 500;
