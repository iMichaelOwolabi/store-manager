import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Helper {
  static hashedPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(hashedPassword, password) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  static generateToken(id) {
    const token = jwt.sign({
      id,
    },
    process.env.SECRET, { expiresIn: '1d' });
    return token;
  }
}
export default Helper;
