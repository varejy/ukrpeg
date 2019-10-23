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
        mediaWidth: application.media.width,
        landscape: application.media.landscape
    };
};

class Content extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        langRoute: PropTypes.string,
        mediaWidth: PropTypes.number.isRequired,
        landscape: PropTypes.bool
    };

    static defaultProps = {
        langRoute: '',
        landscape: false
    };

    state = {
        inputZoom: false,
        inputValue: '',
        contentHeight: null
    };

    componentDidMount () {
        this.setSlideHeight();
    }

    componentWillReceiveProps (nextProps, nextContext) {
        if (nextProps.landscape !== this.props.landscape) {
            this.setSlideHeight(nextProps);
        }
    }

    setSlideHeight = () => {
        const vh = window.innerHeight * 0.01 * 100;

        this.setState({
            contentHeight: vh
        });
    };

    handleInputSubmit = inputValue => {
        const { langRoute } = this.props;

        if (inputValue) {
            this.props.history.push(`${langRoute}/search?text=${inputValue}`);
        }
    };

    render () {
        const { langMap, langRoute, mediaWidth, landscape } = this.props;
        const { contentHeight } = this.state;
        const text = propOr('content', {}, langMap);
        const isMobile = mediaWidth < TABLET_WIDTH;

        return <div className={styles.content}>
            <div className={styles.circlesContainer}>
                <img className={styles.circles} src='/src/apps/client/ui/components/Content/files/circles.png' alt="circles"/>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.photoBlock} style={isMobile && contentHeight ? { height: contentHeight } : {}}>
                    <div className={classNames(styles.topBlock, {
                        [styles.topBlockLandscape]: landscape && isMobile
                    })} style={isMobile && contentHeight ? { height: contentHeight / 2 } : {}}>
                        <Link to={`${langRoute}/rvv`} className={styles.moreBtn}>
                            <p className={styles.arrowBtn}>
                                <img src='/src/apps/client/ui/components/Content/files/arrow.png' alt='arrow' className={styles.arrowImg} />
                            </p>
                            <div className={styles.btn}>{text.buttonText}</div>
                        </Link>
                    </div>
                    <SearchInput searchFieldClassName={styles.searchField} onSubmit={this.handleInputSubmit}/>
                </div>
            </div>
        </div>;
    }
}

export default withRouter(connect(mapStateToProps)(Content));
