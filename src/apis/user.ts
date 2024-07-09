const queryString = (params: { [key: string]: string | number }) =>
  "?" +
  Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");
export const fetchUsers = async (params?: any) => {
  params = { results: 55, ...params };
  const res = await fetch("https://randomuser.me/api" + queryString(params));
  return await res.json();
};
