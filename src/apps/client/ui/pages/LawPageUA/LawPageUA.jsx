import React, { Component } from 'react';
import LawUA from '../../components/LawUA/LawUA';
import styles from './LawPageUA.css';
import classNames from 'classnames';

class LawPageUA extends Component {
    render () {
        return <section className={styles.lawPageContainer}>
            <div className={styles.gridContainer}>
                <div className={classNames(styles.column, styles.column1)}/>
                <div className={classNames(styles.column, styles.column2)}/>
                <div className={classNames(styles.column, styles.column3)}/>
                <div className={classNames(styles.column, styles.column4)}/>
                <div className={classNames(styles.column, styles.column5)}/>
            </div>
            <LawUA />
        </section>;
    }
}

export default LawPageUA;
