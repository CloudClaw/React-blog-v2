import React from 'react'
import styles from './FavoutirePage.module.scss'
import { Post } from '../../components/Post/Post'
import { fetchPosts, PostType, selectPosts } from '../../redux/Slices/Content/contentSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import axios from 'axios'
import { POSTS_URL } from '../../constants'

type Props = {}

export const FavoutirePage:React.FC = (props: Props) => {
	const dispatch = useAppDispatch();
	const posts = JSON.parse(JSON.stringify(useAppSelector(selectPosts)))

	const handleLikePost = async(index:number) => {
		const likedPost = JSON.parse(JSON.stringify(posts));
		 likedPost[index].liked = !likedPost[index].liked;
	
		 try {
			await axios.put(
			  POSTS_URL + '/' + likedPost[index].id,
			  likedPost[index],
			);
			dispatch(fetchPosts());
		 } catch (error) {
			console.log(error);
		 }
	  }

  return (
	 <div className={styles.wrapper}>
		{posts.filter((post:PostType)=>post.liked === true).map((post:PostType,index:number)=>{
			return <Post key={post.id} {...post} handleLikePost={()=>handleLikePost(index)}/>
		})}
	 </div>
  )
}