import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import noop from '@tinkoff/utils/function/noop';

import styles from './SearchInput.css';

class SearchInput extends Component {
    static propTypes = {
        searchFieldClassName: PropTypes.string,
        onSubmit: PropTypes.func
    };

    static defaultProps = {
        searchFieldClassName: '',
        onSubmit: noop
    };

    state = {
        inputZoom: false,
        inputValue: ''
    };

    handleInputChange = event => {
        this.setState({
            inputValue: event.target.value
        });
    };

    handleFocusInput = () => {
        this.setState({
            inputZoom: true
        });
    };

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
    };

    handleInputSubmit = event => {
        event.preventDefault();
        const { inputValue } = this.state;

        this.props.onSubmit(inputValue);
    };

    render () {
        const { searchFieldClassName } = this.props;
        const { inputZoom, inputValue } = this.state;

        return <form className={searchFieldClassName} onSubmit={this.handleInputSubmit}>
            <button className={classNames(styles.buttonDefault, !inputZoom ? styles.searchIcon : styles.searchIconZoom)}>
                <img src='/src/apps/client/ui/components/Content/files/searchIcon.png' className={styles.searchIconImg} />
            </button>
            <input
                onFocus={this.handleFocusInput}
                onBlur={this.handleBlurInput}
                value={inputValue}
                onChange={this.handleInputChange}
                className={!inputZoom ? styles.input : styles.inputZoom} />
        </form>;
    }
}

export default SearchInput;
