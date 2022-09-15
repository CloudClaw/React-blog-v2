
import { Button, Card } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchSinglePosts, selectSinglePost } from '../../redux/Slices/SinglePost/singlePostSlice';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './SinglePost.module.scss'

export const SinglePostPage = () => {
	const singlePost = useAppSelector(selectSinglePost)
	const { postId } = useParams();
  const dispatch = useAppDispatch();
  const navigation = useNavigate()

	React.useEffect(() => {
		if (postId) {
		  dispatch(fetchSinglePosts({ postId }));
		}
	 }, [postId]);

	 const onClickBack = () => {
		navigation(-1)
	 }

  return (
	<div className={styles.root}>
    <div className={styles.content}>
      <Card title={singlePost?.title} style={{ minWidth: 500, minHeight: 500 }}>
        <p>{singlePost?.description}</p>
      </Card>
    </div>
	 <Button className={styles.btn} onClick={onClickBack}>Назад</Button>
	 </div>
  );
};
