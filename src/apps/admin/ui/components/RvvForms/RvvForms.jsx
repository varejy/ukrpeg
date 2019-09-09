import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';

import noop from '@tinkoff/utils/function/noop';

class RvvListForm extends Component {
    static propTypes = {
        onDone: PropTypes.func,
        editableElem: PropTypes.object.isRequired
    };

    static defaultProps = {
        onDone: noop
    };

    constructor (...args) {
        super(...args);

        const { editableElem } = this.props;

        this.initialValues = editableElem.getInitialValues(editableElem.value);
        this.schema = editableElem.schema;

        this.state = {
            lang: 'ua'
        };
    }

    handleChange = (values, changes) => {
        if ('lang' in changes) {
            this.setState({
                lang: values.lang
            });
        }
    };

    handleSubmit = values => {
        const { editableElem } = this.props;
        const sendValues = {
            texts: {
                en: {
                    title: values.en_title,
                    ...(values.en_description ? { description: values.en_description } : {})
                },
                ua: {
                    title: values.ua_title,
                    ...(values.ua_description ? { description: values.ua_description } : {})
                }
            },
            file: values.avatar && values.avatar.files && values.avatar.files[0],
            removedFile: values.avatar && values.avatar.removedFiles && values.avatar.removedFiles[0],
            alt: values.alt
        };

        this.props.onDone(sendValues, editableElem);
    };

    render () {
        const { lang } = this.state;

        return <Form
            initialValues={this.initialValues}
            schema={this.schema({
                data: { title: 'Редактирование' },
                settings: { lang }
            })}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
        />;
    }
}

export default RvvListForm;
