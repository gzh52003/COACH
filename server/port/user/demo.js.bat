//登录
router.get("/", async (req, res) => {
    let { username, password, vcode, mdl } = req.query;
    //  从会话中获取验证码
    //效验 验证码
  
    console.log("login.session=", req.session);
  
    if (vcode !== req.session.vcode) {
      res.send(formatData({ code: 10 }));
      return;
    }
  
    const result = await mongo.find("user", { username, password });
  
    if (result.length > 0) {
      //用户名 ，密码 ，验证码都效验通过后，判断是否有免登陆
  
      //7天免登陆
      if (mdl === "true") {
        //token 操作
        // 1.生成token
        // const token = jwt.sign({ username }, "laoxie", {
        //   //token有效期
        //   expiresIn: 20// 60 * 60 * 24 * 7,
        // });
  
        const authorization= token.create({username})
        // 如果有token就返回token并且停止下面的代码return，没有就跳过这个判断
        res.send(formatData({ data: authorization }));
        return;
      }
  
      res.send(formatData());
    } else {
      res.send(formatData({ code: 0 }));
    }
  });
  
  module.exports = router;
  