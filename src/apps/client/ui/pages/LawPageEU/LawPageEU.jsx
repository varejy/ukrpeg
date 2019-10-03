import React, { Component } from 'react';
import LawEU from '../../components/LawEU/LawEU';
import styles from './LawPageEU.css';
import classNames from 'classnames';

class LawPageEU extends Component {
    render () {
        return <section className={styles.lawPageContainer}>
            <div className={styles.gridContainer}>
                <div className={classNames(styles.column, styles.column1)}/>
                <div className={classNames(styles.column, styles.column2)}/>
                <div className={classNames(styles.column, styles.column3)}/>
                <div className={classNames(styles.column, styles.column4)}/>
                <div className={classNames(styles.column, styles.column5)}/>
            </div>
            <LawEU />
        </section>;
    }
}

export default LawPageEU;
