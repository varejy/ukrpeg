import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './LawUA.css';

import { connect } from 'react-redux';

const mapStateToProps = ({ application, laws }) => {
    return {
        langMap: application.langMap,
        lang: application.lang,
        laws: laws.ua
    };
};

class LawUA extends Component {
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
        const text = propOr('lawUA', {}, langMap);

        return <div className={styles.law}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>{text.title}</h1>
                <ol className={styles.lawList}>
                    {laws.map((item, i) => {
                        return (
                            <li key={i} className={styles.listItem}>
                                <a href={item.path} target='_blank'>
                                    {item.texts[`${lang}`].name}
                                </a>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(LawUA);
