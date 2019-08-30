import React, { Component } from 'react';
import styles from './NewsCard.css';
import PropTypes from 'prop-types';
import getDateFormatted from '../../../../../../utils/getDateFormatted';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap,
        langRoute: application.langRoute
    };
};

class NewsCard extends Component {
    static propTypes = {
        cardData: PropTypes.object.isRequired,
        langRoute: PropTypes.string
    };

    static defaultProps = {
        newsCard: {},
        langRoute: ''
    };

    render () {
        const { cardData, langRoute } = this.props;

        return <div className={styles.newsCardContainer}>
            <Link key={cardData.id} to={`${langRoute}/news/${cardData.id}`}>
                <div className={styles.newsCardImage}>
                    <div className={styles.imageContainer}>
                        <img className={styles.image} src={cardData.url} alt={cardData.title}/>
                    </div>
                </div>
            </Link>
            <div className={styles.newsCardDate}>{getDateFormatted(cardData.date, 'ua')}</div>
            <div className={styles.newsCardTitle}>{cardData.title}</div>
        </div>;
    }
}

export default connect(mapStateToProps)(NewsCard);
