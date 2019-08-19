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

    render () {
        const { langMap } = this.props;
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
                        <div className={styles.searchIcon}>
                            <img src='/src/apps/client/ui/components/Content/files/searchIcon.png' className={styles.searchIconImg} />
                        </div>
                        <input />
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
