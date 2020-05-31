const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function checkPhone(phone) {
  var reg = /^1[34578]\d{9}$/
  if (reg.test(phone)) {
    return true
  } else {
    return false
  }
}

function checkAge(age) {
  var reg = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/
  if (reg.test(age)) {
    return true
  } else {
    return false
  }
}

function checkName(name) {
  var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/
  if (name.match(reg)) {
    return true
  } else {
    return false
  }
}

function checkPwd(pwd) {
  if (pwd.length == 0) {
    return 0
  } else if (pwd.length != 6) {
    return -1
  } else {
    return 1
  }
}

function checkIDcard(Idcard) {
  var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  if (reg.test(Idcard)) {
    return true
  } else {
    return false
  }
}

module.exports = {
  formatTime: formatTime,
  checkPhone: checkPhone,
  checkName: checkName,
  checkIDcard: checkIDcard,
  checkAge: checkAge,
  checkPwd: checkPwd
}
