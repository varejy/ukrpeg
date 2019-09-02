import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Contact.css';

import { connect } from 'react-redux';
import mapStyles from './map';

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap
    };
};

class Contact extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired
    };

    componentDidMount () {
        this.setMap();
    }

    setMap = () => {
        const address = new window.google.maps.LatLng(50.388399, 30.4368207);
        const mapOptions = {
            zoom: 15,
            minZoom: 11,
            center: address,
            styles: mapStyles,
            fullscreenControl: false,
            mapTypeControl: false
        };
        const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
        const marker = new window.google.maps.Marker({
            position: address,
            icon: {
                url: 'src/apps/client/ui/components/Contact/files/marker.png',
                labelOrigin: new window.google.maps.Point(13, -8)
            },
            title: 'Ukrpeg'
        });

        marker.setMap(map);
    };

    render () {
        const { langMap } = this.props;
        const text = propOr('contact', {}, langMap);

        return <div className={styles.contact}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>{text.title}</h1>
                <div className={styles.info}>
                    <div className={styles.coverBlock}>
                        <div className={styles.blockText}>
                            <p>{text.info.workHours.title}</p>
                            <p className={styles.boldText} >{text.info.workHours.desc}</p>
                        </div>
                        <div className={styles.blockText}>
                            <p>{text.info.adress.street}</p>
                            <p>{text.info.adress.index}</p>
                            <p>{text.info.adress.phone}
                                <a href={`tel:${text.info.adress.phoneNumber}`} className={styles.boldText}>{text.info.adress.phoneNumber}</a>
                            </p>
                        </div>
                    </div>
                    <div className={styles.coverBlock}>
                        <p className={styles.cityName}>{text.info.city.title}</p>
                        <p className={styles.blockText}>{text.info.city.desc}</p>
                    </div>
                </div>
                <div className={styles.emailInfo}>
                    <p className={styles.emailTitle}>{text.info.mail.title}</p>
                    <p className={styles.email}><a href={`mailto:${text.info.mail.desc}`}>{text.info.mail.desc}</a></p>
                </div>
                <div className={styles.map} id='map' />
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(Contact);
