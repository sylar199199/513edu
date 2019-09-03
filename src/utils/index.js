// 节流函数
export const throttle = (func, gapTime) => {
  let _lastTime = null
  return () => {
    let _nowTime = +new Date()
    if (!_lastTime || _nowTime - _lastTime > gapTime) {
      func()
      _lastTime = _nowTime
    }
  }
}

export const DepartmentRecursion = arr => {
  return arr.map(item => {
    if (item.hasOwnProperty('children') && item.children.length === 0) {
      const current = {
        ...item,
      }
      delete current.children
      return {
        ...current,
      }
    } else {
      return {
        ...item,
        children: DepartmentRecursion(item.children),
      }
    }
  })
}
