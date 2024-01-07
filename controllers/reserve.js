import { Reserve, Home, User } from '../models/index.js';
import Error from '../services/error.js';
import Log from '../utils/logger.js';
import { checkInputs } from '../utils/validations.js';
import { reserveSchema } from '../utils/zodSchemas.js';

export const getReservations = async (req, res, next) => {
  try {
    const hostId = req.params.hostId;
    const reserves = await Reserve.find({ hostId }).sort({ _id: -1 });
    res.send(reserves);
  } catch (error) {
    next(error);
  }
};

const addReservationToGuest = async (guestId, homeId) => {
  const guest = await User.findById(guestId);
  if (!guest) {
    throw new Error('Error on finding the guest!!');
  }

  guest.trips.push(homeId);
  await guest.save();
};

const addReservedDaysToHome = async (homeId, reservedDays) => {
  const home = await Home.findById(homeId);
  if (!home) {
    throw new Error('Error on finding the home!!');
  }

  home.reservedDays.push(...reservedDays);
  await home.save();
};

export const addReservation = async (req, res, next) => {
  try {
    const safeData = checkInputs(reserveSchema, req.body, next);
    if (!safeData) return;

    const reserveData = await Reserve.create(safeData.data);

    await addReservationToGuest(reserveData.guestId, reserveData.homeId);
    await addReservedDaysToHome(reserveData.homeId, reserveData.reservedDays);

    res.send(reserveData);
  } catch (error) {
    next(error);
  }
};

export const checkReservationDuplicates = async (req, res, next) => {
  try {
    const { homeId, guestId } = req.params.homeId;
    const result = await Reserve.find({ homeId, guestId });
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const removeReservationFromGuest = async (guestId, homeId) => {
  const user = await User.findById(guestId);
  if (!user) {
    Log.error(new Error('Error on finding the guest!!'));
    return;
  }

  const userIndex = user.trips.indexOf(homeId);
  if (userIndex > -1) {
    user.trips.splice(userIndex, 1);
    await user.save();
    Log.info('trip removed from guest!');
  }
};

const removeReservedDaysFromHome = async (homeId, toBeRemovedDays) => {
  const home = await Home.findById(homeId);
  if (!home) {
    Log.error(new Error('Error on finding the home!!'));
    return;
  }

  const strReserved = home.reservedDays.map(String);
  const strRemoving = toBeRemovedDays.map(String);

  home.reservedDays = strReserved.filter((day) => !strRemoving.includes(day));
  await home.save();
};

export const removeReservation = async (req, res, next) => {
  try {
    const reserveId = req.params.id;
    const reserve = await Reserve.findById(reserveId);
    if (!reserve) {
      next(new Error('Error on finding the reservation!'));
      return;
    }

    const deletionResult = await Reserve.deleteOne({ _id: reserveId });
    if (deletionResult.n < 1) {
      // "n" is the number of documents deleted
      next(new Error('Error on deleting the reservation!'));
      return;
    }

    await removeReservationFromGuest(reserve.guestId, reserve.homeId);
    await removeReservedDaysFromHome(reserve.homeId, reserve.reservedDays);

    res.send({ message: 'Reservation removed successfully' });
  } catch (error) {
    next(error);
  }
};
