# Feature
* JWT Support

# Usage

## Install

### Yarn
```console
yarn add react-auths
```

### NPM
```console
npm install --save react-auths
```

### Register `Provider`
```javascript
// file: index.js
import { AuthProvider } from 'react-auths'

export default function EntryPoint(){
  return (
    <AuthProvider storageType="local" authType="JWT">
      <Component />
      ...
    </AuthProvider>
  )
}
```

### Consume `Auth` states or actions
```javascript
import { useAuth } from 'react-auths'

const Login = () => {
  const { signIn } = useAuth()
  const token = 'accessToken'

  return (
    <div>
      <OtherCommponent/>
      <button onClick={ () => signIn(token) } />
    </div>
  )
}
```
# API
