import FormFieldTitle from '../Form/fields/FormFieldTitle/FormFieldTitle.jsx';
import FormFieldInput from '../Form/fields/FormFieldInput/FormFieldInput.jsx';
import FormFieldLangs from '../Form/fields/FormFieldLangs/FormFieldLangs.jsx';
import FormFieldKeywords from '../Form/fields/FormFieldWords/FormFieldWords';
import FormFieldButton from '../Form/fields/FormFieldButton/FormFieldButton';

export default function ({ settings: { lang, disabled } } = {}) {
    return {
        fields: [
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
                            fields: ['ua_seoTitle', 'en_seoTitle', 'ua_seoDescription', 'en_seoDescription', 'ua_seoKeywords', 'en_seoKeywords']
                        }
                    }
                ]
            },
            {
                component: FormFieldTitle,
                name: 'title',
                schema: {
                    label: 'Сео',
                    variant: 'h6'
                }
            },
            {
                component: FormFieldInput,
                name: `${lang}_seoTitle`,
                schema: {
                    label: 'Тайтл',
                    multiline: true
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните сео тайтл' } }
                ]
            },
            {
                component: FormFieldInput,
                name: `${lang}_seoDescription`,
                schema: {
                    label: 'Описание',
                    multiline: true
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните сео описание' } }
                ]
            },
            {
                component: FormFieldKeywords,
                name: `${lang}_seoKeywords`,
                schema: {
                    label: 'Ключевые слова',
                    multiline: false
                }
            },
            {
                component: FormFieldButton,
                name: 'submit',
                schema: {
                    label: 'Сохранить',
                    type: 'submit',
                    disabled
                }
            }
        ]
    };
}
