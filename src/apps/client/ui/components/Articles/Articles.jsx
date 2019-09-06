import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Articles.css';
import getDateFormatted from '../../../../../../utils/getDateFormatted';

import { connect } from 'react-redux';
import { Link } from 'react-router';

const mapStateToProps = ({ application, news }) => {
    return {
        langMap: application.langMap,
        lang: application.lang,
        news: news.news,
        mediaWidth: application.media.width,
        langRoute: application.langRoute
    };
};

class Articles extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        langRoute: PropTypes.string,
        lang: PropTypes.string,
        news: PropTypes.array,
        mediaWidth: PropTypes.number.isRequired
    };

    static defaultProps = {
        news: []
    };

    state = {
        currentNews: 0,
        sliderLeft: 0
    }

    maxSlide = this.props.news.length - 1;
    maxLeft = this.maxSlide * this.props.mediaWidth;

    handleSwitchClick = i => e => {
        const { mediaWidth } = this.props;

        this.setState({
            sliderLeft: i * mediaWidth,
            currentNews: i
        });
    }

    handleClickSlide = direction => event => {
        const { mediaWidth } = this.props;
        const { currentNews } = this.state;

        if (direction === 'next') {
            if (currentNews < this.maxSlide) {
                this.setState({
                    sliderLeft: (currentNews + 1) * mediaWidth,
                    currentNews: currentNews + 1
                });
            }
        } else if (direction === 'prev') {
            if (currentNews > 0) {
                this.setState({
                    sliderLeft: (currentNews - 1) * mediaWidth,
                    currentNews: currentNews - 1
                });
            }
        }
    }

    render () {
        const { langMap, lang, news, langRoute } = this.props;
        const { sliderLeft, currentNews } = this.state;
        const text = propOr('articles', {}, langMap);

        return <div className={styles.articles}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.title}>{text.title}</div>
                </div>
            </div>
            <div className={styles.wrapperArticleBg}>
                <div className={styles.wrapperArticles}>
                    <div className={styles.news} style={{ left: `${-sliderLeft}px` }} >
                        {news.map((item, index) => {
                            return (
                                <Link to={`${langRoute}/news/${item.id}`} key={index} className={styles.newsBlock}>
                                    <p className={styles.date}>{getDateFormatted(item.date, lang)}</p>
                                    <p className={styles.description}>{item.texts[`${lang}`].shortDescription}</p>
                                </Link>
                            );
                        })}
                    </div>
                    <div className={news.length > 3 ? styles.buttons : styles.buttonsHidden}>
                        <button className={currentNews === 0 ? styles.arrowBtn : styles.activeArrowBtn} onClick={this.handleClickSlide('prev')}>
                            <img className={styles.arrowBtnImg} src='/src/apps/client/ui/components/Articles/files/arrowUp.png' />
                        </button>
                        <button className={currentNews === news.length - 1 ? styles.arrowBtn : styles.activeArrowBtn} onClick={this.handleClickSlide('next')}>
                            <img className={styles.arrowBtnImg} src='/src/apps/client/ui/components/Articles/files/arrowDown.png' />
                        </button>
                    </div>
                </div>
            </div>
            <ul className={styles.switches}>
                {news.map((item, i) => {
                    return (
                        <li key={i} className={currentNews === i ? styles.switchItemActive : styles.switchItem} onClick={this.handleSwitchClick(i)}>
                        </li>
                    );
                })}
            </ul>
        </div>;
    }
}

export default connect(mapStateToProps)(Articles);
