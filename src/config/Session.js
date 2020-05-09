const set = (userdata) => {
    const s = window.sessionStorage;
    s.setItem('userData', JSON.stringify(userdata))
    return true;
}

const get = (key) => {
    const s = window.sessionStorage;
    const userData = JSON.parse(s.getItem('userData'));
    if (!key) { return userData }
    if (!userData) { return null }
    return userData[key];
}

const unset = () => {
    const s = window.sessionStorage;
    s.removeItem('userData');
    return true;
}

const session = {
    set,
    get,
    unset
};

export default session;