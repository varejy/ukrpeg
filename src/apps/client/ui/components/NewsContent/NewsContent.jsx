import React, { Component } from 'react';
import styles from './NewsContent.css';

import { connect } from 'react-redux';
import NewsCard from '../NewsCard/NewsCard';
import PropTypes from 'prop-types';

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap
    };
};

class NewsContent extends Component {
    static propTypes = {
        news: PropTypes.array.isRequired,
        newsShowed: PropTypes.number.isRequired
    };

    static defaultProps = {
        news: [],
        newsShowed: 0
    };

    constructor (...args) {
        super(...args);
        const { news, newsShowed } = this.props;

        this.state = {
            news: news,
            index: newsShowed
        };
    }

    componentWillReceiveProps (nextProps, nextContext) {
        if (this.props.newsShowed !== nextProps.newsShowed) {
            this.setState({ index: nextProps.newsShowed, news: nextProps.news });
        }
    }

    render () {
        const { news, index } = this.state;

        return <div className={styles.newsCardsContainer}>
            {index !== 0
                ? news[index].newsList.map((newsCard, i) =>
                    <NewsCard key={i} cardData={newsCard}/>
                )
                : news.map((category) =>
                    category.newsList.map((newsCard, i) =>
                        <NewsCard key={i} cardData={newsCard}/>
                    )
                )
            }
        </div>;
    }
}

export default connect(mapStateToProps)(NewsContent);
