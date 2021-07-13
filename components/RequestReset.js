import { useMutation } from "@apollo/client";
import Form from "components/styles/Form";
import gql from "graphql-tag";
import useForm from "lib/useForm";
import DisplayError from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
  });
  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup().catch(console.error);
    resetForm();
  }
  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null  && (
          <p>
              Success! Check your email for a link!
          </p>
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
      </fieldset>
      <button type="submit">Request Reset!</button>
    </Form>
  );
}

export default RequestReset;
