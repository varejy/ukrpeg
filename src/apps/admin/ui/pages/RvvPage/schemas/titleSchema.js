import FormFieldInput from '../../../components/Form/fields/FormFieldInput/FormFieldInput.jsx';
import FormFieldTitle from '../../../components/Form/fields/FormFieldTitle/FormFieldTitle.jsx';
import FormFieldButton from '../../../components/Form/fields/FormFieldButton/FormFieldButton';
import FormFieldLangs from '../../../components/Form/fields/FormFieldLangs/FormFieldLangs';

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
                            fields: ['en_title', 'ua_title']
                        }
                    }
                ]
            },
            {
                component: FormFieldInput,
                name: `${lang}_title`,
                schema: {
                    label: 'Текст',
                    multiline: true
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните текст' } }
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
