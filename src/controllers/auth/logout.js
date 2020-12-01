module.exports = {
  post: (req, res) => {
    // jwt 처리 필요
    res.status(200).send({
      status: "success",
      message: "성공적으로 로그아웃했습니다.",
    });
  },
};
