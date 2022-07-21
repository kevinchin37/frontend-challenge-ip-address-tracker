import { Fragment, useState, useEffect } from 'react';
import Header from '../UI/Layout/Header';
import Leaflet from 'leaflet';
import TrackerResults from './TrackerResults';
import TrackerSearchBar from './TrackerSearchBar';
import useHttp from '../../hooks/use-http';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import marker from '../../assets/images/icon-location.svg';

// https://react-leaflet.js.org/docs/api-map/#mapcontainer
function MapState({center, zoom}) {
    const map = useMap();
    map.setView(center, zoom);

    return null;
}

const markerIcon = Leaflet.icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    iconSize: [45, 55],
});

const Tracker = () => {
    const [locationData, setLocationData] = useState(null);
    const { getRequest } = useHttp();

    useEffect(() => {
        getRequest(
            // DEV only!!
            `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IP_GEO_API_KEY}`,
            requestDataHandler
        );
    }, [getRequest]);

    const requestDataHandler = (data) => {
        setLocationData(data);
    }

    return (
        <Fragment>
            <Header>
                <TrackerSearchBar label="IP Address Tracker" getLocationData={requestDataHandler} />
                {locationData && <TrackerResults locationData={locationData} />}
            </Header>

            {locationData && (
                <MapContainer scrollWheelZoom={true}>
                    <MapState center={[locationData.location.lat, locationData.location.lng]} zoom={15} />

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker icon={markerIcon} position={[locationData.location.lat, locationData.location.lng]}>
                        <Popup>
                            {locationData.location.lat},{locationData.location.lng}
                        </Popup>
                    </Marker>
                </MapContainer>
            )}
        </Fragment>
    )
}

export default Tracker;
