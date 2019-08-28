import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Law.css';

import { connect } from 'react-redux';

const mapStateToProps = ({ application, law }) => {
    return {
        langMap: application.langMap,
        lang: application.lang,
        laws: law.lawList
    };
};

class Law extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        lang: PropTypes.string.isRequired,
        laws: PropTypes.array
    };

    static defaultProps = {
        laws: []
    };

    render () {
        const { langMap, laws, lang } = this.props;
        const text = propOr('law', {}, langMap);

        return <div className={styles.law}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>{text.title}</h1>
                <ol className={styles.lawList}>
                    {laws.map((item, i) => {
                        return (
                            <li key={i} className={styles.listItem}>
                                <a href={item.text[`${lang}`].link} target='_blank'>
                                    {item.text[`${lang}`].title}
                                </a>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(Law);
