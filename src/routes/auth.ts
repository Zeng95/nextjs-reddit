import bcrypt from 'bcrypt';
import { isEmpty, validate } from 'class-validator';
import { Request, Response, Router } from 'express';
import { User } from '../entities/User';

const router = Router();

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    // TODO: Validate data
    const credentialErrors: { error?: string } = {};
    const emailUser = await User.findOne({ where: { email } });
    const usernameUser = await User.findOne({ where: { username } });
    if (emailUser || usernameUser) {
      credentialErrors.error = emailUser
        ? 'Email or is already taken'
        : 'Username or is already taken';
    }
    if (Object.keys(credentialErrors).length > 0) {
      return res.status(400).json(credentialErrors);
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

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // TODO: Validate data
    const credentialErrors: { error?: string } = {};
    if (isEmpty(username) || isEmpty(password)) {
      credentialErrors.error = isEmpty(username)
        ? 'Username must not be empty'
        : 'Password must not be empty';
    }
    if (Object.keys(credentialErrors).length > 0) {
      return res.status(400).json(credentialErrors);
    }

    // TODO: Compare username and password
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    // TODO: Return the user
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

router.post('/register', register);
router.post('/login', login);

export default router;
