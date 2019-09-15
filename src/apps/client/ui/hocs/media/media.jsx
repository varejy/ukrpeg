import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import setMediaInfo from '../../../actions/setMediaInfo';

import bp from './mediaBreakpoints';

import debounce from 'lodash.debounce';
import map from '@tinkoff/utils/object/map';

const DEBOUNCE_DURATION = 300;

const isLandscape = () => {
    try {
        if (window.orientation) {
            return { matches: Math.abs(window.orientation) === 90 };
        }

        return { matches: window.screen.orientation.type.split('-')[0] === 'landscape' };
    } catch (err) {
        return { matches: true };
    }
};

const mapDispatchToProps = (dispatch) => ({
    setMediaInfo: payload => dispatch(setMediaInfo(payload))
});

const media = WrappedComponent => {
    class Media extends PureComponent {
        static propTypes = {
            setMediaInfo: PropTypes.func.isRequired
        };

        constructor (...args) {
            super(...args);

            this.updateMediaInfoDebounced = debounce(this.updateMediaInfo, DEBOUNCE_DURATION);
        }

        componentDidMount () {
            if (typeof window === 'undefined') {
                return;
            }

            this.handleResize();

            window.addEventListener('resize', this.handleResize);
        }

        componentWillUnmount () {
            window.removeEventListener('resize', this.handleResize);
        }

        handleResize = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

            this.updateMediaInfoDebounced();
        };

        updateMediaInfo = () => {
            this.props.setMediaInfo(this.getMediaInfo());
        };

        getMediaInfo = () => ({
            ...map(value => {
                const query = window.matchMedia(value);

                return query.matches;
            }, bp),
            landscape: isLandscape().matches,
            width: window.innerWidth,
            height: window.innerHeight
        });

        render () {
            return <WrappedComponent
                {...this.props}
            />;
        }
    }

    return connect(undefined, mapDispatchToProps)(Media);
};

export default media;
