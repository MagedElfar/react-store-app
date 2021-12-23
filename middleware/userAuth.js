import jwt from 'jsonwebtoken';

const auth = async (req , res , next) => {
    try{
        if(req.headers?.authorization){
            const token = req.headers.authorization.split(' ')[1] || "null";
            const isCustomAut = token.length < 500;
            if(token && isCustomAut){
                jwt.verify(token , process.env.token , (error , decodedData) => {
                    if(error) throw({message: `invalid token`});
                    req.userId = decodedData?.userId;
                    req.role = decodedData?.userRole;
                });
            }
            next();
        } else {
            throw({message: `permission denied`});
        }
    } catch(error){
        res.status(244).json({message: error.message})
    }
}

export default auth;