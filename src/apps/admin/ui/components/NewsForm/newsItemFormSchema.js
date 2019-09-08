import FormFieldInput from '../Form/fields/FormFieldInput/FormFieldInput.jsx';
import FormFieldSelect from '../Form/fields/FormFieldSelect/FormFieldSelect.jsx';
import FormFieldEditor from '../Form/fields/FormFieldEditor/FormFieldEditor';
import FormFieldTitle from '../Form/fields/FormFieldTitle/FormFieldTitle.jsx';
import FormFieldButton from '../Form/fields/FormFieldButton/FormFieldButton';
import FormFieldCheckbox from '../Form/fields/FormFieldCheckbox/FormFieldCheckbox';
import FormFieldFiles from '../Form/fields/FormFieldFiles/FormFieldFiles';
import FormFieldLangs from '../Form/fields/FormFieldLangs/FormFieldLangs';
import FormFieldDivider from '../Form/fields/FormFieldDivider/FormFieldDivider';
import FormFieldKeywords from '../Form/fields/FormFieldWords/FormFieldWords';

export default function ({ data: { title, categoriesOptions } = {}, settings: { lang } } = {}) {
    return {
        fields: [
            {
                component: FormFieldTitle,
                name: 'form-title',
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
                            fields: ['en_name', 'ua_name', 'en_shortDescription', 'ua_shortDescription', 'en_description', 'ua_description']
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
                    { name: 'required', options: { text: 'Заполните название новости' } }
                ]
            },
            {
                component: FormFieldSelect,
                name: 'categoryId',
                schema: {
                    label: 'Категория',
                    options: categoriesOptions
                },
                validators: [
                    { name: 'required', options: { text: 'Выберите категорию новости' } }
                ]
            },
            {
                component: FormFieldInput,
                name: 'alias',
                schema: {
                    label: 'Алиас'
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните алиас' } }
                ]
            },
            {
                component: FormFieldInput,
                name: `${lang}_shortDescription`,
                schema: {
                    label: 'Краткое описание',
                    multiline: true
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните краткое описание' } }
                ]
            },
            {
                component: FormFieldTitle,
                name: 'description-title',
                schema: {
                    label: 'Контент',
                    variant: 'h6'
                }
            },
            {
                component: FormFieldEditor,
                name: `${lang}_description`,
                schema: {
                    label: 'Описание',
                    multiline: true
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните описание' } }
                ]
            },
            {
                component: FormFieldTitle,
                name: 'avatar-title',
                schema: {
                    label: 'Аватар',
                    variant: 'h6'
                }
            },
            {
                component: FormFieldFiles,
                name: 'avatar',
                schema: {
                    max: 1
                },
                validators: [
                    { name: 'requiredFiles', options: { text: 'Добавьте аватар' } }
                ]
            },
            {
                component: FormFieldDivider,
                name: 'divider'
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
