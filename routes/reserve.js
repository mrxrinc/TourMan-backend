import express from 'express';

import {
  checkReservationDuplicates,
  getReservations,
  addReservation,
  removeReservation,
} from '../controllers/reserve.js';

const router = express.Router();

router.get('/:hostId', getReservations);

router.post('/', addReservation);

router.delete('/:id', removeReservation);

router.get('/duplicateCheck/:guest/:home', checkReservationDuplicates);

export default router;
