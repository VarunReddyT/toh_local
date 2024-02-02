const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const router = require('express').Router();
router.use(cookieparser());
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.tollLogin;
        console.log(token);
        const verify = jwt.verify(token,'TiresOnHighway');
        console.log(verify,"Authorised");
        next();
    }
    catch (err) {
        console.log(err,"Unauthorised");
        // res.clearCookie('tollLogin');
        res.status(401).send("Session Expired, Please Login Again");
    }
}
module.exports = auth;