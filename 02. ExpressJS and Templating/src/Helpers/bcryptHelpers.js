import bcrypt from 'bcryptjs'

export async function encrypt(password) {
    const hashedPass = await bcrypt.hash(password, 13)
    return hashedPass
}

export async function check(userTry, accountActual) {
    const validate = await bcrypt.compare(userTry, accountActual);
    return validate
}