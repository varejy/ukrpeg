import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import queryString from 'query-string';

import propOr from '@tinkoff/utils/object/propOr';
import getDateFormatted from '../../../../../../utils/getDateFormatted';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import searchByText from '../../../services/client/searchByText';

import styles from './SearchPage.css';

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

class SearchPage extends Component {
    static propTypes = {
        searchByText: PropTypes.func.isRequired,
        langMap: PropTypes.object.isRequired,
        lang: PropTypes.string,
        langRoute: PropTypes.string,
        location: PropTypes.object
    };

    static defaultProps = {
        news: [],
        location: {}
    };

    state = {
        inputValue: ''
    };

    constructor (props) {
        super(props);

        this.state = {
            news: [],
            pages: [],
            search: '',
            loading: true
        };
    }

    componentDidMount () {
        this.searchByText();
    }

    searchByText (props = this.props) {
        const { location: { search } } = props;
        const query = queryString.parse(search);

        this.setState({
            loading: true
        });

        this.props.searchByText(query.text)
            .then(({ pages, news }) => {
                this.setState({
                    text: query.text,
                    news,
                    pages,
                    loading: false
                });
            });
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.location !== this.props.location) {
            this.searchByText(nextProps);
        }
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
        const { news, pages, inputValue, loading } = this.state;
        const text = propOr('search', {}, langMap);

        if (loading) {
            return <div className={styles.loader}>
                <img src='/src/apps/client/ui/pages/SearchPage/files/loader.svg' alt='loader'/>
            </div>;
        }

        return <section className={styles.search}>
            <div className={styles.wrapper}>
                <div className={styles.searchResults}>
                    <div className={styles.inputBlock}>
                        <div className={styles.searchField}>
                            <div className={styles.searchIconZoom}>
                                <img src='/src/apps/client/ui/pages/SearchPage/files/searchIcon.png' className={styles.searchIconImg} />
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
                        <div className={styles.amount}>{news.length + pages.length}</div>
                        <div className={styles.amountPagesWrapper}>
                            <div className={styles.amountPages}>
                                <div>{`${text.pages}:`}</div>
                                <div>{pages.length}</div>
                            </div>
                        </div>
                        <div className={styles.amountNewsWrapper}>
                            <div className={styles.amountNews}>
                                <div>{`${text.news}:`}</div>
                                <div>{news.length}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.resultsPages}>
                        <h1 className={styles.resultTitle}>{text.resultPages}</h1>
                        <div className={styles.resultPagesList}>
                            {pages.map((item, i) => {
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
        </section>;
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
