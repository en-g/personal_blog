function listenScrollPositionToShow(ref, callback) {
  window.addEventListener(
    'scroll',
    () => {
      let pageScrollY = window.scrollY
      let refOffsetTop = ref.offsetTop
      if (pageScrollY > refOffsetTop - 600) {
        callback(true)
      } else {
        callback(false)
      }
    },
    true
  )
}

function createRandomColor() {
  return '#' + (((1 << 24) * Math.random()) | 0).toString(16)
}

export { listenScrollPositionToShow, createRandomColor }
