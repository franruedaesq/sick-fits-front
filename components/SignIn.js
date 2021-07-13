import { useMutation } from "@apollo/client";
import Form from "components/styles/Form";
import gql from "graphql-tag";
import useForm from "lib/useForm";
import Router from "next/router";
import DisplayError from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
          code
          message
      }
    }
  }
`;

function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const error = data?.authenticateUserWithPassword?.__typename === "UserAuthenticationWithPasswordFailure" ? data?.authenticateUserWithPassword : undefined;
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signin();
    if(res?.data?.authenticateUserWithPassword?.item?.id) {
      Router.push({
        pathname: `/`
    })
    }
    resetForm();
    // send the email and password to the graphql
  }
  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          autoComplete="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="password"
          value={inputs.password}
          onChange={handleChange}
        />
      </fieldset>
      <button type="submit">Sign In!</button>
    </Form>
  );
}

export default SignIn;
