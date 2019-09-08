import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Articles.css';
import getDateFormatted from '../../../../../../utils/getDateFormatted';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const DESKTOP_SLIDE_HEIGHT = 150;

const mapStateToProps = ({ application, news }) => {
    return {
        langMap: application.langMap,
        lang: application.lang,
        news: news.news.slice(0, 9),
        mediaWidth: application.media.width,
        desktop: application.media.desktop,
        langRoute: application.langRoute
    };
};

class Articles extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        desktop: PropTypes.bool.isRequired,
        langRoute: PropTypes.string,
        lang: PropTypes.string,
        news: PropTypes.array,
        mediaWidth: PropTypes.number.isRequired
    };

    static defaultProps = {
        news: []
    };

    maxSlideMobile = this.props.news.length - 1;
    maxSlideDesktop = Math.floor(this.props.news.length / 3);

    state = {
        currentNewsMobileIndex: 0,
        currentNewsDesktopIndex: 0,
        sliderTop: 0,
        sliderLeft: 0
    };

    componentWillReceiveProps (nextProps) {
        if (nextProps.mediaWidth !== this.props.mediaWidth) {
            const { currentNewsMobileIndex } = this.state;

            this.setState({
                sliderLeft: currentNewsMobileIndex * nextProps.mediaWidth
            });
        }
    }

    handleSwitchClick = i => e => {
        const { mediaWidth } = this.props;

        this.setState({
            sliderLeft: i * mediaWidth,
            currentNewsMobileIndex: i
        });
    };

    handleClickSlide = direction => () => {
        const { mediaWidth, desktop } = this.props;
        const { currentNewsMobileIndex, currentNewsDesktopIndex } = this.state;

        if (desktop) {
            if (direction === 'next') {
                if (currentNewsDesktopIndex < this.maxSlideDesktop) {
                    this.setState({
                        sliderTop: (currentNewsDesktopIndex + 1) * DESKTOP_SLIDE_HEIGHT,
                        currentNewsDesktopIndex: currentNewsDesktopIndex + 1
                    });
                }
            } else if (direction === 'prev') {
                if (currentNewsDesktopIndex > 0) {
                    this.setState({
                        sliderTop: (currentNewsDesktopIndex - 1) * DESKTOP_SLIDE_HEIGHT,
                        currentNewsDesktopIndex: currentNewsDesktopIndex - 1
                    });
                }
            }
        } else {
            if (direction === 'next') {
                if (currentNewsMobileIndex < this.maxSlideMobile) {
                    this.setState({
                        sliderLeft: (currentNewsMobileIndex + 1) * mediaWidth,
                        currentNewsMobileIndex: currentNewsMobileIndex + 1
                    });
                }
            } else if (direction === 'prev') {
                if (currentNewsMobileIndex > 0) {
                    this.setState({
                        sliderLeft: (currentNewsMobileIndex - 1) * mediaWidth,
                        currentNewsMobileIndex: currentNewsMobileIndex - 1
                    });
                }
            }
        }
    };

    render () {
        const { langMap, lang, news, langRoute, desktop } = this.props;
        const { sliderLeft, sliderTop, currentNewsMobileIndex, currentNewsDesktopIndex } = this.state;
        const text = propOr('articles', {}, langMap);

        return <div className={styles.articles}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.title}>{text.title}</div>
                </div>
            </div>
            <div className={styles.wrapperArticleBg}>
                <div className={styles.wrapperArticles}>
                    <div className={styles.news} style={desktop ? { top: `${-sliderTop}px` } : { left: `${-sliderLeft}px` }} >
                        {news.map((item, index) => {
                            return (
                                <Link to={`${langRoute}/news/${item.alias}`} key={index} className={styles.newsBlock}>
                                    <p className={styles.date}>{getDateFormatted(item.date, lang)}</p>
                                    <p className={styles.description}>{item.texts[`${lang}`].name}</p>
                                </Link>
                            );
                        })}
                    </div>
                    <div className={news.length > 3 ? styles.buttons : styles.buttonsHidden}>
                        <button
                            className={desktop ? currentNewsDesktopIndex === 0
                                ? styles.arrowBtn : styles.activeArrowBtn
                                : currentNewsMobileIndex === 0 ? styles.arrowBtn : styles.activeArrowBtn}
                            onClick={this.handleClickSlide('prev')}
                        >
                            <img className={styles.arrowBtnImg} src='/src/apps/client/ui/components/Articles/files/arrowUp.png' />
                        </button>
                        <button
                            className={desktop
                                ? currentNewsDesktopIndex === this.maxSlideDesktop ? styles.arrowBtn : styles.activeArrowBtn
                                : currentNewsMobileIndex === this.maxSlideMobile ? styles.arrowBtn : styles.activeArrowBtn}
                            onClick={this.handleClickSlide('next')}
                        >
                            <img className={styles.arrowBtnImg} src='/src/apps/client/ui/components/Articles/files/arrowDown.png' />
                        </button>
                    </div>
                </div>
            </div>
            <ul className={styles.switches}>
                {news.map((item, i) => {
                    return (
                        <li
                            key={i}
                            className={currentNewsMobileIndex === i ? styles.switchItemActive : styles.switchItem}
                            onClick={this.handleSwitchClick(i)}
                        />
                    );
                })}
            </ul>
        </div>;
    }
}

export default connect(mapStateToProps)(Articles);
