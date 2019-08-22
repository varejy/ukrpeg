import FormFieldInput from '../Form/fields/FormFieldInput/FormFieldInput.jsx';
import FormFieldTitle from '../Form/fields/FormFieldTitle/FormFieldTitle.jsx';
import FormFieldButton from '../Form/fields/FormFieldButton/FormFieldButton';

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
                    { name: 'required', options: { text: 'Заполните название закона' } }
                ]
            },
            {
                component: FormFieldInput,
                name: 'path',
                schema: {
                    label: 'Путь'
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните путь' } }
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