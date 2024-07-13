import { InitialGlobalState } from "@/hooks/useMountFetchData";
const fetchCount = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 100));
    }, 1000);
  });
};

export default <InitialGlobalState>{
  permission: {
    initial: 0,
    func: () => fetchCount(),
  },
  goods: {
    initial: 0,
    func: () => fetchCount(),
  },
}