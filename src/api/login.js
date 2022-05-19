import { post } from '../request'

function login(user) {
  return Promise.resolve(
    post({
      url: 'login',
      data: user
    })
  )
}

export { login }
