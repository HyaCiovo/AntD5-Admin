import { redirect } from "react-router-dom";

export const layoutLoader = () => {
  return {
    title: "Dashboard",
  };
};

/* 模拟网络接口 */
const getToken = (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 2000);
  });
};

export const tokenLoader = async () => {
  const num = await getToken();
  console.log(num);
  //如果随机数大于0.5则重定向到登录页
  if (num > 0.7) {
    return redirect("/login");
  } else {
    return null;
  }
};
