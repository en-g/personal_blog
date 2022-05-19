import { get, post } from '../request'

function getTheLastNotice() {
  return Promise.resolve(
    get({
      url: 'notice/last'
    })
  )
}

function uploadNotice(notice) {
  return Promise.resolve(
    post({
      url: 'notice/upload',
      data: {
        notice
      }
    })
  )
}

export { getTheLastNotice, uploadNotice }
