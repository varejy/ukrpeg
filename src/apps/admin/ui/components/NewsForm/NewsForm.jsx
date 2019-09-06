import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import saveNews from '../../../services/saveNews';
import editNews from '../../../services/editNews';
import updateNewsAvatar from '../../../services/updateNewsAvatar';

import Form from '../Form/Form';
import getSchema from './newsItemFormSchema';

import noop from '@tinkoff/utils/function/noop';
import pick from '@tinkoff/utils/object/pick';
import prop from '@tinkoff/utils/object/prop';
import pathOr from '@tinkoff/utils/object/pathOr';
import format from 'date-fns/format';

const NEWS_VALUES = ['hidden', 'alias'];

const mapDispatchToProps = (dispatch) => ({
    saveNews: payload => dispatch(saveNews(payload)),
    editNews: payload => dispatch(editNews(payload)),
    updateNewsAvatar: (...payload) => dispatch(updateNewsAvatar(...payload))
});

class NewsForm extends Component {
    static propTypes = {
        saveNews: PropTypes.func.isRequired,
        editNews: PropTypes.func.isRequired,
        updateNewsAvatar: PropTypes.func.isRequired,
        onDone: PropTypes.func,
        news: PropTypes.object,
        activeCategory: PropTypes.object
    };

    static defaultProps = {
        onDone: noop,
        news: {},
        activeCategory: {}
    };

    constructor (...args) {
        super(...args);

        const { news } = this.props;
        const ua = pathOr(['texts', 'ua'], '', news);
        const en = pathOr(['texts', 'en'], '', news);

        this.initialValues = {
            hidden: false,
            date: format(new Date(), 'YYYY-MM-DD'),
            views: 0,
            avatar: {
                files: news.avatar ? [news.avatar] : [],
                removedFiles: []
            },
            ua_name: ua.name || '',
            en_name: en.name || '',
            en_shortDescription: en.shortDescription || '',
            ua_shortDescription: ua.shortDescription || '',
            ua_description: ua.description || '',
            en_description: en.description || '',
            ua_seoTitle: ua.seoTitle || '',
            en_seoTitle: en.seoTitle || '',
            ua_seoDescription: ua.seoDescription || '',
            en_seoDescription: en.seoDescription || '',
            ua_seoKeywords: { words: ua.seoKeywords && ua.seoKeywords.split(', ') || [], input: '' },
            en_seoKeywords: { words: en.seoKeywords && en.seoKeywords.split(', ') || [], input: '' },
            lang: 'ua',
            ...pick(NEWS_VALUES, news)
        };
        this.id = prop('id', news);
        this.state = {
            lang: 'ua'
        };
    }

    getNewsItemPayload = (
        {
            en_name: enName,
            ua_name: uaName,
            en_shortDescription: enShortDescription,
            ua_shortDescription: uaShortDescription,
            en_description: enDescription,
            ua_description: uaDescription,
            en_seoTitle: enSeoTitle,
            ua_seoTitle: uaSeoTitle,
            en_seoDescription: enSeoDescription,
            ua_seoDescription: uaSeoDescription,
            en_seoKeywords: enSeoKeywords,
            ua_seoKeywords: uaSeoKeywords,
            alias,
            hidden,
            views,
            date,
            id
        }) => {
        return {
            hidden,
            views: +views,
            categoryId: this.props.activeCategory.id,
            alias,
            date,
            id,
            texts: {
                en: {
                    name: enName,
                    shortDescription: enShortDescription,
                    description: enDescription,
                    seoTitle: enSeoTitle,
                    seoDescription: enSeoDescription,
                    seoKeywords: enSeoKeywords.words.join(', ')
                },
                ua: {
                    name: uaName,
                    shortDescription: uaShortDescription,
                    description: uaDescription,
                    seoTitle: uaSeoTitle,
                    seoDescription: uaSeoDescription,
                    seoKeywords: uaSeoKeywords.words.join(', ')
                }
            }
        };
    };

    handleChange = (values) => {
        this.setState({
            lang: values.lang
        });
    };

    handleSubmit = values => {
        event.preventDefault();

        const newsItemPayload = this.getNewsItemPayload(values);

        (this.id ? this.props.editNews({ ...newsItemPayload, id: this.id }) : this.props.saveNews(newsItemPayload))
            .then(newsItem => {
                const { files } = values.avatar;

                if (files[0].content) {
                    const formData = new FormData();

                    formData.append(`news-${newsItem.id}-avatar`, files[0].content);

                    return this.props.updateNewsAvatar(formData, newsItem.id);
                }
            })
            .then(() => {
                this.props.onDone();
            });
    };

    render () {
        const { lang } = this.state;

        return <Form
            initialValues={this.initialValues}
            lang={lang}
            schema={getSchema({
                data: { title: this.id ? 'Редактирование новости' : 'Добавление новости' },
                settings: { lang }
            })}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
        />;
    }
}

export default connect(null, mapDispatchToProps)(NewsForm);
