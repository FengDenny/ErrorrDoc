import React from "react";
import {
  FormContainer,
  Form,
} from "../../../content/styled-components/Modal/Modal.styled";

import { Button } from "../../../content/styled-components/Global.styled";

export default function Signin({ setActive }) {
  return (
    <FormContainer>
      <h2>Welcome back</h2>
      <Form className='form-active'>
        <div>
          <label htmlFor='email'>Email</label>
          <input name='email' type='email' placeholder='Enter email address' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input name='password' type='password' placeholder='Enter password' />
          <button
            className='btn-reset-link'
            onClick={() => {
              setActive("forgot");
            }}
          >
            Forgot password?
          </button>
        </div>
        <div>
          <Button width='true' disabled>
            Sign In
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
}
