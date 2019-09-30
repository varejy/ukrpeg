import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';
import getSchema from './aboutFormSchema';
import pathOr from '@tinkoff/utils/object/pathOr';

class MainSlideForm extends Component {
    static propTypes = {
        editableSlide: PropTypes.object.isRequired,
        onDone: PropTypes.func.isRequired
    };

    static defaultProps = {
        editableSlide: {}
    };

    constructor (props) {
        super(props);

        const { editableSlide: { slide, index } } = this.props;

        this.initialValues = {
            ua_text: pathOr(['texts', 'ua', 'text'], '', slide),
            en_text: pathOr(['texts', 'en', 'text'], '', slide),
            avatar: {
                files: slide && slide.photo ? [slide.photo] : [],
                removedFiles: []
            },
            video: slide && slide.video || '',
            lang: 'ua',
            contentType: slide && slide.contentType ? slide.contentType : 'photo'
        };

        this.state = {
            lang: 'ua',
            contentType: this.initialValues.contentType,
            slide,
            index
        };
    }

    handleChange = (values, changes) => {
        if ('lang' in changes) {
            this.setState({
                lang: changes.lang
            });
        }
        if ('contentType' in changes) {
            this.setState({
                contentType: changes.contentType
            });
        }
    };

    handleSubmit = values => {
        const { index } = this.state;
        const sendValues = {
            texts: {
                en: {
                    text: values.en_text
                },
                ua: {
                    text: values.ua_text
                }
            },
            file: values.avatar.files[0],
            removedFile: values.avatar.removedFiles[0],
            video: values.video,
            contentType: values.contentType
        };

        this.props.onDone(sendValues, index);
    };

    render () {
        const { lang, contentType } = this.state;

        return <Form
            initialValues={this.initialValues}
            schema={getSchema({
                settings: { lang, contentType }
            })}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
        />;
    }
}

export default MainSlideForm;
