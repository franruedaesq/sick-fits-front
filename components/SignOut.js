import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

const SIGNOUT_MUTATION = gql`
    mutation {
        endSession
    }
`;

function SignOut() {
    const [signout] = useMutation(SIGNOUT_MUTATION, {
        refetchQueries: [{query: CURRENT_USER_QUERY}]
    });
    function handleSignOut() {
        signout();
    }
    return (<button type='button' onClick={handleSignOut}>Sign Out</button>);
}

export default SignOut;