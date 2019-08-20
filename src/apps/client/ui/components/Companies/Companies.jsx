import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Companies.css';

import { connect } from 'react-redux';

const companies = [
    {
        id: 1,
        alt: 'Elopac logo',
        path: '/src/apps/client/ui/components/Companies/files/elopak.png'
    },
    {
        id: 2,
        alt: 'PepsiCo logo',
        path: '/src/apps/client/ui/components/Companies/files/pepsico.png'
    },
    {
        id: 3,
        alt: 'Coca Cola logo',
        path: '/src/apps/client/ui/components/Companies/files/cocacola.png'
    },
    {
        id: 4,
        alt: 'Canpak logo',
        path: '/src/apps/client/ui/components/Companies/files/canpak.png'
    },
    {
        id: 5,
        alt: 'Tetrapak logo',
        path: '/src/apps/client/ui/components/Companies/files/tetrapak.png'
    }
];

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap
    };
};

class Companies extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired
    };

    render () {
        const { langMap } = this.props;
        const text = propOr('companies', {}, langMap);

        return <div className={styles.companies}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.title}>{text.title}</div>
                    <ul className={styles.companiesList}>
                        {companies.map(item => {
                            return (
                                <li key={item.id} className={styles.itemBox}>
                                    <img src={item.path} className={styles.logo} />
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
