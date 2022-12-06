import express from 'express';
import { updateComment, addCommentOnConfig, getAllComments, getCommentsAppreciators, getMainGameFromComment, getMostDebatedComment, getMostRecentComments, getMostReliableComments, removeComment } from '../models/commentModels';
const router = express.Router();

/* GET appreciators by comment id */
router.get('/:commentID/Appreciators', getCommentsAppreciators);

/* GET all comments*/
router.get('/', getAllComments);

/* GET most recent comments*/
router.get('/all/mostRecent/:count', getMostRecentComments);

/* GET most recent comments*/
router.get('/all/mostReliable', getMostReliableComments);

/* GET most debated comment*/
router.get('/mostDebated', getMostDebatedComment);

/* GET Main Game from a given comment*/
router.get('/:commentID/game', getMainGameFromComment)

/* POST Comment */
router.post('/new', addCommentOnConfig);

/* GET removeComment */
router.get('/remove/:id', removeComment);

/* GET removeComment */
router.post('/update', updateComment);


export default router;
