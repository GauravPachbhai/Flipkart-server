import User from '../model/user-schema.js';

export const userSignup = async (request, response) => {
    try {
        // Checking if the username already exists
        const existingUser = await User.findOne({ username: request.body.username });
        if (existingUser) {
            response.status(401).json({ message: 'Username already exists' });
        }

        // Creating a new user based on the request body
        const userData = request.body;
        const newUser = new User(userData);
        await newUser.save();

        // Sending a success message with the user data
        response.status(200).json({ message: userData });

    } catch (error) {
        // Handling errors and sending an error response
        response.status(500).json({ message: error.message });
    }
}

export const userLogin = async (request, response) => {
    try {
        const username = request.body.username;
        const password = request.body.password;

        let user = await User.findOne({username:username, password:password});
        if(user){
            return response.status(200).json({data: user})
        }else{
            return response.status(401).json(`Invalid login`);
        }
    } catch (error) {
        
            response.status(500).json(`Error login in`,error.message);
    }
}