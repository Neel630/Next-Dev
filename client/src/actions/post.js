import axiox from 'axios';
import { setAlert } from './alert';
import * as ACTION_TYPES from '../actions/types';

//Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axiox.get('api/posts');

    dispatch({
      type: ACTION_TYPES.GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Single Post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axiox.get(`/api/posts/${id}`);
    dispatch({
      type: ACTION_TYPES.GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD Like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axiox.put(`api/posts/like/${id}`);

    dispatch({
      type: ACTION_TYPES.UPDATES_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Remove Like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axiox.put(`api/posts/unlike/${id}`);

    dispatch({
      type: ACTION_TYPES.UPDATES_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axiox.delete(`api/posts/${id}`);

    dispatch({
      type: ACTION_TYPES.DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
    },
  };

  try {
    const res = await axiox.post('/api/posts', formData, config);

    dispatch({
      type: ACTION_TYPES.ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
    },
  };

  try {
    const res = await axiox.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ACTION_TYPES.ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axiox.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: ACTION_TYPES.REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
