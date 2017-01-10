import Cookie from 'js-cookie';

export const setToken = (token) => {
  if (!process.browser) {
    return;
  }
  window.localStorage.setItem('token', (token));
  Cookie.set('token', token);
};

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }
  window.localStorage.removeItem('token');
  Cookie.remove('token');

  window.localStorage.setItem('logout', Date.now());
};

export const getUserFromCookie = (req) => {
  console.log('got user from cookie');
  if (!req.headers.cookie) {
    console.log('no cookie');
    return undefined;
  }
  const token = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='));
  if (!token) {
    console.log('no token');
    return undefined;
  }
  const tokened = token.split('=')[1];
  return (tokened);
};

export const getUserFromLocalStorage = () => {
  console.log('got user from localstorage');
  const json = window.localStorage.token;
  return json;
};
