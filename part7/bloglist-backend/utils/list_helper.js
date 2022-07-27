const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((likes, blog) => likes + blog.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const { title, author, likes } = blogs.reduce((blog1, blog2) => {
    return blog1.likes >= blog2.likes
      ? blog1
      : blog2
  })
  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authors = _.groupBy(blogs, 'author')
  return _.reduce(authors, (result, value, key) => {
    const blogCountCurrent = value.length
    const blogCountMax = result.blogs
    return blogCountCurrent > blogCountMax
      ? { author: key, blogs: blogCountCurrent }
      : result
  }, { author: '', blogs: 0 })
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authors = _.groupBy(blogs, 'author')
  return _.reduce(authors, (result, value, key) => {
    const maxLikes = result.likes
    const currentLikes = _.sumBy(value, 'likes')
    return currentLikes > maxLikes
      ? { author: key, likes: currentLikes }
      : result
  }, { author: '', likes: 0 })
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }