import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Companies.css';
import classNames from 'classnames';

import { connect } from 'react-redux';

const TABLET_WIDTH = 1024;
const MAX_LOGOS_PER_SLIDE = 5;
const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap,
        companies: application.partners,
        mediaWidth: application.media.width
    };
};

class Companies extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        companies: PropTypes.array,
        mediaWidth: PropTypes.number.isRequired
    };

    state = {
        left: 0,
        wrapperWidth: 0
    };

    componentDidMount () {
        this.setState({ wrapperWidth: this.wrapper.clientWidth });
    }

    handleArrowClick = (direction) => () => {
        const { left, wrapperWidth } = this.state;

        this.setState({ left: direction === 'right' ? left + wrapperWidth : left - wrapperWidth });
    };

    render () {
        const { langMap, companies, mediaWidth } = this.props;
        const { left, wrapperWidth } = this.state;
        const text = propOr('companies', {}, langMap);
        const maxSlides = Math.ceil(companies.length / MAX_LOGOS_PER_SLIDE);
        const isMobile = mediaWidth < TABLET_WIDTH;

        return <div className={styles.companies}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.title}>{text.title}</div>
                    <div className={styles.slider}>
                        <div className={classNames(styles.arrow, styles.arrowLeft, {
                            [styles.arrowLeftVisible]: (companies.length > MAX_LOGOS_PER_SLIDE && left !== 0)
                        })} onClick={this.handleArrowClick('left')}>
                            <img className={styles.arrowIcon} src='/src/apps/client/ui/components/Articles/files/arrowUp.png' alt='arrow'/>
                        </div>
                        <div className={styles.sliderContainer}>
                            <ul className={styles.companiesList}
                                style={{ left: `-${left}px` }}
                                ref={ wrapper => { this.wrapper = wrapper; }}>
                                {!isMobile
                                    ? companies.map((item, i) => {
                                        return (
                                            <li key={i} className={styles.itemBox}>
                                                <img src={item.path} className={styles.logo} alt={item.name} />
                                            </li>
                                        );
                                    })
                                    : /* тут логика рендера партнеров для мобилки */ companies.map((item, i) => {
                                        return (
                                            <li key={i} className={styles.itemBox}>
                                                <img src={item.path} className={styles.logo} alt={item.name} />
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                        <div className={classNames(styles.arrow, styles.arrowRight, {
                            [styles.arrowRightVisible]: (companies.length > MAX_LOGOS_PER_SLIDE && left !== (maxSlides - 1) * wrapperWidth)
                        })} onClick={this.handleArrowClick('right')}>
                            <img className={styles.arrowIcon} src='/src/apps/client/ui/components/Articles/files/arrowUp.png' alt='arrow'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(Companies);
