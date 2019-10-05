import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';
import getSchema from './mainSlideFormSchema';
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
            ua_title: pathOr(['texts', 'ua', 'title'], '', slide),
            en_title: pathOr(['texts', 'en', 'title'], '', slide),
            ua_description: pathOr(['texts', 'ua', 'description'], '', slide),
            en_description: pathOr(['texts', 'en', 'description'], '', slide),
            ua_subTitle: pathOr(['texts', 'ua', 'subTitle'], '', slide),
            en_subTitle: pathOr(['texts', 'en', 'subTitle'], '', slide),
            ua_subDescription: pathOr(['texts', 'ua', 'subDescription'], '', slide),
            en_subDescription: pathOr(['texts', 'en', 'subDescription'], '', slide),
            photo: {
                files: slide && slide.photo ? [slide.photo] : [],
                removedFiles: []
            },
            additionalPhoto: {
                files: slide && slide.additionalPhoto ? [slide.additionalPhoto] : [],
                removedFiles: []
            },
            lang: 'ua',
        };

        this.state = {
            lang: 'ua',
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
    };

    handleSubmit = values => {
        const { index } = this.state;
        const sendValues = {
            texts: {
                en: {
                    title: values.en_title,
                    description: values.en_description,
                    subTitle: values.en_subTitle,
                    subDescription: values.en_subDescription
                },
                ua: {
                    title: values.ua_title,
                    description: values.ua_description,
                    subTitle: values.ua_subTitle,
                    subDescription: values.ua_subDescription
                }
            },
            file: values.photo.files[0],
            additionalFile: values.additionalPhoto.files[0],
            removedFiles: [values.photo.removedFiles[0], values.additionalPhoto.removedFiles[0]]
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
