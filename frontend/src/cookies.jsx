export const setCookie = (cname, cvalue, exdays) => {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toGMTString();
    document.cookie = `${cname}=${cvalue};${expires};path=/;SameSite=None;Secure`;
};

export const setCookieInMins = (cname, cvalue, exmins) => {
    let d = new Date();
    d.setTime(d.getTime() + exmins * 60 * 1000);
    let expires = 'expires=' + d.toGMTString();
    document.cookie = `${cname}=${cvalue};${expires};path=/;SameSite=None;Secure`;
};

export const getCookie = (cname) => {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

export const checkCookie = (cname) => {
    let userStatus = getCookie(cname);
    if (userStatus !== 'logged') return false;
    else return true;
};

export const deleteCookie = (cname) => {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure`;
};