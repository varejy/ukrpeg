import React, { Component } from 'react';
import styles from './NewsCard.css';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';

import { connect } from 'react-redux';

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap
    };
};

class NewsCard extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        cardData: PropTypes.object.isRequired
    };

    static defaultProps = {
        newsCard: {}
    };

    render () {
        const { langMap, cardData } = this.props;
        const text = propOr('content', {}, langMap);

        return <div className={styles.newsCardContainer}>
            <div className={styles.newsCardImage}>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={cardData.url} alt={cardData.title}/>
                </div>
            </div>
            <div className={styles.newsCardDate}>{cardData.date}</div>
            <div className={styles.newsCardTitle}>{cardData.title}</div>
        </div>;
    }
}

export default connect(mapStateToProps)(NewsCard);
