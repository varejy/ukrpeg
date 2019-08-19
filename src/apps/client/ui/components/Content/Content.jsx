import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Content.css';

import { connect } from 'react-redux';

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap
    };
};

class Content extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired
    };

    state = {
        inputZoom: false,
        inputValue: ''
    }

    handleClick = e => {
        this.setState({
            inputZoom: true
        });
        this.input.focus();
    }

    handleBlur = e => {
        this.setState({
            inputZoom: false
        });
    }

    handleInputChange = e => {
        this.setState({
            inputValue: e.target.value
        });
    }

    render () {
        const { langMap } = this.props;
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
                    <div className={styles.searchField} onClick={this.handleClick}>
                        <div className={!inputZoom ? styles.searchIcon : styles.searchIconZoomed}>
                            <img src='/src/apps/client/ui/components/Content/files/searchIcon.png' className={styles.searchIconImg} />
                        </div>
                        <input
                            ref={(input) => this.input = input}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleBlur}
                            className={!inputZoom ? styles.input : styles.inputFieldZoomed} />
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
