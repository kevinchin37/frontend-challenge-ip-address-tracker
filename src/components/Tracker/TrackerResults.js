import classes from './TrackerResults.module.css';

const TrackerResults = (props) => {
    const { locationData: data } = props;

    return (
        <main className={classes.results}>
            <div className={classes.result}>
                <p className={classes.title}>IP Address</p>
                <p className={classes.data}>{data.ip}</p>
            </div>

            <div className={classes.result}>
                <p className={classes.title}>Location</p>
                <p className={classes.data}>{data.location.region}, {data.location.postalCode}</p>
            </div>

            <div className={classes.result}>
                <p className={classes.title}>Timezone</p>
                <p className={classes.data}>UTC{data.location.timezone}</p>
            </div>

            <div className={classes.result}>
                <p className={classes.title}>ISP</p>
                <p className={classes.data}>{data.isp}</p>
            </div>
        </main>
    )
}

export default TrackerResults;
