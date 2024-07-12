export const signIn = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, data: true });
    }, 2000);
  });
};

export const signOut = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, data: true });
    }, 1000);
  });
};
