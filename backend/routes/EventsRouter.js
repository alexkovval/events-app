import { Router } from 'express';
import EventsController from '../controllers/EventsController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authenticateToken, EventsController.getAllEvents);
router.get('/:id', authenticateToken, EventsController.getEventById);
router.post('/:id/rsvp', authenticateToken, EventsController.rsvpEvent);
router.put('/:id/rsvp', authenticateToken, EventsController.editRsvpEvent);
router.delete('/:id/rsvp', authenticateToken, EventsController.deleteRsvpEvent);

export default router;