const { default: RequestReset } = require("components/RequestReset")
const { default: Reset } = require("components/Reset")

function ResetPage({ query }) {
    if(!query?.token) {
        return <div>
            <p>Sorry, you must supply a token</p>
            <RequestReset />
        </div>
    }
    return (
        <div>
            <Reset token={query.token}/>
        </div>
    );
}

export default ResetPage;