import FormFieldInput from '../Form/fields/FormFieldInput/FormFieldInput.jsx';
import FormFieldTitle from '../Form/fields/FormFieldTitle/FormFieldTitle.jsx';
import FormFieldButton from '../Form/fields/FormFieldButton/FormFieldButton';
import FormFieldLangs from '../Form/fields/FormFieldLangs/FormFieldLangs';

export default function ({ data: { title } = {}, settings: { lang } } = {}) {
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
                component: FormFieldLangs,
                name: 'lang',
                schema: {
                    langs: ['ua', 'en']
                },
                validators: [
                    {
                        name: 'requiredLangFields',
                        options: {
                            text: 'Заполните форму для всех языков',
                            fields: ['ua_name', 'en_name', 'ua_description', 'en_description']
                        }
                    }
                ]
            },
            {
                component: FormFieldInput,
                name: `${lang}_name`,
                schema: {
                    label: 'Название'
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните название закона' } }
                ]
            },
            {
                component: FormFieldInput,
                name: `${lang}_description`,
                schema: {
                    label: 'Описание',
                    multiline: true
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните название закона' } }
                ]
            },
            {
                component: FormFieldInput,
                name: 'path',
                schema: {
                    label: 'Ссылка на закон'
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните ссылку на закон' } }
                ]
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
