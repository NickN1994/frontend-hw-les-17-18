

function isTokenValid(token) {
    if (token.exp > token.iat) {
        return true
    } else {
        return false
    }
}


export default isTokenValid;