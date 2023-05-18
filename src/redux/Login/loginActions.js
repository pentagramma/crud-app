export const loginActions = (user) => {
    return {
      type: 'LOGIN_USER',
      payload: user,
    };
  };