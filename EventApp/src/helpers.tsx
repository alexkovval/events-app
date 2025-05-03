export const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'בוקר טוב'; // Good morning
    if (hour < 18) return 'צהריים טובים'; // Good afternoon
    return 'ערב טוב'; // Good evening
};

export const getRouteFromUrl = (url: string) => {
    const match = url.match(/event\/(\d+)/);
    if (match) {
        return {
            name: 'EventDetails',
            params: { id: match[1] },
        };
    }
    return null;
};