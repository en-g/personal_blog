import { get, del } from '../request'

function getAuthorInfo() {
  return Promise.resolve(get({ url: 'author' }))
}

function deleteAvatar(id) {
  return Promise.resolve(
    del({
      url: 'avatar/delete',
      data: {
        id
      }
    })
  )
}

export { getAuthorInfo, deleteAvatar }
