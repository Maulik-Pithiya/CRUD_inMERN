import User from "../model/userModel.js";

export const create = async(req,res)=> {
    try {
        const newUser = new User(req.body);
        const { email } = newUser;
        
        const userExist = await User.findOne({ email });
        if(userExist) {
            return res.status(400).json({message: "User already exist."})
        } 
        const saveData = await newUser.save();
        res.status(200).json(saveData);


    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
};

//get all users
export const getAllUsers = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData || userData.length === 0) {
            return res.status(404).json({ message: "User Data not found. " });
        }
        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}; 

//find user by ID
export const getUserBYId = async (req,res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found. " });
        }
        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }

}

//Update Data
export const update = async (req,res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found. " });
        }
        const updatedData = await User.findByIdAndUpdate(id,req.body, {new:true})
        res.status(200).json(updatedData);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }

}

//Delete USer by ID

export const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found. " });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({message: "User Deleted successfully."});

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }

}