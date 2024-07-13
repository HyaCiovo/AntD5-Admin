import { User } from "@/stores/user";
import { redirect } from "react-router-dom";

/* 模拟网络接口 */
const getUserInfo = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: "CSS-in-JS Hater",
        avatar: "/avatar/hyacinth_avatar.jpg",
        role: "Administrator",
        email: "hyacinth@gmail.com",
        phone: "15312347956",
      });
    }, 500);
  });
};

export const tokenLoader = async () => {
  const userInfo = await getUserInfo();
  return userInfo;
};
