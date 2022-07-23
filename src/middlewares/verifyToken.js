import jwt from 'jsonwebtoken';

    const authUser = (req, res, next) => {
        const token = req.header('auth-token');
        if(!token) return res.status(401).send('Access denied, please login!');
    
        try {
            
            const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = verified.user;
            next();
    
        } catch (error) {
            res.status(400).send('Invalid Login Credentials');
        }
    
    }
    
    const authAdmin = (req, res, next) => {
        const token = req.header('auth-token');
        if(!token) return res.status(401).send({error:'Access denied, please login!'});
    
        try {
    
            const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = verified.user;

            if(req.user.role == 'user'){
                res.status(401).send({error:'Access denied, you do not have permission to access this page'});
            }
    
            next();
    
        } catch (error) {
            res.status(400).send('Invalid Login Credentials');
        }
    
    }


export default { authUser, authAdmin };
