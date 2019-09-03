let imgUrl

if (process.env.NODE_ENV === 'development') {
  // imgUrl = 'http://front.513online.top/front'
  imgUrl = 'https://front.edu513.com/front'
} else {
  imgUrl = 'https://front.edu513.com/front'
}

export { imgUrl }
