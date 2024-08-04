import { AppDataSource } from '../config/db';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET_KEY } from '../config/config';


class AuthService {
  private userRepository = AppDataSource.getRepository(User);
  private jwtSecret = JWT_SECRET_KEY;
  private tokenExpiration = JWT_EXPIRATION;

  async signup(name: string, email: string, password: string): Promise<Partial<User>> {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = this.userRepository.create({ name, email, password: hashedPassword });
    await this.userRepository.save(user);

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async login(email: string, password: string): Promise<{ token: string; user: Partial<User> }> {
    // Find user by email
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

   // Generate JWT token with additional user data
   const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    this.jwtSecret,
    { expiresIn: this.tokenExpiration }
  );

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  }
}

export default AuthService;
