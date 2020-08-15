const { check } = require('express-validator');

module.exports = [
  check('username')
    .not().isEmpty().withMessage('名前は必須項目です。'),
  check('mailAddress')
    .not().isEmpty().withMessage('メールアドレスは必須項目です。'),
  check('password')
    .not().isEmpty().withMessage('パスワードは必須項目です。')
    .isLength({ min: 7 }).withMessage('パスワードは7文字以上で入力してください。')
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error('パスワードは確認用と一致させてください。');
      } else {
        return true;
      }
    }),
  check('confirmPassword')
    .not().isEmpty().withMessage('パスワード（確認）は必須項目です。')
];