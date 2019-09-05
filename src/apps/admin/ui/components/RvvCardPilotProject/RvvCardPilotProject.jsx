import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';
import getSchemaPProject from './rvvCardPilotProject';
import getSchemaMessage from './rvvCardMessage';

import noop from '@tinkoff/utils/function/noop';
import pathOr from '@tinkoff/utils/object/pathOr';

class RvvCardPilotProject extends Component {
    static propTypes = {
        onDone: PropTypes.func,
        value: PropTypes.object,
        type: PropTypes.string,
        title: PropTypes.string

    };

    static defaultProps = {
        onDone: noop,
        value: {},
        type: '',
        title: ''
    };

    constructor (...args) {
        super(...args);

        const { value } = this.props;

        this.initialValuesProject = {
            ua_sity: pathOr(['texts', 'ua', 'sity'], '', value),
            en_sity: pathOr(['texts', 'en', 'sity'], '', value),
            en_description: pathOr(['texts', 'en', 'description'], '', value),
            ua_description: pathOr(['texts', 'ua', 'description'], '', value),
        };

        this.initialValuesMessage = {
            en_description: pathOr(['texts', 'en', 'description'], '', value),
            ua_description: pathOr(['texts', 'ua', 'description'], '', value),
        };

        this.state = {
            lang: 'ua'
        };
    }

    getCategoryPayload = (
        {
            en_sity: enSity,
            ua_sity: uaSity,
            en_description: enDescription,
            ua_description: uaDescription
        }) => {
        return {
            texts: {
                en: {
                    sity: enSity,
                    description: enDescription
                },
                ua: {
                    sity: uaSity,
                    description: uaDescription
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
    };

    handleSubmit = values => {
        /* const { id } = this.state;
        const categoryPayload = this.getCategoryPayload(values);
        (
            id
                ? this.props.editNewsCategory({ ...categoryPayload, id })
                : this.props.saveNewsCategory({
                    ...categoryPayload,
                    positionIndex: categoryPayload.positionIndex || this.props.categories.length
                })
        )
            .then(() => {
                this.props.onDone();
            }); */
    };

    render () {
        const { lang } = this.state;
        const { type, title } = this.props;
        const getSchema = type !== 'message' ? getSchemaPProject : getSchemaMessage;
        const initialValues = type !== 'message' ? this.initialValuesProject : this.initialValuesMessage;

        return <Form
            initialValues={initialValues}
            schema={getSchema({
                data: { title },
                settings: { lang }
            })}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
        />;
    }
}

export default RvvCardPilotProject;
