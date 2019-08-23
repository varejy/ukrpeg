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
        newsCategoryRendered: PropTypes.array
    };

    static defaultProps = {
        newsCategoryRendered: []
    };

    constructor (...args) {
        super(...args);
        const { newsCategoryRendered } = this.props;

        this.state = {
            news: newsCategoryRendered
        };
    }

    componentWillReceiveProps (nextProps, nextContext) {
        if (this.props.newsCategoryRendered !== nextProps.newsCategoryRendered) {
            this.setState({ news: nextProps.newsCategoryRendered });
        }
    }

    render () {
        const { news } = this.state;

        return <div className={styles.newsCardsContainer}>
            {
                news.map((newsCard, i) =>
                    <NewsCard key={i} cardData={newsCard}/>
                )
            }
        </div>;
    }
}

export default connect(mapStateToProps)(NewsContent);
