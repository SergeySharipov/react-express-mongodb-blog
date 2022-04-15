import { HeadersDefaults } from 'axios'

export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken } as CommonHeaderProperties;
  } else {
    return {};
  }
}

interface CommonHeaderProperties extends HeadersDefaults {
  'x-access-token': string;
}