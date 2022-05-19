import { get } from '../request'

function getBlogDetailInfo(id) {
  return Promise.resolve(
    get({
      url: `blog/detail/${id}`
    })
  )
}

export { getBlogDetailInfo }
