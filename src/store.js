
const LocalStorageItems = {
    QueryFromLocalStorageFirst: 'QueryFromLocalStorageFirst'
}

console.log('store load');
export const APPSettings = {
    get QueryFromLocalStorageFirst() {
        return localStorage.getItem(LocalStorageItems.QueryFromLocalStorageFirst) == 'true';
    },
    set QueryFromLocalStorageFirst(val) {
        localStorage.setItem(LocalStorageItems.QueryFromLocalStorageFirst, val + "")
    }
}
