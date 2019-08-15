import { DEFAULT_LANG } from '../constants/constants';

const langRoutesMap = {
    en: '/en',
    ua: ''
};

export default function getLangRoute (lang = DEFAULT_LANG) {
    return langRoutesMap[lang];
};
