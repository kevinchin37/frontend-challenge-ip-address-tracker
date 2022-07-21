import { Fragment, useState } from 'react';
import useHttp from '../../hooks/use-http';
import FlashMessage from '../UI/Layout/FlashMessage';
import classes from './TrackerSearchBar.module.css';

const TrackerSearchBar = (props) => {
    const { label } = props;
    const { getRequest, errorMessage } = useHttp();
    const [enteredSearchTerm, setEnteredSearchTerm] = useState('');

    const isIpAdress = (searchTerm) => {
        const ipRegex = new RegExp('^(?:[0-9]{1,3}.){3}[0-9]{1,3}$');

        return ipRegex.test(searchTerm.trim());
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let searchBy = 'ipAddress'
        if (!isIpAdress(enteredSearchTerm)) {
            searchBy = 'domain';
        }

        /*
            Test IPs:
                boston 140.241.27.22
                la 161.149.146.201
        */
        getRequest(
            // DEV only!!
            `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IP_GEO_API_KEY}&${searchBy}=${enteredSearchTerm}`,
            props.getLocationData
        )

        setEnteredSearchTerm('');
    }

    const onChangeHandler = (e) => {
        setEnteredSearchTerm(e.target.value);
    }

    return (
        <Fragment>
            {errorMessage && <FlashMessage message={errorMessage} />}
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="search" className={classes.label}>
                    <h1>{label}</h1>
                </label>

                <div className={classes['form-search']}>
                    <input
                        id="search" className={`${classes.search} ${errorMessage ? classes.invalid : ''}`}
                        type="text"
                        placeholder="Search for any IP address or domain"
                        value={enteredSearchTerm}
                        onChange={onChangeHandler}
                    />
                    <button className={classes.submit}></button>
                </div>
            </form>
        </Fragment>
    )
}

export default TrackerSearchBar;
