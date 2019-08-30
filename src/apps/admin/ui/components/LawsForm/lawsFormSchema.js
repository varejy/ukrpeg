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
                        'ссылка на закон': 'requiredLangFields',
                        options: {
                            'подсказка': 'Заполните форму для всех языков',
                            fields: ['ua_name', 'en_name']
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
                    { 'ссылка на закон': 'required', options: { 'подсказка': 'Заполните название закона' } }
                ]
            },
            {
                component: FormFieldInput,
                name: 'path',
                schema: {
                    label: 'Путь'
                },
                validators: [
                    { 'ссылка на закон': 'required', options: { 'подсказка': 'Заполните путь' } }
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
