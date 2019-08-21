import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './About.css';

import { connect } from 'react-redux';

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap
    };
};

class About extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired
    };

    render () {
        const { langMap } = this.props;
        const text = propOr('about', {}, langMap);

        const content = [
            {
                img: '/src/apps/client/ui/components/About/files/can.png',
                ...text.content[0]
            },
            {
                img: '/src/apps/client/ui/components/About/files/bottle.png',
                ...text.content[1]
            },
            {
                img: '/src/apps/client/ui/components/About/files/recycle.jpg',
                ...text.content[2]
            }
        ];

        console.log(content);
        return <div className={styles.about}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>{text.title}</h1>
                <div className={styles.content}>
                    {content.map((item, i) => {
                        return (
                            <div key={i} className={styles.contentBlock}>
                                <img src={item.img} className={styles.img} />
                                <p className={styles.description}>{item.text}</p>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.graphic}></div>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(About);
