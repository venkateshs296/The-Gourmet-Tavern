const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const auth = require('../../middleware/auth');
const {
    Users
} = require('../../Schemas/Users');



// Register user
router.post('/register', async (req, res) => {
    const {
        name,
        email,
        phone,
        password,
        address
    } = req.body;

    const check = await Users.findOne({
        email
    });
    if (check) {
        return res.status(400).send({
            "message": "User already exists"
        });
    }



    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        return res.status(400).send({
            "message": "Password doesn't meet all requirements"
        });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).send({
            "message": "Invalid Email Address"
        });
    }



    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);



    const user = new Users({
        name,
        email,
        phone,
        password: hashedPassword,
        address,
    });

    const secretKey =  process.env.SECRET_TOKEN;
    const token = jwt.sign({
        _id: user._id
    }, secretKey);

    user.sessionId = token;
    try {
        const savedUser = await user.save();
        res.header("auth-token", token);
        res.send({
            user: {
                _id: savedUser._id,
                name,
                isAdmin: savedUser.isAdmin
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            "message": "Error during validation"
        });
    }
});




// User login
router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await Users.findOne({
        email
    });
    if (!user) {
        return res.status(400).send({
            "message": "Invalid email. please register"
        });
    }


    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
        return res.status(400).send({
            "message": "please check password"
        });
    }

    const secretKey =  process.env.SECRET_TOKEN;
    
    const token = jwt.sign({
        _id: user._id
    }, secretKey);
    user.sessionId = token;
    await user.save();
    res.header("auth-token", token);
    res.send({
        user: {
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin
        }
    });
});




// User Logout
router.post('/logout', auth, async (req, res) => {
    
    req.user.sessionId = "null";
    await req.user.save();



    res.send({
        "message": "success"
    });
});


//Export Router
module.exports = router;