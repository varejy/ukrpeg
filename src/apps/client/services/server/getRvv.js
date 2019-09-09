import request from 'superagent';
import base from '../base';

import setRvv from '../../actions/setRvv';

const arrayForOnePage = [
    {
        title: '2312 Напрацювати досвід відносин з усіма учасниками схеми РВВ: між собою, з органами місцевого самоврядування, з організаціями що займаються збором сортуванням та переробкою відходів.'
    },
    {
        title: 'Виробити схему відносин з фіскальними органами, оскільки діяльність організацій РВВ є неприбутковою.'
    },
    {
        title: 'Напрацювати досвід відносин з усіма учасниками схеми РВВ: між собою, з органами місцевого самоврядування, з організаціями що займаються збором сортуванням та переробкою відходів.'
    }
];

const arrayForTwoPage = [
    {
        img: 'http://localhost:4000/src/apps/admin/files/news-5bt8oek0534v3r-avatar1567590878621.png',
        imgAlt: 'test1',
        text: 'Напрацювати досвід відносин з усіма учасниками схеми РВВ: між собою, з органами місцевого самоврядування, з організаціями що займаються збором сортуванням та переробкою відходів.'
    },
    {
        img: 'http://localhost:4000/src/apps/admin/files/news-5bt29rk03mlgr0-avatar1567590743180.png',
        imgAlt: 'test2',
        text: 'Виробити схему відносин з фіскальними органами, оскільки діяльність організацій РВВ є неприбутковою.'
    }
];

const arrayForFourPage = [
    {
        title: 'Дослідження сфери поводження з упаковкою та її відходами в Україні.'
    },
    {
        title: 'Впровадження пілотних проектів у сфері поводження з відходами упаковки.'
    },
    {
        title: "Розробка рекомендацій, які можуть бути запропоновані суб'єктам виробництва та ринку, професійним і громадським організаціям, органам державної влади та місцевого самоврядування і навіть споживачам товарів в упаковці – щодо безпечного екологічного розвитку у сфері пакувальної технології та поводження з упаковкою та її відходами."
    }
];

const arrayForFivePage = [
    {
        title: '200+',
        description: 'новеньких сміттєвих контейнерів встановили у місті'
    },
    {
        title: '320',
        description: 'тонн було зібрано відходів упаковки упродовж першого року з дня старту проекту'
    }
];

const arrayForSixPage = [
    {
        title: 'ТОВ «Кен-Пак (Україна)»'
    },
    {
        title: 'ПрАТ «Елопак-Фастiв»'
    },
    {
        title: 'ІП «Кока-Кола Беверіджиз Україна Лімітед»'
    }
];

const rvv = {
    texts: {
        ua: {
            plans: arrayForOnePage,
            why: arrayForTwoPage,
            pProject: {
                sity: 'Belgorod',
                description: 'Наприкінці листопада 2017 року в місті Вишгороді Київської області презентували перший в Україні екологічний проект з роздільного збирання побутових відходів, заснований на принципах розширеної відповідальності виробника (надалі – РВВ). Ініціатором проекту стала Українська Пакувально-Екологічна Коаліція (УКРПЕК), яка є неприбутковою організацією й об’єднує виробників упаковки та товарів у ній, що працюють на ринку України. УКРПЕК підтримує створення в Україні систем роздільного збирання відходів упаковки на засадах РВВ і намагається закласти основи для запровадження таких систем через ухвалення законів і фактичну реалізацію пілотного проекту. Для УКРПЕК надзвичайно важливою була підтримка місцевої влади – відповідний Меморандум затвердили на сесії Вишгородської міської ради.'
            },
            mainForces: arrayForFourPage,
            keyFacts: arrayForFivePage,
            composition: arrayForSixPage,
            message: "Розробка рекомендацій, які можуть бути запропоновані суб'єктам виробництва та ринку, професійним і громадським організаціям, органам державної влади та місцевого самоврядування і навіть споживачам товарів в упаковці – щодо безпечного екологічного розвитку у сфері пакувальної технології та поводження з упаковкою та її відходами."
        },
        en: {
            plans: arrayForOnePage,
            why: arrayForTwoPage,
            pProject: {
                sity: 'Belgorod2',
                description: 'test Наприкінці листопада 2017 року в місті Вишгороді Київської області презентували перший в Україні екологічний проект з роздільного збирання побутових відходів, заснований на принципах розширеної відповідальності виробника (надалі – РВВ). Ініціатором проекту стала Українська Пакувально-Екологічна Коаліція (УКРПЕК), яка є неприбутковою організацією й об’єднує виробників упаковки та товарів у ній, що працюють на ринку України. УКРПЕК підтримує створення в Україні систем роздільного збирання відходів упаковки на засадах РВВ і намагається закласти основи для запровадження таких систем через ухвалення законів і фактичну реалізацію пілотного проекту. Для УКРПЕК надзвичайно важливою була підтримка місцевої влади – відповідний Меморандум затвердили на сесії Вишгородської міської ради.'
            },
            mainForces: arrayForFourPage,
            keyFacts: arrayForFivePage,
            composition: arrayForSixPage,
            message: "Розробка рекомендацій, які можуть бути запропоновані суб'єктам виробництва та ринку, професійним і громадським організаціям, органам державної влади та місцевого самоврядування і навіть споживачам товарів в упаковці – щодо безпечного екологічного розвитку у сфері пакувальної технології та поводження з упаковкою та її відходами."
        }
    }
};

export default function getRvv (req) {
    return dispatch => {
        const host = req.get('host');

        return base(
            request
                .get(`${host}/api/client/rvv/`)
                .timeout({
                    deadline: 2000
                })
        )
            .then(() => {
                dispatch(setRvv(rvv));
            })
            .catch(() => {
                dispatch(setRvv(rvv));
            });
    };
}
