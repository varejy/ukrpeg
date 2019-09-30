import FormFieldInput from '../Form/fields/FormFieldInput/FormFieldInput.jsx';
import FormFieldTitle from '../Form/fields/FormFieldTitle/FormFieldTitle.jsx';
import FormFieldButton from '../Form/fields/FormFieldButton/FormFieldButton';
import FormFieldLangs from '../Form/fields/FormFieldLangs/FormFieldLangs';
import FormFieldFiles from '../Form/fields/FormFieldFiles/FormFieldFiles';

export default function ({ data: { title } = {}, settings: { lang, contentType } } = {}) {
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
                            fields: ['ua_text', 'en_text']
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
                    { name: 'required', options: { text: 'Заполните текст для блока' } }
                ]
            },
            {
                component: FormFieldTitle,
                name: 'title',
                schema: {
                    label: 'Фото',
                    variant: 'h5'
                }
            },
            {
                component: FormFieldLangs,
                name: 'contentType',
                schema: {
                    langs: ['photo', 'video']
                }
            },
            ...(contentType === 'photo' ? [{
                component: FormFieldFiles,
                name: 'avatar',
                schema: {
                    max: 1
                },
                validators: [
                    { name: 'requiredFiles', options: { text: 'Добавьте фото для блока' } }
                ]
            }] : [{
                component: FormFieldInput,
                name: 'video',
                schema: {
                    label: 'Ссылка на youtube видео'
                },
                validators: [
                    { name: 'required', options: { text: 'Вставьте ссылку на youtube видео' } }
                ]
            }]),
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
