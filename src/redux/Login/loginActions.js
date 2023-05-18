export const loginActions = (user) => {
  console.log(user)
    return {
      type: 'LOGIN_USER',
      payload: user,
    };
  };