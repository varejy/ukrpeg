import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { connect } from 'react-redux';

import calcScrollbarWidth from 'scrollbar-width';

import styles from './Carousel.css';
import SearchInput from '../SearchInput/SearchInput';

const TIME_TO_NEXT_SWITCHING = 8000;
const SWITCHING_DURATION = 800;
const TABLET_WIDTH = 1024;

const mapStateToProps = ({ application }) => {
    return {
        slides: application.slides,
        langMap: application.langMap,
        langRoute: application.langRoute,
        lang: application.lang,
        mediaWidth: application.media.width,
        mediaHeight: application.media.height
    };
};

class Carousel extends Component {
    static propTypes = {
        slides: PropTypes.array,
        mediaWidth: PropTypes.number.isRequired,
        mediaHeight: PropTypes.number.isRequired,
        lang: PropTypes.string.isRequired
    };

    static defaultProps = {
        slides: []
    };

    constructor (...args) {
        super(...args);

        this.animation = false;
        this.maxSlideIndex = this.props.slides.length - 1;
        this.state = {
            activeSlideIndex: 0,
            sliderLeft: 0
        };
    }

    maxSlide = this.props.slides.length - 1;
    maxLeft = this.maxSlide * this.props.mediaWidth;

    componentDidMount () {
        this.startSlider();
    }

    componentWillReceiveProps (nextProps) {
        const scrollbarWidth = calcScrollbarWidth();
        if (nextProps.mediaWidth !== this.props.mediaWidth) {
            const { activeSlideIndex } = this.state;

            this.maxLeft = (document.documentElement.clientWidth * this.maxSlide) + scrollbarWidth * this.maxSlide;
            this.setState({
                sliderLeft: (document.documentElement.clientWidth * activeSlideIndex) + scrollbarWidth * activeSlideIndex
            });
        }
    }

    componentWillUnmount () {
        this.isUnmount = true;
    }

    startSlider = () => {
        this.setTimeoutToNextSlide();
    };

    setTimeoutToNextSlide = () => {
        const scrollbarWidth = calcScrollbarWidth();
        this.sliderTimoutId = setTimeout(() => {
            if (this.isUnmount) {
                return;
            }

            const { activeSlideIndex } = this.state;

            const nextActiveSlideIndex = activeSlideIndex + 1;

            this.setState({
                activeSlideIndex: nextActiveSlideIndex <= this.maxSlideIndex ? nextActiveSlideIndex : 0,
                sliderLeft: nextActiveSlideIndex <= this.maxSlideIndex
                    ? (document.documentElement.clientWidth * nextActiveSlideIndex) + scrollbarWidth * nextActiveSlideIndex
                    : 0
            });

            this.doSlideSwitch();
        }, TIME_TO_NEXT_SWITCHING);
    };

    doSlideSwitch = () => {
        const { activeSlideIndex } = this.state;
        const scrollbarWidth = calcScrollbarWidth();

        this.animation = true;
        this.sliderTrack.style.transition = `left ${SWITCHING_DURATION}ms`;
        this.sliderTrack.style.left = `-${(document.documentElement.clientWidth * activeSlideIndex) + scrollbarWidth * activeSlideIndex}px`;

        this.sliderTimoutId = setTimeout(() => {
            this.animation = false;
            this.setTimeoutToNextSlide();
        }, SWITCHING_DURATION);
    };

    stopSlider = () => clearTimeout(this.sliderTimoutId);

    setActiveSlide = (nextActiveSlideIndex) => () => {
        const { activeSlideIndex } = this.state;

        if (this.animation || activeSlideIndex === nextActiveSlideIndex) {
            return;
        }

        this.animation = true;
        this.stopSlider();

        const scrollbarWidth = calcScrollbarWidth();

        if (this.state.activeSlideIndex < nextActiveSlideIndex) {
            const hidedSlides = nextActiveSlideIndex - activeSlideIndex - 1;

            for (let i = activeSlideIndex + 1; i < nextActiveSlideIndex; i++) {
                this.sliderTrack.children[i].style.display = 'none';
            }

            this.sliderTrack.style.transition = `left ${SWITCHING_DURATION}ms`;
            this.sliderTrack.style.left =
                `-${(document.documentElement.clientWidth * (nextActiveSlideIndex - hidedSlides)) + scrollbarWidth * (nextActiveSlideIndex - hidedSlides)}px`;
        } else {
            this.sliderTrack.style.transition = 'none';

            for (let i = nextActiveSlideIndex + 1; i < activeSlideIndex; i++) {
                this.sliderTrack.style.left =
                    `-${(document.documentElement.clientWidth * (nextActiveSlideIndex + 1)) + scrollbarWidth * (nextActiveSlideIndex + 1)}px`;
                this.sliderTrack.children[i].style.display = 'none';
            }

            setTimeout(() => {
                this.sliderTrack.style.transition = `left ${SWITCHING_DURATION}ms`;
                this.sliderTrack.style.left = `-${(document.documentElement.clientWidth * nextActiveSlideIndex) + scrollbarWidth * nextActiveSlideIndex}px`;
            }, 0);
        }

        this.setState({
            activeSlideIndex: nextActiveSlideIndex,
            sliderLeft: nextActiveSlideIndex <= this.maxSlideIndex
                ? (document.documentElement.clientWidth * nextActiveSlideIndex) + scrollbarWidth * nextActiveSlideIndex
                : 0
        });

        setTimeout(() => {
            for (let i = 0; i < this.sliderTrack.children.length; i++) {
                this.sliderTrack.children[i].style.display = 'flex';
            }
            this.sliderTrack.style.transition = 'none';
            this.sliderTrack.style.left = `-${(document.documentElement.clientWidth * nextActiveSlideIndex) + scrollbarWidth * nextActiveSlideIndex}px`;

            this.animation = false;
            this.setTimeoutToNextSlide();
        }, SWITCHING_DURATION);
    };

    render () {
        const { lang, mediaWidth, mediaHeight, slides } = this.props;
        const { activeSlideIndex } = this.state;
        const isLandscape = mediaWidth > mediaHeight;
        const isMobile = mediaWidth < TABLET_WIDTH;

        return <div className={styles.carousel}>
            <div className={styles.sliderTrack} ref={ref => { this.sliderTrack = ref; }}>
                { slides.map((slide, i) => <div className={classNames(styles.content, slide)} key={i}>
                    <div className={classNames(styles.wrapper, styles.imageWrapper)}>
                        <div className={classNames(styles.photoBlock, styles.image)} style={{ backgroundImage: `url(${slide.photo})` }}>
                            <div className={classNames(styles.topBlock, {
                                [styles.topBlockLandscape]: isLandscape && isMobile
                            })}>
                                <div className={styles.mainText}>
                                    <h1 className={styles.title}>{slide.texts[`${lang}`].title}</h1>
                                    <hr className={styles.horizontalLine} />
                                    <p className={styles.description}>{slide.texts[`${lang}`].description}</p>
                                </div>
                            </div>
                            <SearchInput searchFieldClassName={styles.searchField} onSubmit={this.handleInputSubmit}/>
                            <div className={styles.text}>
                                <h1 className={styles.heading}>{slide.texts[`${lang}`].subTitle}</h1>
                                <p className={styles.info}>{slide.texts[`${lang}`].subDescription}</p>
                            </div>
                            <div className={styles.graphic} style={{ backgroundImage: `url(${slide.additionalPhoto})` }}>
                            </div>
                        </div>
                    </div>
                </div>) }
            </div>
            <div className={classNames(styles.dots, {
                [styles.dotsLandscape]: isLandscape && isMobile
            })}>
                { slides.map((slide, i) =>
                    <div key={i} className={classNames(styles.dot, { [styles.dotActive]: i === activeSlideIndex })} onClick={this.setActiveSlide(i)} />) }
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(Carousel);
