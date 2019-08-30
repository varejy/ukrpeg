import React, { Component } from 'react';
import styles from './NewsContent.css';

import { connect } from 'react-redux';
import NewsCard from '../NewsCard/NewsCard';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TABLET_WIDTH = 780;
const MAX_CARDS_PER_SLIDE = 6;
const NEWS_PHOTO_HEIGHT_COEFFICIENT = 0.7;
const NEWS_CARD_TEXT_AND_MARGINS_HEIGHT = 214;
const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap,
        mediaWidth: application.media.width
    };
};

class NewsContent extends Component {
    state = {
        activeSlide: 0,
        top: 0
    };

    static propTypes = {
        newsCategoryRendered: PropTypes.array,
        mediaWidth: PropTypes.number.isRequired
    };

    static defaultProps = {
        newsCategoryRendered: []
    };

    handlePaginationClick = i => () => {
        const { mediaWidth } = this.props;
        const CARD_HEIGHT = mediaWidth * NEWS_PHOTO_HEIGHT_COEFFICIENT + NEWS_CARD_TEXT_AND_MARGINS_HEIGHT;

        this.setState({
            activeSlide: i,
            top: (CARD_HEIGHT * MAX_CARDS_PER_SLIDE) * i
        });
        window.scrollTo(0, 0);
    };

    render () {
        const { newsCategoryRendered, mediaWidth } = this.props;
        const { activeSlide, top } = this.state;
        const CARD_HEIGHT = mediaWidth * NEWS_PHOTO_HEIGHT_COEFFICIENT + NEWS_CARD_TEXT_AND_MARGINS_HEIGHT;
        const isMobileScreen = (mediaWidth <= TABLET_WIDTH);
        const MAX_SLIDES = Math.ceil(newsCategoryRendered.length / MAX_CARDS_PER_SLIDE);
        const PAGINATION = [];
        for (let i = 0; i < MAX_SLIDES; i++) {
            PAGINATION.push(i + 1);
        }

        return <div className={styles.newsContent} >
            <div className={styles.sliderContainer}
                style={{ height: `${isMobileScreen ? `${CARD_HEIGHT * MAX_CARDS_PER_SLIDE}px` : 'auto'}`
                }}>
                <div className={styles.newsCardsContainer}
                    style={{ top: `-${top}px` }}>
                    {
                        newsCategoryRendered.map((newsCard, i) =>
                            <NewsCard key={i} cardData={newsCard}/>
                        )
                    }
                </div>
            </div>
            <div className={styles.pagination}>
                {
                    PAGINATION.map((slideNumber, i) =>
                        <div className={classNames(styles.paginationNumber, {
                            [styles.paginationNumberActive]: i === activeSlide
                        })}
                        key={i}
                        onClick={this.handlePaginationClick(i)}
                        >
                            {i + 1}
                        </div>
                    )
                }
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(NewsContent);
