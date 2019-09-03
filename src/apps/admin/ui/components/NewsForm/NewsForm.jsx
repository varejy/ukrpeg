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

const NEWS_VALUES = ['name', 'views', 'shortDescription', 'description', 'hidden', 'date', 'metaTitle', 'metaDescription', 'metaKeywords'];

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
            ua_metaDescription: ua.metaDescription || '',
            en_metaDescription: en.metaDescription || '',
            ua_metaTitle: ua.metaTitle || '',
            en_metaTitle: en.metaTitle || '',
            ua_metaKeywords: ua.metaKeywords || '',
            en_metaKeywords: en.metaKeywords || '',
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
            en_metaTitle: enMetaTitle,
            ua_metaTitle: uaMetaTitle,
            en_metaDescription: enMetaDescription,
            ua_metaDescription: uaMetaDescription,
            en_metaKeywords: enMetaKeywords,
            ua_metaKeywords: uaMetaKeywords,
            hidden,
            views,
            date,
            id
        }) => {
        return {
            hidden,
            views: +views,
            categoryId: this.props.activeCategory.id,
            date,
            id,
            texts: {
                en: {
                    name: enName,
                    shortDescription: enShortDescription,
                    description: enDescription,
                    metaTitle: enMetaTitle,
                    metaDescription: enMetaDescription,
                    metKeywords: enMetaKeywords
                },
                ua: {
                    name: uaName,
                    shortDescription: uaShortDescription,
                    description: uaDescription,
                    metaTitle: uaMetaTitle,
                    metaDescription: uaMetaDescription,
                    metaKeywords: uaMetaKeywords
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
