import dotenv from "dotenv"
// import User from "../../models/User"

dotenv.config()

const jwtKey = process.env.SECRET_JWT;

export const getMyDetails = async (req, res) => {
    try {
        const id = req.user.id

        const user = await User.findById(id, { password: 0 })
        if (!user) return res.status(404).json({ msg: "User not found" })

        return res.status(200).json({ msg: "found", success: true, data: user })
    } catch (err) {
        return res.status(500).json({ msg: "Invalid Request" })
    }
}

export const createUser = async (req, res)=>{
    try {
         [//express validator
         check('name').notEmpty().withMessage('Name is required'),
         check('email').isEmail().withMessage('Invalid email format'),
         check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
         check('location').notEmpty().withMessage('Location is required')
     ],

     async (req, res) => {
         //express validator
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() });
         }
         //bcrypt added
         const salt = await genSalt(10);
         let secPassword = await hash(req.body.password, salt);
         try {
             //await is import
             await create({
                 //order can be random
                 // after creating create user, we need to connect to main application
                 //changing from static to dynamic data, 
                 name: req.body.name,
                 //genrate hash and store
                 password: secPassword,
                 email: req.body.email,
                 location: req.body.location
 
             })
             //this msg back when endpoint hit
             res.json({ success: true });
         } catch (error) {
             console.log(error);
             res.json({ success: false });
         }
     })
        
    } catch (error) {
        return res.status(500).json({msg:"Invalid Request"})
    }
}

const loginUser = async (req, res)=>{
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            //findOne return object if found email
            let userData = await findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try Again!! Invalid user or password" })
            }
            //if password doesn't match
            //matches userdata ko hash me convert kar mongodb se match karta hai.
            const pwdCompare = await compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try Again!! Invalid user or password" })
            }

            //signing with jwt token...
            const data = {
                //signing at backend
                USER: {
                    id: userData.id //saves id from db to id

                }
            }
            const authToken = sign(data, jwtKey);


            return res.json({ success: true, authToken: authToken })
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
}