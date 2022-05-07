import React from "react";
import {
  FormContainer,
  Form,
} from "../../../../content/styled-components/Modal/Modal.styled";

import { Button } from "../../../../content/styled-components/Global.styled";

export default function ForgotPassword({ setActive }) {
  return (
    <FormContainer>
      <h2 className='form-heading'>Forgot password?</h2>
      <p className='form-secondary'>
        Provide us with an email, and we will send you a reset link.
      </p>
      <Form>
        <div>
          <label htmlFor='email'>Email</label>
          <input name='email' type='email' placeholder='Enter email address' />
        </div>
        <div>
          <Button width='true' formbtn='true' disabled>
            Send reset link
          </Button>
        </div>
        <div>
          <h3 className='form-heading-three'>
            Don't need a reset?
            <button
              onClick={() => {
                setActive("signin");
              }}
            >
              Sign In
            </button>
          </h3>
        </div>
      </Form>
    </FormContainer>
  );
}
