import { get, post, del } from '../request'

function getBlogListInfo() {
  return Promise.resolve(get({ url: 'blog/list' }))
}

function uploadBlog(blogInfo) {
  return Promise.resolve(
    post({
      url: 'blog/upload',
      contentType: 'multipart/form-data',
      data: blogInfo
    })
  )
}

function deleteBlog(id) {
  return Promise.resolve(
    del({
      url: 'blog/delete',
      data: {
        id
      }
    })
  )
}

function searchBlog(keyword) {
  return Promise.resolve(
    get({
      url: 'blog/search',
      params: {
        keyword
      }
    })
  )
}

export { getBlogListInfo, uploadBlog, deleteBlog, searchBlog }
