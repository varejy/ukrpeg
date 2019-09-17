import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import { Link, withRouter } from 'react-router-dom';

import SearchInput from '../SearchInput/SearchInput';

import { connect } from 'react-redux';
import classNames from 'classnames';

import styles from './Content.css';

const TABLET_WIDTH = 1024;
const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap,
        langRoute: application.langRoute,
        lang: application.lang,
        mediaWidth: application.media.width,
        mediaHeight: application.media.height
    };
};

class Content extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        langRoute: PropTypes.string,
        lang: PropTypes.string.isRequired,
        mediaWidth: PropTypes.number.isRequired,
        mediaHeight: PropTypes.number.isRequired
    };

    static defaultProps = {
        langRoute: ''
    };

    state = {
        inputZoom: false,
        inputValue: ''
    };

    handleInputSubmit = inputValue => {
        const { langRoute } = this.props;

        if (inputValue) {
            this.props.history.push(`${langRoute}/search?text=${inputValue}`);
        }
    };

    render () {
        const { langMap, langRoute, lang, mediaWidth, mediaHeight } = this.props;
        const text = propOr('content', {}, langMap);
        const isLandscape = mediaWidth > mediaHeight;
        const isMobile = mediaWidth < TABLET_WIDTH;

        return <div className={styles.content}>
            <div className={styles.circlesContainer}>
                <img className={styles.circles} src='/src/apps/client/ui/components/Content/files/circles.png' alt="circles"/>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.photoBlock}>
                    <div className={classNames(styles.topBlock, {
                        [styles.topBlockLandscape]: isLandscape && isMobile
                    })}>
                        <Link to={`${langRoute}/rvv`} className={styles.moreBtn}>
                            <p className={styles.arrowBtn}>
                                <img src='/src/apps/client/ui/components/Content/files/arrow.png' className={styles.arrowImg} />
                            </p>
                            <div className={styles.btn}>{text.buttonText}</div>
                        </Link>
                        <div className={styles.mainText}>
                            <h1 className={styles.title}>{text.title}</h1>
                            <hr className={styles.horizontalLine} />
                            <p className={styles.description}>{text.description}</p>
                        </div>
                    </div>
                    <SearchInput searchFieldClassName={styles.searchField} onSubmit={this.handleInputSubmit}/>
                    <div className={styles.text} style={{ marginTop: `-${lang === 'ua' ? 55 : 145}px` }}>
                        <h1 className={styles.heading} />
                        <p className={styles.info}>{text.text}</p>
                    </div>
                    <div className={styles.graphic}>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default withRouter(connect(mapStateToProps)(Content));
