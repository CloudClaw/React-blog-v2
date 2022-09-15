import React from 'react';
import styles from './Post.module.scss';
import { Card, Button, Modal, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { MyRoutes } from '../../constants';
import { useAppDispatch } from '../../redux/store';
import { changePosts, deletePosts } from '../../redux/Slices/Content/contentSlice';

import { ReactComponent as Heart } from '../../assets/heart.svg';
type LikePostProp = {
  id: string;
  title: string;
  description: string;
  liked: boolean;
  tag?:string;
  handleLikePost: () => void;
};

const { Option } = Select;

export const Post = ({ id, title, tag, description, handleLikePost, liked }: LikePostProp) => {
  const [edit, setEdit] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);
  const [newDesc, setNewDesc] = React.useState(description);
  const [newTheme, setNewTheme] = React.useState(tag);
  const dispatch = useAppDispatch();

  const customFillingLike = liked ? 'crimson' : 'black';

  const deletePost = () => {
    dispatch(deletePosts(id));
  };

  const editPost = () => {
    const editedPost = {
      id,
      title: newTitle,
      liked,
		tag:newTheme,
      description: newDesc,
    };
    dispatch(changePosts({ id, editedPost }));
    closeModal();
  };

  const closeModal = () => {
    setEdit(false);
  };
  const openModal = () => {
    setEdit(true);
  };

  const editTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewTitle(e.target.value);
  };
  const editDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewDesc(e.target.value);
  };
  const editTheme = (value:string) => {
	setNewTheme(value);
 };

  return (
    <div className={styles.root}>
      <Card
        title={title}
        extra={<Link to={`${MyRoutes.Content}/post/${id}`}>More</Link>}
        style={{ width: 300, height: 200 }}>
        <p>{description.length > 100 ? description.slice(0, 100) + '...' : description}</p>
      </Card>
      <Button onClick={openModal} className={styles.editBtn}>
        Edit
      </Button>
      <Button onClick={deletePost} danger className={styles.delBtn}>
        Delete
      </Button>
      <Button onClick={handleLikePost} className={styles.favbtn}>
        <Heart fill={customFillingLike} className={styles.heart} />
      </Button>
      <Modal title="Изменить пост" visible={edit} onOk={editPost} onCancel={closeModal}>
        <h2>Title</h2>
        <Input onChange={editTitle} value={newTitle} />
        <h2>Description</h2>
        <Input onChange={editDesc} value={newDesc} />
        <h2>Theme</h2>
        <Select style={{ width: 120 }} onChange={editTheme}>
          <Option value="music">Music</Option>
          <Option value="politic">Politic</Option>
          <Option value="history">History</Option>
        </Select>
      </Modal>
    </div>
  );
};
