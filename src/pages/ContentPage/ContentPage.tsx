import { Button, Input, Layout, Menu, Modal, Select } from 'antd';
import axios from 'axios';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Post } from '../../components/Post/Post';
import { MyRoutes, POSTS_URL } from '../../constants';
import {
  addPosts,
  fetchPosts,
  PostType,
  selectPosts,
} from '../../redux/Slices/Content/contentSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './ContentPage.module.scss';

const { Content, Sider } = Layout;
const { Option } = Select;

export const ContentPage: React.FC = () => {
  const [addTitle, setAddTitle] = React.useState('');
  const [addDesc, setAddDesc] = React.useState('');
  const [addTheme, setAddTheme] = React.useState('');
  const [handleAddPost, setHandleAddPost] = React.useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  React.useEffect(() => {
	dispatch(fetchPosts());
 }, [addTheme,addTitle,addDesc]);

  const getDataByLocation = () => {
    switch (location.pathname) {
      case '/content/history':
        return posts.filter((post) => post.tag === 'history');
      case '/content/music':
        return posts.filter((post) => post.tag === 'music');
      case '/content/politic':
        return posts.filter((post) => post.tag === 'politic');
      default:
        return posts;
    }
  };

  const handleLikePost = async (index: number) => {
    const likedPost = JSON.parse(JSON.stringify(posts));
    likedPost[index].liked = !likedPost[index].liked;

    try {
      await axios.put(POSTS_URL + '/' + likedPost[index].id, likedPost[index]);
      dispatch(fetchPosts());
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPostForm = ():void => {
    setHandleAddPost(true);
  };
  const closeAddPostForm = ():void => {
    setHandleAddPost(false);
  };
  const newTitle = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setAddTitle(e.target.value);
  };
  const newDesc = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setAddDesc(e.target.value);
  };
  const newTheme = (value:string):void => {
	setAddTheme(value)
 };

  const addPost = ():void => {
    const postToAdd = {
      id: String(posts.length + 1),
      title: addTitle,
      liked: false,
		tag:addTheme,
      description: addDesc,
    };
    dispatch(addPosts(postToAdd));
    closeAddPostForm();
  };

  return (
    <Layout className={styles.root}>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}>
            <Menu.SubMenu title="Посты">
              <Menu.Item>
                <NavLink to={MyRoutes.Content + '/politic'}>Политика</NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to={MyRoutes.Content + '/music'}>Музыка</NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to={MyRoutes.Content + '/history'}>История</NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Button className={styles.addBtn} onClick={handleAddPostForm}>
            Добавить пост
          </Button>
          <Content
            className={`site-layout-background ${styles.content}`}
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}>
            {getDataByLocation()?.length > 0
              ? getDataByLocation()?.map((post: PostType, index: number) => {
                  return (
                    <Post key={post.id} {...post} handleLikePost={() => handleLikePost(index)} />
                  );
                })
              : null}
          </Content>
          <Modal
            title="Изменить пост"
            visible={handleAddPost}
            onOk={addPost}
            onCancel={closeAddPostForm}>
            <h2>Title</h2>
            <Input onChange={newTitle} value={addTitle} />
            <h2>Description</h2>
            <Input onChange={newDesc} value={addDesc} />
            <h2>Theme</h2>
            <Select style={{ width: 120 }} onChange={newTheme}>
              <Option value="music">Music</Option>
              <Option value="politic">Politic</Option>
              <Option value="history" >History</Option>
            </Select>
          </Modal>
        </Layout>
      </Layout>
    </Layout>
  );
};
