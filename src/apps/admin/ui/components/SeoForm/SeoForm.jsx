import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import updateSeo from '../../../services/updateSeo';

import Form from '../Form/Form';

import getSchema from './seoFormSchema';

import noop from '@tinkoff/utils/function/noop';
import pathOr from '@tinkoff/utils/object/pathOr';
import isEqual from '@tinkoff/utils/is/equal';
import compose from '@tinkoff/utils/function/compose';
import omit from '@tinkoff/utils/object/omit';

const mapDispatchToProps = (dispatch) => ({
    updateStaticSeo: payload => dispatch(updateSeo(payload))
});

class SeoForm extends Component {
    static propTypes = {
        updateStaticSeo: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        onDone: PropTypes.func
    };

    static defaultProps = {
        onDone: noop
    };

    constructor (...args) {
        super(...args);

        const { values } = this.props;

        this.state = {
            lang: 'ua',
            disabled: true
        };
        this.initialValues = this.getInitialValues(values);
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.values !== nextProps.values) {
            this.initialValues = this.getInitialValues(nextProps.values);
        }
    }

    getInitialValues = values => {
        const ua = pathOr(['texts', 'ua'], '', values);
        const en = pathOr(['texts', 'en'], '', values);

        return {
            ua_seoTitle: ua.seoTitle || '',
            en_seoTitle: en.seoTitle || '',
            ua_seoDescription: ua.seoDescription || '',
            en_seoDescription: en.seoDescription || '',
            ua_seoKeywords: { words: ua.seoKeywords && ua.seoKeywords.split(', ') || [], input: '' },
            en_seoKeywords: { words: en.seoKeywords && en.seoKeywords.split(', ') || [], input: '' }
        };
    };

    getPayload = (
        {
            en_seoTitle: enSeoTitle,
            ua_seoTitle: uaSeoTitle,
            en_seoDescription: enSeoDescription,
            ua_seoDescription: uaSeoDescription,
            en_seoKeywords: enSeoKeywords,
            ua_seoKeywords: uaSeoKeywords
        }) => {
        return {
            texts: {
                en: {
                    seoTitle: enSeoTitle,
                    seoDescription: enSeoDescription,
                    seoKeywords: enSeoKeywords.words.join(', ')

                },
                ua: {
                    seoTitle: uaSeoTitle,
                    seoDescription: uaSeoDescription,
                    seoKeywords: uaSeoKeywords.words.join(', ')
                }
            }
        };
    };

    handleChange = (values, changes) => {
        if ('lang' in changes) {
            this.setState({
                lang: values.lang
            });
        }

        this.setState({
            disabled: compose(
                isEqual(this.initialValues),
                omit(['lang'])
            )(values)
        });
    };

    handleSubmit = formValues => {
        const { values } = this.props;
        const payload = this.getPayload(formValues);

        this.setState({
            disabled: true
        });

        return this.props.updateStaticSeo({ ...payload, name: values.name })
            .then(this.props.onDone);
    };

    render () {
        const { lang, disabled } = this.state;

        return <Form
            initialValues={this.initialValues}
            schema={getSchema({
                settings: { lang, disabled }
            })}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
        />;
    }
}

export default connect(null, mapDispatchToProps)(SeoForm);
