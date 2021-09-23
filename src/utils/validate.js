// 账号
let codeReg = /^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/
// 电话
let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

// 必须为数字
let numberReg = /^\d+$|^\d+[.]?\d+$/

// 密码
let passwordReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/

// 联系人
let contactsReg = /^[\u0391-\uFFE5A-Za-z]+$/

let regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

let emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
//图形验证码
let imgCode = /^[0-9a-zA-Z]{4}$/
let FormValidate = (function () {
  function FormValidate() {}
  // From表单验证规则  可用于公用的校验部分
  FormValidate.Form = function () {
    return {
      // 账号的验证规则
      validateCode(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入账号'))
        }
        if (!codeReg.test(value)) {
          callback(new Error('账号必须为6-20位字母和数字组合'))
        } else {
          callback()
        }
      },

      // 只能数字的验证
      validateNumber(rule, value, callback) {
        if (value !== '') {
          if (!numberReg.test(value)) {
            callback(new Error('员工数量必须为数字'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },

      // 密码的验证
      validatePsdReg(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入密码'))
        }
        if (!passwordReg.test(value)) {
          callback(new Error('请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种'))
        } else {
          callback()
        }
      },

      // 联系人
      validateContacts(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入联系人'))
        }
        if (!contactsReg.test(value)) {
          callback(new Error('联系人不可输入特殊字符'))
        } else {
          callback()
        }
      },

      // 邮箱的验证规则
      validateEmail(rule, value, callback) {
        if (value !== '') {
          if (!emailReg.test(value)) {
            callback(new Error('邮箱格式不正确'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },

      // 电话号码的验证
      validatePhone(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入手机号码'))
        }
        if (!phoneReg.test(value)) {
          callback(new Error('手机格式不正确'))
        } else {
          callback()
        }
      },

      // 身份证的验证规则
      ID(rule, value, callback) {
        if (!value) {
          return callback(new Error('身份证不能为空'))
        }
        if (!regId.test(value)) {
          callback(new Error('请输入正确的二代身份证号码'))
        } else {
          callback()
        }
      },
      //图形验证码验证
      imgCode(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入图形验证码'))
        }
        if (!imgCode.test(value)) {
          callback(new Error('请输入正确的图形验证码'))
        } else {
          callback()
        }
      }
    }
  }

  return FormValidate
}())

exports.FormValidate = FormValidate
