const Expert = require("../models/Signed_Up_Experts");
const ApprovedExpert = require("../models/Approved_Experts");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "550164351391-fg3sngb21tjll7vm0gsd36vdut270n1r.apps.googleusercontent.com"
);

module.exports.authenticate = function (req, res) {
  console.log("evaluating post");
  console.log(req.body);
  // console.log("KRKREIREIREI", req.session);
  const { idToken } = req.body;
  verify(req.body, res).catch(console.error);
  async function verify(data, res) {
    const { tokenId: token } = data;
    // const { email: id } = data;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "550164351391-fg3sngb21tjll7vm0gsd36vdut270n1r.apps.googleusercontent.com",
      // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // const { email_verified, name, email } = res.payload;
    console.log(payload);

    // console.log(res.payload);
    const userid = payload["sub"];
    console.log(userid);
    Expert.findOne({ email: payload.email }).then((existingUser) => {
      if (!existingUser) {
        Expert.create({ email: payload.email, ss: { name: "Raghav" } })
          .then(() => {
            ApprovedExpert.findOne({ email: payload.email }).then(
              (approved) => {
                if (!approved) {
                  res.send({
                    approved: 0,
                    msg: "You are not an approved expert! Please contact @gmail.com to get listed.",
                  });
                } else {
                  const user = payload.email;
                  // console.log(req.session);
                  // req.session.user = { email: user };
                  // console.log("THISSWW000", req.session.user);
                  res.send({
                    approved: 1,
                    msg: "Login Successful",
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.send({
              kq: 0,
              msg: "kết nối DB thất bại",
            });
            console.error(err);
          });
        // new User({ googleId: userid }).save();
      } else {
        ApprovedExpert.findOne({ email: payload.email }).then((approved) => {
          if (!approved) {
            res.send({
              approved: 0,
              msg: "You are not an approved expert! Please contact docrajivsingla@gmail.com to get listed.",
            });
          } else {
            res.send({
              approved: 1,
              msg: "Login Successful",
            });
          }
        });
      }
    });
  }
};
