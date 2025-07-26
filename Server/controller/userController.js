// Login Controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for missing fields
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Both email and password are required."
            });
        }

        // Find user by email
        const user = await usersModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User does not exist."
            });
        }

        // Match password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: "Incorrect email or password."
            });
        }

        // Generate JWT token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        user.password = undefined;
        return res.status(200).send({
            success: true,
            message: "Login successfully",
            token,
            user
            // role:user.role
        });

    } catch (error) {
        console.error(`Error in userController (login): ${error}`);
        return res.status(500).send({
            success: false,
            message: "Error in login API.",
            error
        });
    }
};

module.exports = {loginController}