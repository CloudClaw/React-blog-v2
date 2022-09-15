import { Button, Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { changeUser, selectUserData } from '../../redux/Slices/User/userSlice';
import { useAppSelector } from '../../redux/store';
import styles from './ProfilePage.module.scss';

export const ProfilePage: React.FC = () => {
  const userCard = useAppSelector(selectUserData);
  const dispatch = useDispatch();

  const [showInput, setShowInput] = React.useState(true);
  const [nameValue, setNameValue] = React.useState(userCard?.name);
  const [mailValue, setMailValue] = React.useState(userCard?.email);

  const showModal = (): void => {
    setShowInput(true);
  };

  const handleOk = (): void => {
    setShowInput(false);
  };

  const handleCancel = (): void => {
    setShowInput(false);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNameValue(e.target.value);
  };
  const onChangeMail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMailValue(e.target.value);
  };

  const changeUserData = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const userId = userCard?.id;
    const user = {
      id: userCard?.id,
      name: nameValue,
      email: mailValue,
    };
    if (userId) {
      //@ts-ignore Проблема с версией redux
      dispatch(changeUser({ user, userId }));
    }
    handleCancel();
  };

  return (
    <div className={styles.wrapper}>
      <h1>Карточка пользователя</h1>
      <div className={styles.userCard}>
        <p>Name: {userCard?.name}</p>
        <span>
          <Button onClick={showModal}>Изменить данные</Button>
        </span>
        <p>Email: {userCard?.email}</p>
      </div>
      {showInput ? (
        <div className={styles.modal}>
          <div className={styles.modalWindow}>
            <h2>Изменить данные</h2>
            <Input onChange={onChangeName} value={nameValue} />
            <Input onChange={onChangeMail} value={mailValue} />
            <Button style={{'width':'245px'}} onClick={changeUserData}>Изменить</Button>
            <Button style={{'width':'245px'}} onClick={handleCancel}>Отмена</Button>
          </div>
          <div className={styles.overlay}></div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
