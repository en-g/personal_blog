import { get, post, del } from '../request'

function getCategoriesListInfo() {
  return Promise.resolve(get({ url: 'category/list' }))
}

function getCategoriesListInfoById(id) {
  return Promise.resolve(get({ url: `category/list/${id}` }))
}

function addCategory(name) {
  return Promise.resolve(
    post({
      url: 'category/add',
      data: {
        name
      }
    })
  )
}

function deleteCategory(id) {
  return Promise.resolve(
    del({
      url: 'category/delete',
      data: {
        id
      }
    })
  )
}

export {
  getCategoriesListInfo,
  getCategoriesListInfoById,
  addCategory,
  deleteCategory
}
