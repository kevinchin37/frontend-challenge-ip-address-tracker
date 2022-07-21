import ReactDOM from 'react-dom';
import classes from './FlashMessage.module.css';

const flashRoot = document.getElementById('flash');

const Message = (props) => {
    return (
        <main className={classes.message}>
            {props.children}
        </main>
    );
}

const FlashMessage = (props) => {
    return ReactDOM.createPortal(
        <Message>{props.message}</Message>,
        flashRoot,
    );
}

export default FlashMessage;
