const { decoded, encoded } = require('..')
const { eq } = require('..')

const inputJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWdlIjoxMiwiam9icyI6WyJzZWN1cml0eSIsImVuZ2luZWVyIl0sImlhdCI6MTUxNjIzOTAyMn0";

const decodedToken = decoded(inputJWT)

const encodedToken = encoded(decodedToken)

console.log(
  "when inputJWT and decodedToken is true, so is truth",
  eq(encodedToken, inputJWT)
)

