import { del, get, post } from '../request'

function getTagsListInfo() {
  return Promise.resolve(get({ url: 'tag/list' }))
}

function getTagsListInfoById(id) {
  return Promise.resolve(get({ url: `tag/list/${id}` }))
}

function addTag(name) {
  return Promise.resolve(
    post({
      url: 'tag/add',
      data: {
        name
      }
    })
  )
}

function deleteTag(id) {
  return Promise.resolve(
    del({
      url: 'tag/delete',
      data: {
        id
      }
    })
  )
}

export { getTagsListInfo, getTagsListInfoById, addTag, deleteTag }
