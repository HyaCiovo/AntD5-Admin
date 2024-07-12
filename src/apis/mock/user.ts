export const signOut = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, data: true });
    }, 500);
  });
};
