import React, { Component } from 'react';
import LawUA from '../../components/LawUA/LawUA';
import LawEU from '../../components/LawEU/LawEU';
import styles from './LawPage.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = ({ laws }) => {
    return {
        activeOption: laws.activeOption
    };
};

class LawPage extends Component {
    static propTypes = {
        activeOption: PropTypes.string
    };

    static defaultProps = {
        activeOption: 'ua'
    };

    render () {
        const { activeOption } = this.props;

        return <section className={styles.lawPageContainer}>
            <div className={styles.gridContainer}>
                <div className={classNames(styles.column, styles.column1)}/>
                <div className={classNames(styles.column, styles.column2)}/>
                <div className={classNames(styles.column, styles.column3)}/>
                <div className={classNames(styles.column, styles.column4)}/>
                <div className={classNames(styles.column, styles.column5)}/>
            </div>
            {
                activeOption === 'ua' ? <LawUA /> : <LawEU />
            }
        </section>;
    }
}

export default connect(mapStateToProps)(LawPage);
