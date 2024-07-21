import {Router} from 'express';
const router = Router();

import {
    createComment,
    deleteComment,
    editComment,
    getPostComments,
    getcomments,
    likeComment,
} from "../controllers/comment.js"

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);

export default router;
