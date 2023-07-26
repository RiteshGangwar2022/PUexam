const mongoose=require("mongoose");
const Admin = require("../Database/Models/Admin");


const Login = async (req, res) => {
   console.log("hello")
    try {
        const { email, password } = req.body;
        //console.log(req.body);

        if (!email || !password) {
            res.status(422).json({ error: "enter details properly" });
        }
        const admindata = await Admin.findOne({ email: email });

        if (admindata) {
            const ismatch = await bcrpt.compare(password, admindata.password);
          //  const token = await admindata.generateAuthToken();
            //console.log(token);
            if (!ismatch) {
                res.status(422).json({ message: "invalid credential" });
            }
            else {
                res.json({ message: "user singin successfully" });
            }

        }
        else {
            res.status(422).json({ message: "invalid credential" });
        }

    }
    catch (err) {
        res.status(422).json(err);
    }

}
module.exports = {Login};
