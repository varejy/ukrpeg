import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Search.css';
import getDateFormatted from '../../../../../../utils/getDateFormatted';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import searchByText from '../../../services/client/searchByText';

const mapStateToProps = ({ application, news }) => {
    return {
        langMap: application.langMap,
        news: news.news,
        lang: application.lang,
        search: application.search
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchByText: payload => dispatch(searchByText(payload))
    };
};

class Search extends Component {
    static propTypes = {
        searchByText: PropTypes.object.isRequired,
        langMap: PropTypes.object.isRequired,
        lang: PropTypes.string,
        langRoute: PropTypes.string
    };

    static defaultProps = {
        news: []
    };

    state = {
        inputValue: ''
    };

    constructor (props) {
        super(props)

        this.state = {
            news: [],
            search: ''
        };
    }

    componentDidMount () {
        this.props.searchByText(this.props.search).then((values) => {
            this.setState({
                news: values.news
            });
        });
    }

    handleInputChange = event => {
        this.props.searchByText(event.target.value).then((values) => {
            this.setState({
                news: values.news
            });
        });
    };

    render () {
        const { langMap, lang, langRoute } = this.props;
        const { news, inputValue } = this.state;
        const text = propOr('search', {}, langMap);

        return <div className={styles.search}>
            <div className={styles.wrapper}>
                <div className={styles.searchResults}>
                    <div className={styles.inputBlock}>
                        <div className={styles.searchField}>
                            <div className={styles.searchIconZoom}>
                                <img src='/src/apps/client/ui/components/Search/files/searchIcon.png' className={styles.searchIconImg} />
                            </div>
                            <input
                                value={inputValue}
                                onChange={this.handleInputChange}
                                className={styles.inputZoom} />
                        </div>
                        <p className={styles.results}>{text.searchResults} {inputValue}</p>
                    </div>
                    <div className={styles.totalResults}>
                        <h1 className={styles.title}>{text.title}</h1>
                        <div className={styles.amount}>14</div>
                        <div className={styles.amoutnPages}>
                            <p>{`${text.pages}:`}</p>
                        </div>
                        <div className={styles.amountNews}>
                            <p>{`${text.news}:`}</p>
                        </div>
                    </div>
                    <div className={styles.resultsPages}>
                        <h1 className={styles.resultTitle}>{text.resultPages}</h1>
                        <div className={styles.resultPagesList}>
                            {[''].map((item, i) => {
                                return (
                                    <p key={i} className={styles.resultPageItem}>RVV</p>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.resultsNews}>
                        <h1 className={styles.resultTitle}>{text.resultNews}</h1>
                        <div className={styles.resultNewsList}>
                            {news.map((item, i) => {
                                return (
                                    <Link to={`${langRoute}/news/${item.id}`} key={i}>
                                        <div key={i} className={classNames(styles.resultNewsItem, {
                                            [styles.resultNewsItemNotOdd]: !i % 2
                                        })}>
                                            <h1 className={styles.date}>{getDateFormatted(item.date, lang)}</h1>
                                            <p className={styles.news}>{item.texts[`${lang}`].shortDescription}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
