import React, { Component } from 'react';
import styles from './NewsContent.css';

import { connect } from 'react-redux';
import NewsCard from '../NewsCard/NewsCard';
import Pagination from '../Pagination/Pagination';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MAX_CARDS_PER_SLIDE = 9;
const MAX_CARDS_PER_SLIDE_MOBILE = 6;
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

    state = {
        visibleNews: this.props.newsCategoryRendered.slice(0, MAX_CARDS_PER_SLIDE),
        visibleNewsMobile: this.props.newsCategoryRendered.slice(0, MAX_CARDS_PER_SLIDE_MOBILE),
        activePoint: 0,
        activePointMobile: 0
    };

    componentWillReceiveProps (nextProps, nextContext) {
        if (this.props.newsCategoryRendered !== nextProps.newsCategoryRendered) {
            this.setState({
                visibleNews: nextProps.newsCategoryRendered.slice(0, MAX_CARDS_PER_SLIDE),
                visibleNewsMobile: nextProps.newsCategoryRendered.slice(0, MAX_CARDS_PER_SLIDE_MOBILE),
                activePointMobile: 0
            });

            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }
    }

    handlePaginationChange = i => {
        const { newsCategoryRendered } = this.props;

        window.scroll({ top: 0, left: 0, behavior: 'smooth' });

        this.setState({
            visibleNews: newsCategoryRendered.slice(i * MAX_CARDS_PER_SLIDE, (i + 1) * MAX_CARDS_PER_SLIDE),
            activePoint: i
        });
    };

    handleMobilePaginationChange = i => {
        const { newsCategoryRendered } = this.props;

        window.scroll({ top: 0, left: 0, behavior: 'smooth' });

        this.setState({
            visibleNewsMobile: newsCategoryRendered.slice(i * MAX_CARDS_PER_SLIDE_MOBILE, (i + 1) * MAX_CARDS_PER_SLIDE_MOBILE),
            activePointMobile: i
        });
    };

    render () {
        const { newsCategoryRendered } = this.props;
        const { visibleNews, activePoint, activePointMobile, visibleNewsMobile } = this.state;
        const MAX_SLIDES = Math.ceil(newsCategoryRendered.length / MAX_CARDS_PER_SLIDE);
        const MAX_SLIDES_MOBILE = Math.ceil(newsCategoryRendered.length / MAX_CARDS_PER_SLIDE_MOBILE);

        return <div className={styles.newsContent} >
            <div className={classNames(styles.sliderContainer, styles.sliderContainerDesktop)}>
                <div className={styles.newsCardsContainer}>
                    {
                        visibleNews.map((newsCard, i) =>
                            <NewsCard key={i} cardData={newsCard}/>
                        )
                    }
                </div>
            </div>
            {
                newsCategoryRendered.length > MAX_CARDS_PER_SLIDE && <div className={styles.pagination}>
                    <Pagination
                        activePoint={activePoint}
                        points={MAX_SLIDES}
                        onChange={this.handlePaginationChange}/>
                </div>
            }
            <div className={classNames(styles.sliderContainer, styles.sliderContainerMobile)}>
                <div className={styles.newsCardsContainer}>
                    {
                        visibleNewsMobile.map((newsCard, i) =>
                            <NewsCard key={i} cardData={newsCard}/>
                        )
                    }
                </div>
            </div>
            <div className={styles.paginationMobile}>
                <Pagination activePoint={activePointMobile} points={MAX_SLIDES_MOBILE} onChange={this.handleMobilePaginationChange} />
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(NewsContent);
