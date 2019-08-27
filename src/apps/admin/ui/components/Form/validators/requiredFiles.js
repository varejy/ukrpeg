export default function required (value, options = {}) {
    const isValid = value.files.length > 0;

    if (!isValid) {
        return options.text || 'Поле обязательное';
    }
}
