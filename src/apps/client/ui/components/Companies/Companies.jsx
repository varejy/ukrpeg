import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Companies.css';

import { connect } from 'react-redux';

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap,
        companies: application.partners
    };
};

class Companies extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        companies: PropTypes.array
    };

    render () {
        const { langMap, companies } = this.props;
        const text = propOr('companies', {}, langMap);

        return <div className={styles.companies}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.title}>{text.title}</div>
                    <ul className={styles.companiesList}>
                        {companies.map((item, i) => {
                            return (
                                <li key={i} className={styles.itemBox}>
                                    <img src={item.path} className={styles.logo} alt={item.title} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(Companies);
