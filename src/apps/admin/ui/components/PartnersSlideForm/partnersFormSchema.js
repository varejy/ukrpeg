import FormFieldInput from '../Form/fields/FormFieldInput/FormFieldInput.jsx';
import FormFieldTitle from '../Form/fields/FormFieldTitle/FormFieldTitle.jsx';
import FormFieldButton from '../Form/fields/FormFieldButton/FormFieldButton';
import FormFieldFiles from '../Form/fields/FormFieldFiles/FormFieldFiles';

export default function () {
    return {
        fields: [
            {
                component: FormFieldTitle,
                name: 'title',
                schema: {
                    label: 'Редактирование',
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
                    { name: 'requiredFiles', options: { text: 'Добавьте лого партнёра' } }
                ]
            },
            {
                component: FormFieldInput,
                name: 'name',
                schema: {
                    label: 'Название'
                },
                validators: [
                    { name: 'required', options: { text: 'Заполните название компании партнёра' } }
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
