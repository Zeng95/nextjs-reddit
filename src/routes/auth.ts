import { validate } from 'class-validator';
import { Request, Response, Router } from 'express';
import { User } from '../entities/User';

const router = Router();

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  try {
    // TODO: Validate data
    const emailOrUsernameErrors: { email?: string; username?: string } = {};
    const emailUser = await User.findOne({ where: { email } });
    const usernameUser = await User.findOne({ where: { username } });
    if (emailUser) {
      emailOrUsernameErrors.email = 'Email is already taken';
    }
    if (usernameUser) {
      emailOrUsernameErrors.username = 'Username is already taken';
    }
    if (Object.keys(emailOrUsernameErrors).length > 0) {
      return res.status(400).json(emailOrUsernameErrors);
    }

    // TODO: Create the user
    const user = new User({ email, username, password });
    const validationErrors = await validate(user);
    if (validationErrors.length > 0) {
      return res.status(400).json(validationErrors);
    }
    await user.save();

    // TODO: Return the user
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

router.post('/register', register);

export default router;
