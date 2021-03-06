import { useMutation } from "@apollo/client";
import Form from "components/styles/Form";
import gql from "graphql-tag";
import useForm from "lib/useForm";
import DisplayError from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

function Reset({token}) {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    token,
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  const successfulError = data?.redeemUserPasswordResetToken?.code ? data?.redeemUserPasswordResetToken : undefined;
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await reset().catch(console.error);
    resetForm();
  }
  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Reset your Password</h2>
      <DisplayError error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in!</p>
        )}
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
          minLength="8"
          value={inputs.password}
          onChange={handleChange}
        />
      </fieldset>
      <button type="submit">Request Reset!</button>
    </Form>
  );
}

export default Reset;
