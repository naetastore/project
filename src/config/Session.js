import { store } from './redux/store';
import { isObject } from 'formik';

const get = () => {
    const session = window.sessionStorage;
    if (!session.getItem('naetastore_name')) return false;
    return {
        'username': session.getItem('naetastore_name'),
        'password': session.getItem('naetastore_pass'),
        'role': session.getItem('naetastore_role'),
        'avatar': session.getItem('naetastore_avatar')
    }
}

const set = async params => {
    if (!isObject(params)) {
        return false;
    }
    const session = window.sessionStorage;
    store.dispatch({ type: "IS_AUTHENTICATED", value: true });
    if (session.getItem('naetastore_name')) {
        return true;
    }
    session.setItem('naetastore_name', params.username);
    session.setItem('naetastore_pass', params.password);
    session.setItem('naetastore_role', params.role);
    if (params.avatar !== null && params.avatar !== undefined) {
        session.setItem('naetastore_avatar', params.avatar);
    }
    return true;
}

const destroy = async () => {
    await store.dispatch({ type: "IS_AUTHENTICATED", value: false });
    await store.dispatch({ type: "SET_SESSION", userdata: {} });
    const session = window.sessionStorage;
    session.removeItem('naetastore_name');
    session.removeItem('naetastore_pass');
    session.removeItem('naetastore_role');
    session.removeItem('naetastore_avatar');
    return true;
}

export const Session = {
    get,
    set,
    destroy
}