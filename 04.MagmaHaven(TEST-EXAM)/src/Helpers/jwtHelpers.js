import jwt from 'jsonwebtoken';

const SECRET = `Softuniexam4e-8d2-*6*0*254/64as-df-cc-5r//-daz!@p!2!./EXDIFi=job.less//diebroke?quitNow:dieTmrw?,14f`;

export function generateToken(user) { 
    return jwt.sign({
        _id : user._id,
        email: user.email,
        // deviceInfo: user.deviceInfo,
    }, SECRET, { expiresIn: "10d" })
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET)
    } catch (error) {
        return undefined
    }
}