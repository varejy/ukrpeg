import FormFieldInput from '../Form/fields/FormFieldInput/FormFieldInput.jsx';
import FormFieldTitle from '../Form/fields/FormFieldTitle/FormFieldTitle.jsx';
import FormFieldButton from '../Form/fields/FormFieldButton/FormFieldButton';
import FormFieldLangs from '../Form/fields/FormFieldLangs/FormFieldLangs';
import FormFieldFiles from '../Form/fields/FormFieldFiles/FormFieldFiles';

export default function ({ settings: { lang } } = {}) {
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
                            fields: [
                                'ua_title',
                                'en_title',
                                'ua_description',
                                'en_description',
                                'ua_subTitle',
                                'en_subTitle',
                                'ua_subDescription',
                                'en_subDescription'
                            ]
                        }
                    }
                ]
            },
            {
                component: FormFieldTitle,
                name: 'title',
                schema: {
                    label: 'Фото слайда',
                    variant: 'h5'
                }
            },
            {
                component: FormFieldFiles,
                name: 'photo',
                schema: {
                    max: 1
                },
                validators: [
                    { name: 'requiredFiles', options: { text: 'Добавьте фото для слайда' } }
                ]
            },
            {
                component: FormFieldInput,
                name: `${lang}_title`,
                schema: {
                    label: 'Название слайда',
                    multiline: true
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните название слайда' } }
                ]
            },
            {
                component: FormFieldInput,
                name: `${lang}_description`,
                schema: {
                    label: 'Описание слайда',
                    multiline: true
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните описание слайда' } }
                ]
            },
            {
                component: FormFieldTitle,
                name: 'title',
                schema: {
                    label: 'Фото снизу',
                    variant: 'h5'
                }
            },
            {
                component: FormFieldFiles,
                name: 'additionalPhoto',
                schema: {
                    max: 1
                }
            },
            {
                component: FormFieldInput,
                name: `${lang}_subTitle`,
                schema: {
                    label: 'Тайтл снизу',
                    multiline: true
                }
            },
            {
                component: FormFieldInput,
                name: `${lang}_subDescription`,
                schema: {
                    label: 'Описание снизу',
                    multiline: true
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
