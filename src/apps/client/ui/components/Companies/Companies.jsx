import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Companies.css';
import classNames from 'classnames';

import { connect } from 'react-redux';

const MAX_LOGOS_PER_SLIDE = 5;
const MAX_LOGOS_PER_SLIDE_SMALL = 4;
const MAX_LOGOS_PER_SLIDE_MOBILE = 3;
const MOBILE_WIDTH = 768;
const SMALL_DESKTOP_WIDTH = 1270;

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

    componentWillReceiveProps (nextProps, nextContext) {
        if (nextProps.mediaWidth !== this.props.mediaWidth) {
            this.setState({
                wrapperWidth: this.wrapper.clientWidth,
                left: 0
            });
        }
    }

    handleArrowClick = (direction) => () => {
        const { mediaWidth } = this.props;
        const { left, wrapperWidth } = this.state;
        debugger;
        const companiesPerSlide = mediaWidth <= MOBILE_WIDTH
            ? MAX_LOGOS_PER_SLIDE_MOBILE : mediaWidth <= SMALL_DESKTOP_WIDTH ? MAX_LOGOS_PER_SLIDE_SMALL : MAX_LOGOS_PER_SLIDE;
        const companyWidth = wrapperWidth / companiesPerSlide;
        console.log(wrapperWidth, companiesPerSlide, companyWidth);
        let newLeft = left;

        if (direction === 'left') {
            newLeft = newLeft + companyWidth * companiesPerSlide;
            newLeft = Math.min(newLeft, 0);
        } else {
            const { companies } = this.props;
            newLeft = newLeft - companyWidth * companiesPerSlide;
            newLeft = Math.max(newLeft, -companyWidth * (companies.length - companiesPerSlide));
        }

        this.setState({ left: newLeft });
    };

    render () {
        const { langMap, companies, mediaWidth } = this.props;
        const { left, wrapperWidth } = this.state;
        const text = propOr('companies', {}, langMap);
        const companiesPerSlide = mediaWidth <= MOBILE_WIDTH
            ? MAX_LOGOS_PER_SLIDE_MOBILE : mediaWidth <= SMALL_DESKTOP_WIDTH ? MAX_LOGOS_PER_SLIDE_SMALL : MAX_LOGOS_PER_SLIDE;
        const companyWidth = wrapperWidth / companiesPerSlide;
        const leftArrowVisible = companies.length > companiesPerSlide && left !== 0;
        const rightArrowVisible = companies.length > companiesPerSlide && left !== -companyWidth * (companies.length - companiesPerSlide);

        return <div className={styles.companies}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.title}>{text.title}</div>
                    <div className={styles.slider}>
                        <div className={classNames(styles.arrow, styles.arrowDesktop, styles.arrowLeft, {
                            [styles.arrowLeftVisible]: leftArrowVisible
                        })} onClick={leftArrowVisible ? this.handleArrowClick('left') : undefined}>
                            <img className={styles.arrowIcon} src='/src/apps/client/ui/components/Articles/files/arrowUp.png' alt='arrow'/>
                        </div>
                        <div className={styles.sliderContainer}>
                            <ul className={styles.companiesList}
                                style={{ left: left }}
                                ref={ wrapper => { this.wrapper = wrapper; }}>
                                {
                                    companies.map((item, i) => {
                                        return (
                                            <li key={i} className={styles.itemBox}>
                                                <img src={item.path} className={styles.logo} alt={item.name} />
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                        <div className={classNames(styles.arrow, styles.arrowDesktop, styles.arrowRight, {
                            [styles.arrowRightVisible]: rightArrowVisible
                        })} onClick={rightArrowVisible ? this.handleArrowClick('right') : undefined}>
                            <img className={styles.arrowIcon} src='/src/apps/client/ui/components/Articles/files/arrowUp.png' alt='arrow'/>
                        </div>
                        <div className={styles.arrowMobileContainer}>
                            <div className={classNames(styles.arrow, styles.arrowLeft, {
                                [styles.arrowLeftVisible]: leftArrowVisible
                            })} onClick={leftArrowVisible ? this.handleArrowClick('left') : undefined}>
                                <img className={styles.arrowIcon} src='/src/apps/client/ui/components/Articles/files/arrowUp.png' alt='arrow'/>
                            </div>
                            <div className={classNames(styles.arrow, styles.arrowRight, {
                                [styles.arrowRightVisible]: rightArrowVisible
                            })} onClick={rightArrowVisible ? this.handleArrowClick('right') : undefined}>
                                <img className={styles.arrowIcon} src='/src/apps/client/ui/components/Articles/files/arrowUp.png' alt='arrow'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(Companies);
