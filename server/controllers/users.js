import User from "../models/Users"

export const getUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(500);
    }
}
export const getUserFriends = async (req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
        user.friends.map((id)=>{
            User.findById(id);
        })
    );
    const formattedFriends = friends.map(
        ({id, firstName, lastName})
    );
    res.status(200).json(formattedFriends);
}