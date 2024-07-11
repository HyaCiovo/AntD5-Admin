import { User } from "@/stores/user";
import { redirect } from "react-router-dom";

/* 模拟网络接口 */
const getUserInfo = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: "HyaCinOvo",
        avatar: "/avatar/hyacinth_avatar.jpg",
        role: "Administrator",
        email: "hyacinth@gmail.com",
        phone: "15312347956",
      });
    }, 1500);
  });
};

export const tokenLoader = async () => {
  const userInfo = await getUserInfo();
  console.log(userInfo)
  return userInfo;
};
