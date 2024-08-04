import { Request, Response } from 'express';
import AuthService from '../services/AuthServices';
import Logger from '../utils/Logger';

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const user = await this.authService.signup(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      Logger.error('Error during signup:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.authService.login(email, password);
      res.json({ token, user });
    } catch (error) {
      Logger.error('Error during login:', error);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  }
}

export default AuthController;
