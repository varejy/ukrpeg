import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Content.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap,
        langRoute: application.langRoute
    };
};

class Content extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        langRoute: PropTypes.string
    };

    static defaultProps = {
        langRoute: ''
    };

    state = {
        inputZoom: false,
        inputValue: ''
    }

    handleInputChange = event => {
        this.setState({
            inputValue: event.target.value
        });
    }

    handleFocusInput = () => {
        this.setState({
            inputZoom: true
        });
    }

    handleBlurInput = event => {
        if (event.target.value !== '') {
            this.setState({
                inputZoom: !!event.target.value
            });
        } else {
            this.setState({
                inputZoom: false
            });
        }
    }

    render () {
        const { langMap, langRoute } = this.props;
        const { inputZoom, inputValue } = this.state;
        const text = propOr('content', {}, langMap);

        return <div className={styles.content}>
            <div className={styles.wrapper}>
                <div className={styles.photoBlock}>
                    <div className={styles.topBlock}>
                        <div className={styles.moreBtn}>
                            <p className={styles.arrowBtn}>
                                <img src='/src/apps/client/ui/components/Content/files/arrow.png' className={styles.arrowImg} />
                            </p>
                            <div className={styles.btn}>{text.buttonText}</div>
                        </div>
                        <div className={styles.mainText}>
                            <h1 className={styles.title}>{text.title}</h1>
                            <hr className={styles.horizontalLine} />
                            <p className={styles.description}>{text.description}</p>
                        </div>
                    </div>
                    <div className={styles.searchField}>
                        <Link to={`${langRoute}/search`} className={!inputZoom ? styles.searchIcon : styles.searchIconZoom}>
                            <img src='/src/apps/client/ui/components/Content/files/searchIcon.png' className={styles.searchIconImg} />
                        </Link>
                        <input
                            onFocus={this.handleFocusInput}
                            onBlur={this.handleBlurInput}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            className={!inputZoom ? styles.input : styles.inputZoom} />
                    </div>
                    <div className={styles.text}>
                        <h1 className={styles.heading}></h1>
                        <p className={styles.info}>{text.text}</p>
                    </div>
                    <div className={styles.graphic}>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(Content);
