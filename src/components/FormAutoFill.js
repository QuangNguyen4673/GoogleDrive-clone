import React from "react";
import * as faker from "faker/locale/en";

function FormAutoFill({ refs }) {
  const password = "123456";
  const passwordAutoFill = () => {
    refs.passwordRef.current.value = password;
    refs.passwordConfirmRef.current.value = password;
  };
  const wholeFormAutoFill = () => {
    refs.userNameRef.current.value = faker.name.findName();
    refs.emailRef.current.value = faker.internet.email();
    refs.passwordRef.current.value = password;
    refs.passwordConfirmRef.current.value = password;
  };
  return (
    <div className="form-auto-fill">
      <button type="button" onClick={passwordAutoFill}>
        Fill password
      </button>
      <button type="button" onClick={wholeFormAutoFill}>
        Fill all
      </button>
    </div>
  );
}

export default FormAutoFill;
