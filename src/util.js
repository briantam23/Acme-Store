export const selected = (_pathname, pathname, startsWith = false) => {
    if(_pathname === pathname || (pathname.indexOf(_pathname) === 0 && startsWith)) {
        return true;
    }
    return false;
}