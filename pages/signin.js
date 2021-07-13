import RequestReset from "components/RequestReset";
import styled from "styled-components";

const { default: SignIn } = require("components/SignIn");
const { default: SignUp } = require("components/SignUp");

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
grid-gap: 2rem;
`;

function SignInPage() {
    return (
        <Grid>
            <SignIn/>
            <SignUp/>
            <RequestReset />
        </Grid>
    );
}

export default SignInPage;