import { SET_ABOUT } from '../types/types';

const initialState = {
    aboutList: [
        {
            img: `/src/apps/client/ui/components/About/files/can.png`,
            text: {
                ua: `Українська Пакувально-Екологічна Коаліція (УКРПЕК) була створена у 1999 році як некомерційне
                (неприбуткове) об’єднання юридичних осіб. Метою цього об’єднання було прагнення компаній,
                що займаються виробництвом та імпортом упаковки і товарів в упаковці,
                підвищити стандарти екологічної безпеки, впровадити в Україні європейський досвід поводження з відходами,
                розповсюдити основи сучасної споживчої культри у сфері поводження з упаковкою та її відходами.`,
                en: `The Ukrainian Packaging and Environmental Coalition (UKRPEC) was established in 1999 as a non-profit (non-profit) 
                association of legal entities. The purpose of this association was the desire of the companies involved in the production 
                and import of packaging and goods in packaging, to raise the standards of environmental safety, to introduce in Ukraine the 
                European experience of waste management, to disseminate the foundations of modern consumer culture in the field of packaging 
                and waste management.`
            }
        },
        {
            img: '/src/apps/client/ui/components/About/files/bottle.png',
            text: {
                ua: `Українська Пакувально-Екологічна Коаліція (УКРПЕК) була створена у 1999 році як некомерційне
                (неприбуткове) об’єднання юридичних осіб. Метою цього об’єднання було прагнення компаній,
                що займаються виробництвом та імпортом упаковки і товарів в упаковці, підвищити стандарти екологічної
                безпеки, впровадити в Україні європейський досвід поводження з відходами, розповсюдити основи
                сучасної споживчої культри у сфері поводження з упаковкою та її відходами.`,
                en: `The special task of UKRPEC is to promote responsible business conduct, to support the initiatives 
                 of manufacturers operating in the market of Ukraine to implement modern international standards in the 
                 production of packaging for everyday goods (FMCG-goods). It is worth noting that in addition to the purely 
                 environmental component, this process contributes significantly to the development of the economy. 
                 Today, most developed countries of the European Union have embarked on the path of a resource-saving 
                 economy - the so-called Circular economy, which ensures the development of efficient systems for 
                 collecting, sorting and processing used packaging.`
            }
        },
        {
            img: '/src/apps/client/ui/components/About/files/recycle.jpg',
            text: {
                ua: `Українська Пакувально-Екологічна Коаліція (УКРПЕК) була створена у 1999 році як некомерційне
                (неприбуткове) об’єднання юридичних осіб. Метою цього об’єднання було прагнення компаній,
                що займаються виробництвом та імпортом упаковки і товарів в упаковці,
                підвищити стандарти екологічної безпеки, впровадити в Україні європейський досвід поводження з відходами,
                розповсюдити основи сучасної споживчої культри у сфері поводження з упаковкою та її відходами.`,
                en: `Equally important is the legislative support for the creation in Ukraine of a system of 
                collection and disposal of packaging waste. The Coalition contributed to the development of a 
                number of bills on packaging and packaging waste (2002, 2009, 2014 and 2016). 
                Now the Ukrainian Packaging-Ecological Coalition cooperates with international 
                and domestic business associations, industry associations, economic entities in 
                the field of packaging waste management in order to promote good European experience 
                and legislative support for the creation of waste collection and recycling systems in 
                Ukraine. extended producer responsibility, successfully operating in EU countries.`
            }
        }
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_ABOUT:
        return { ...state, aboutList: action.payload };
    default:
        return state;
    }
}
