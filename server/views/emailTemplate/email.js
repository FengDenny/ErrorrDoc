// account activation
exports.emailVerify = (url) => {
  return `
          <table align="center" cellpadding="0" cellspacing="0"  >
          <tr>
              <td style="padding: 20px 0 30px 0;">
                  <h1 style="margin: 0; color:red; text-align:center">Please use the following link to activate your account</h1>
              </td>
          </tr>
          <tr>
              <td style="padding: 20px 0 30px 0;">
                  <a href="${url}" style="margin: 0; color:gray; width:700px; line-height:20px">Activate your account</a>
              </td>
          </tr>
          <tr>
            <td style="padding: 20px 0 30px 0;">
              <p style="margin: 0; color:gray; width:700px; line-height:20px"> If the link doesn't work, please copy and paste this url to activate: ${url}</p>
            </td>
          </tr>
      </table>
          `;
};

exports.accountActivated = (loginURL) => {
  return `
    <table align="center" cellpadding="0" cellspacing="0"  >
    <tr>
        <td style="padding: 20px 0 30px 0;">
            <h1 style="margin: 0; color:red; text-align:center">Thank you! Your account has been activated! Please signin!</h1>
        </td>
    </tr>
    <tr>
        <td style="padding: 20px 0 30px 0;">
            <a href="${loginURL}" style="margin: 0; color:gray; width:700px; line-height:20px">Signin</a>
        </td>
    </tr>
    <tr>
      <td style="padding: 20px 0 30px 0;">
        <p style="margin: 0; color:gray; width:700px; line-height:20px"> If the link doesn't work, please copy and paste this url to sign in: ${loginURL}</p>
      </td>
    </tr>
  </table>
    `;
};

exports.resetPassword = (resetURL) => {
  return `
  <table align="center" cellpadding="0" cellspacing="0"  >
  <tr>
      <td style="padding: 20px 0 30px 0;">
          <h1 style="margin: 0; color:red; text-align:center">Please use the following link to reset your password</h1>
      </td>
  </tr>
  <tr>
      <td style="padding: 20px 0 30px 0;">
          <a href="${resetURL}" style="margin: 0; color:gray; width:700px; line-height:20px">Reset your password</a>
      </td>
  </tr>
  <tr>
    <td style="padding: 20px 0 30px 0;">
      <p style="margin: 0; color:gray; width:700px; line-height:20px"> If the link doesn't work, please copy and paste this url to activate: ${resetURL}</p>
    </td>
  </tr>
</table>
  `;
};
