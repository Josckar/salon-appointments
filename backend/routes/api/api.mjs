import Router from 'express';
import adminRoutes from './admin.mjs';

const router = Router();

/**
 * Check if user is authenticated
 */
router.get('/check-auth', (req, res) => {
    console.log(req.isAuthenticated());
    res.status(200).send({ authenticated: req.isAuthenticated() });
});

/**
 * Check if user is admin
 */
router.get('/check-admin', (req, res) => {
    console.log('checking admin status');
    res.status(200).send({ admin: req.user.admin });
});

router.use('/', adminRoutes);

export default router;
