const { User } = require("../../db/models");
const { encryption } = require("./sha256");

module.exports = {
  post: (req, res) => {
    let { nickname, password: reqPassword } = req.body;
    reqPassword = encryption("trello" + reqPassword);

    User.findOne({
      where: { nickname },
    })
      .then((response) => {
        if (response === null) {
          res.status(401).send({
            status: "failure",
            message: "가입되지 않은 닉네임입니다. 먼저 회원으로 가입해 주세요!",
          });
        } else {
          const { id, password: resPassword } = response.dataValues;

          if (resPassword === reqPassword) {
            // jwt 처리 필요
            res.status(200).send({
              status: "success",
              message: "성공적으로 로그인 했습니다",
              currentUser: id,
            });
          } else {
            res.status(401).send({
              status: "failure",
              message: "비밀번호를 확인하세요.",
            });
          }
        }
      })
      .catch((err) => {
        res.status(400).send({
          status: "failure",
          message: "잘못된 접근입니다.",
        });
      });
  },
};
