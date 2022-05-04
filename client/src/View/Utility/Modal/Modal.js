import React from "react";
import { ModalContainer } from "../../content/styled-components/Modal/Modal.styled";
import Signup from "../../pages/Home/auth/Signup";

export default function Modal({ showModal, setShowModal, active, setActive }) {
  return (
    <ModalContainer showModal={showModal} setShowModal={setShowModal}>
      <button className='btn-close-modal'>&times;</button>
      {active === "signup" && <Signup setActive={setActive} />}
    </ModalContainer>
  );
}
