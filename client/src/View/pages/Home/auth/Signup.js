import React from "react";
import {
  FormContainer,
  Form,
} from "../../../content/styled-components/Modal/Modal.styled";
import { Button } from "../../../content/styled-components/Global.styled";

export default function Signup() {
  return (
    <FormContainer height='true'>
      <h2>Create an account</h2>
      <Form>
        <div>
          <label htmlFor='username'>Username</label>
          <input name='username' type='text' placeholder='Enter username' />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input name='email' type='email' placeholder='Enter email address' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input name='password' type='password' placeholder='Enter password' />
        </div>
        <div>
          <p>
            By signing up, I agree to ErrorrDoc's
            <a href='#' target='_blank'>
              Terms and Conditions
            </a>
            , and
            <a href='#' target='_blank'>
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div>
          <Button width='true' disabled>
            Sign Up Free
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
}
