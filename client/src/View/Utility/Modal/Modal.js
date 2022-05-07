import React from "react";
import { ModalContainer } from "../../content/styled-components/Modal/Modal.styled";
import SignUp from "../../pages/Home/auth/Signup";
import SignIn from "../../pages/Home/auth/Signin";
import ForgotPassword from "../../pages/Home/auth/reset/ForgotPassword";

export default function Modal({
  showModal,
  setShowModal,
  active,
  setActive,
  removeOverlay,
  overlay,
  setActiveClass,
  removeActiveClass,
  signInActive,
  signUpActive,
}) {
  return (
    <ModalContainer showModal={showModal} setShowModal={setShowModal}>
      <button
        className='btn-close-modal'
        onClick={() => {
          setShowModal(!showModal);
          removeOverlay(overlay);
        }}
      >
        &times;
      </button>
      {active !== "forgot" && (
        <>
          <button
            ref={signInActive}
            className='btn-tab active'
            onClick={() => {
              setActive("signin");
              setActiveClass(signInActive);
              removeActiveClass(signUpActive);
            }}
          >
            Sign In
          </button>
          <button
            ref={signUpActive}
            className='btn-tab'
            onClick={() => {
              setActive("signup");
              removeActiveClass(signInActive);
              setActiveClass(signUpActive);
            }}
          >
            Sign Up Free
          </button>

          <hr />
        </>
      )}
      {active === "signup" && <SignUp setActive={setActive} />}
      {active === "signin" && <SignIn setActive={setActive} />}
      {active === "forgot" && <ForgotPassword setActive={setActive} />}
    </ModalContainer>
  );
}
