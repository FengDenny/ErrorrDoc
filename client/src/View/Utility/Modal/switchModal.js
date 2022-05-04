// modal context
const switchToSignup = (setActive) => {
  setTimeout(() => {
    setActive("signup");
  }, 200);
};

const switchToSignin = (setActive) => {
  setTimeout(() => {
    setActive("signin");
  }, 200);
};

const switchToForgotPassword = (setActive) => {
  setTimeout(() => {
    setActive("forgot");
  }, 200);
};

const switchToRedirect = (setActive) => {
  setTimeout(() => {
    setActive("redirect");
  }, 200);
};

export const contextValue = {
  switchToSignup,
  switchToSignin,
  switchToForgotPassword,
  switchToRedirect,
};
