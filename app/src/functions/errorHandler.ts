export default function errorHandler(error) {
    var time = new Date()
    fetch("https://client-errors.azurewebsites.us/api/postError?code=" + process.env.REACT_APP_CLIENT_ERRORS, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            "appName" : "PGH Supply",
            "time": time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
            "errorMessage": error.toString()
        })
    })
}