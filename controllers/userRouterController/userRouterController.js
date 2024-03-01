import User from "../../models/User.js";

const jwtKey = process.env.SECRET_JWT;

export const getMyDetails = async (req, res) => {
    try {
        // const id = req.body
        const user = await User.find({ name: "Eklavya" })
        if (!user) return res.status(404).json({ msg: "User not found" })

        return res.status(200).json({ msg: "found", success: true, data: user })
    } catch (err) {
        return res.status(500).json({ msg: "Invalid Request" })
    }
}

export const getOrderDetails = async (req, res) => {
    try {
        return res.json({ msg: "working" });
    } catch (error) {
        return res.status(500).json({ msg: "Cant getOrder Details", err: error.message })
    }
}

export const createUser = async (req, res) => {
    try {
        await Promise.all([
            check('name').notEmpty().withMessage('Name is required'),
            check('email').isEmail().withMessage('Invalid email format'),
            check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
            check('location').notEmpty().withMessage('Location is required')

        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Hash Password

        const salt = await genSalt(10);
        let secPassword = await hash(req.body.password, salt);

        await create({

            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location

        });

        return res.status(200).json({ success: true });


    } catch (error) {

        return res.status(500).json({ sucess: false, msg: "Invalid Request" })
    }
}


export const loginUser = async (req, res) => {
    try {
        // Validate email and password
        await Promise.all([
            check('email').isEmail().withMessage('Invalid email format').run(req),
            check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const userData = await findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try Again!! Invalid user or password" });
        }

        // Compare passwords
        const pwdCompare = await compare(password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try Again!! Invalid user or password" });
        }

        // Sign JWT token
        const authToken = sign({ id: userData.id }, jwtKey);

        return res.json({ success: true, authToken });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Invalid Request" });
    }
};
