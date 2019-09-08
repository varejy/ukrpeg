import FormFieldInput from '../Form/fields/FormFieldInput/FormFieldInput.jsx';
import FormFieldTitle from '../Form/fields/FormFieldTitle/FormFieldTitle.jsx';
import FormFieldButton from '../Form/fields/FormFieldButton/FormFieldButton';
import FormFieldFiles from '../Form/fields/FormFieldFiles/FormFieldFiles';
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
                            fields: ['en_text', 'ua_text', 'ua_imgAlt', 'en_imgAlt']
                        }
                    }
                ]
            },
            {
                component: FormFieldInput,
                name: `${lang}_text`,
                schema: {
                    label: 'Текст',
                    multiline: true
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните название' } }
                ]
            },
            {
                component: FormFieldFiles,
                name: 'img',
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
                component: FormFieldInput,
                name: `${lang}_imgAlt`,
                schema: {
                    label: 'Alt картинки'
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните название' } }
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
