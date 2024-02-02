const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const auth = require('../middleware/tollAuth');

// ^ CORS 
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

router.use(cookieParser());


// ! Logout Route
router.get('/logout', auth, (req, res) => {
    console.log("LogOut Route");
    const token = req.cookies.tollLogin;
    if (token) {
        console.log("Token Found");
        res.clearCookie('tollLogin');
        res.send("LogOut Success");
    }
    else {
        console.log("Token Not Found");
        res.send("LoggingOut");
    }
});
module.exports = router;