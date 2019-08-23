import FormFieldInput from '../Form/fields/FormFieldInput/FormFieldInput.jsx';
import FormFieldDate from '../Form/fields/FormFieldDate/FormFieldDate.jsx';
import FormFieldTitle from '../Form/fields/FormFieldTitle/FormFieldTitle.jsx';
import FormFieldButton from '../Form/fields/FormFieldButton/FormFieldButton';
import FormFieldCheckbox from '../Form/fields/FormFieldCheckbox/FormFieldCheckbox';
import FormFieldFiles from '../Form/fields/FormFieldFiles/FormFieldFiles';

export default function ({ data: { title } = {} } = {}) {
    return {
        fields: [
            {
                component: FormFieldTitle,
                name: 'title',
                schema: {
                    label: title,
                    variant: 'h5'
                }
            },
            {
                component: FormFieldInput,
                name: 'name',
                schema: {
                    label: 'Название'
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните название новости' } }
                ]
            },
            {
                component: FormFieldInput,
                name: 'shortDescription',
                schema: {
                    label: 'Краткое описание',
                    multiline: true
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните краткое описание' } }
                ]
            },
            {
                component: FormFieldInput,
                name: 'description',
                schema: {
                    label: 'Описание',
                    multiline: true
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните описание' } }
                ]
            },
            {
                component: FormFieldInput,
                name: 'views',
                schema: {
                    label: 'Просмотры',
                    type: 'number'
                },
                validators: [
                    { name: 'required', options: { text: 'Добавьте количество просмотров' } },
                    { name: 'min', options: { minValue: 0 } }
                ]
            },
            {
                component: FormFieldDate,
                name: 'date',
                schema: {
                    label: 'Дата публикации'
                },
                validators: [
                    { name: 'required', options: { text: 'Добавьте количество просмотров' } },
                    { name: 'min', options: { minValue: 0 } }
                ]
            },
            {
                component: FormFieldTitle,
                name: 'title',
                schema: {
                    label: 'Аватар',
                    variant: 'h6'
                }
            },
            {
                component: FormFieldFiles,
                name: 'avatar',
                schema: {
                    fileWidth: 521,
                    fileHeight: 244,
                    max: 1
                },
                validators: [
                    { name: 'requiredFiles', options: { text: 'Добавьте аватар' } }
                ]
            },
            {
                component: FormFieldCheckbox,
                name: 'hidden',
                schema: {
                    label: 'Скрыть новость'
                }
            },
            {
                component: FormFieldButton,
                name: 'submit',
                schema: {
                    label: 'Сохранить',
                    type: 'submit'
                }
            }
        ]
    };
}
