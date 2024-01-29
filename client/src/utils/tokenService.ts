export const getToken = () => {
  return sessionStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setAuthHeaders = () => {
  const accessToken = getToken();
  const refreshToken = getRefreshToken();

  return {
    Authorization: accessToken,
    "x-refresh-token": refreshToken,
  };
};
