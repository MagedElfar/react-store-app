const auth = (req , res , next) => {
    try{
        if(req.role === "admin") {
            next();
        } else {
            throw ({message: `admin permission denied` , status: 244});
        }
    } catch(error){
        next(error)
    }
}

export default auth;