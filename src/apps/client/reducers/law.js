import { SET_LAW } from '../types/types';

const initialState = {
    lawList: [
        {
            text: {
                ua: {
                    link: `https://zakon.rada.gov.ua/laws/show/187/98-%D0%B2%D1%80?lang=uk`,
                    title: `Закон Украины «Об отходах».`
                },
                en: {
                    link: `https://zakon.rada.gov.ua/laws/show/187/98-%D0%B2%D1%80?lang=en`,
                    title: `On Waste`
                }
            }
        },
        {
            text: {
                ua: {
                    link: `https://zakon.rada.gov.ua/laws/show/187/98-%D0%B2%D1%80?lang=uk`,
                    title: `Закон Украины «О благоустройстве населенных пунктов».`
                },
                en: {
                    link: `https://zakon.rada.gov.ua/laws/show/187/98-%D0%B2%D1%80?lang=en`,
                    title: `Закон Украины «О благоустройстве населенных пунктов».`
                }
            }
        },
        {
            text: {
                ua: {
                    link: `https://zakon.rada.gov.ua/laws/show/187/98-%D0%B2%D1%80?lang=uk`,
                    title: `Закон Украины «Об обеспечении санитарного и эпидемиологического благополучия населения».`
                },
                en: {
                    link: `https://zakon.rada.gov.ua/laws/show/187/98-%D0%B2%D1%80?lang=en`,
                    title: `Закон Украины «Об обеспечении санитарного и эпидемиологического благополучия населения».`
                }
            }
        },
        {
            text: {
                ua: {
                    link: `https://zakon.rada.gov.ua/laws/show/187/98-%D0%B2%D1%80?lang=uk`,
                    title: `Закон Украины «Об обеспечении санитарного и эпидемиологического благополучия населения».`
                },
                en: {
                    link: `https://zakon.rada.gov.ua/laws/show/187/98-%D0%B2%D1%80?lang=en`,
                    title: `Закон Украины «Об обеспечении санитарного и эпидемиологического благополучия населения».`
                }
            }
        },
        {
            text: {
                ua: {
                    link: `https://zakon.rada.gov.ua/laws/show/187/98-%D0%B2%D1%80?lang=uk`,
                    title: `Закон Украины «Об обеспечении санитарного и эпидемиологического благополучия населения».`
                },
                en: {
                    link: `https://zakon.rada.gov.ua/laws/show/187/98-%D0%B2%D1%80?lang=en`,
                    title: `Закон Украины «Об обеспечении санитарного и эпидемиологического благополучия населения».`
                }
            }
        },
        {
            text: {
                ua: {
                    link: `https://zakon.rada.gov.ua/laws/show/187/98-%D0%B2%D1%80?lang=uk`,
                    title: `Закон Украины «Об обеспечении санитарного и эпидемиологического благополучия населения».`
                },
                en: {
                    link: `https://zakon.rada.gov.ua/laws/show/187/98-%D0%B2%D1%80?lang=en`,
                    title: `Закон Украины «Об обеспечении санитарного и эпидемиологического благополучия населения».`
                }
            }
        }
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_LAW:
        return { ...state, lawList: action.payload };
    default:
        return state;
    }
}
