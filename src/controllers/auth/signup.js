const { User } = require("../../db/models");
const { encryption } = require("./sha256");

module.exports = {
  post: (req, res) => {
    let { nickname, password } = req.body;
    password = encryption("trello" + password);

    User.findOrCreate({
      where: { nickname },
      defaults: { nickname, password },
    })
      .then(([response, created]) => {
        if (!created) {
          return res.status(409).send({
            status: "failure",
            message: "이미 가입되어 있는 아이디입니다.",
          });
        }

        User.update({ nickname: nickname }, { where: { id: response.id } });

        res.status(201).send({
          status: "success",
          message: "성공적으로 가입하였습니다",
        });
      })
      .catch(() => {
        res.status(400).send({
          status: "failure",
          message: "잘못된 접근입니다.",
        });
      });
  },
};

//패스워드 암호화 관련 레퍼런스
//https://brunch.co.kr/@jangcnet/11
//https://pakss328.medium.com/%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EB%8B%A8%EB%B0%A9%ED%96%A5-%EC%95%94%ED%98%B8%ED%99%94%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC-f2739a1485e

//소스코드를 가져온곳
//https://epthffh.tistory.com/entry/SHA256-%EC%9D%B8%EC%BD%94%EB%94%A9-%EC%86%8C%EC%8A%A4
