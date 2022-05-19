function handleBlogInfo(blogList) {
  blogList.forEach((blog) => {
    blog.createTime = blog.createTime.split('T')[0]
  })
}

export { handleBlogInfo }
