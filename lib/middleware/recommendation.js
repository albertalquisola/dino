import coordinators from 'coordinators';
import Logger from 'util/Logger';

const log = new Logger('mw/recommendation');

async function createRec(req, res, next) {
  if (!req.body.recommendation)
    return next(new Error('recommendation body is empty'));

  if (!req.body.placeId)
    return next(new Error('missing place id'));

  const { placeId, recommendation } = req.body;
  const userId = req.user.id;

  try {
    const response = await coordinators.rec.createRec(recommendation, placeId, userId);
    return res.json({ recommendation: response });

  } catch (error) {
    return next(error);
  }
}

export default { createRec };
