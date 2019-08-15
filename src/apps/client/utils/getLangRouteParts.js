export default function getLangRouteParts (route) {
    return {
        langRoute: (route.match(/^(\/en)/g, '') || [''])[0],
        routeWithoutLang: route.replace(/^(\/en)/, '')
    };
}
