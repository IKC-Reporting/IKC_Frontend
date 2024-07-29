export const loadState = (state: string) => {
    try {
        const serializedState = localStorage.getItem(state);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: string) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('userID', serializedState);
    } catch (err) {
        return undefined;
    }
}