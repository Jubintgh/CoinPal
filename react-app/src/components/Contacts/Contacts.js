import './Contacts.css'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllFriends, updateOneFriendship,removeFriend} from '../../store/friend';
import {getOneUser} from '../../store/users'
import { Redirect } from 'react-router';


const MyContacts = () => {
    const { user } = useSelector((state) => state.session);

    let friendsList = useSelector(state => Object.values(state.friends.friendsList));

    let friendReqList = useSelector(state => Object.values(state.friends.friendsReqs));

    const id = Number(user.id);

    const history = useHistory();
    const dispatch = useDispatch();
    
    //useEffets
    useEffect(() => {
      dispatch(getAllFriends(id));
    }, [dispatch, id])

    //useStates
    const [ReqDisplay, setReqDisplay] = useState(false)
    const [SearchDisplay, setSearchDisplay] = useState(false)
    const [userSearchQuery, setUserSearchQuery] = useState([])

    //search for users
    const searchQuery = async function(username) {
        if(username && username[0] === '@'){
            username = username.slice(1)
        }
    
        const res = await fetch(`/api/users/search?user=${username}`);
            if(res.ok){
                const response = await res.json();
                setUserSearchQuery(response.users.slice(0,5))
            }
        return username
    }

    //Friend feature actions
    const unFriend = async (otherUserId) => {
        await dispatch(removeFriend(otherUserId))
        dispatch(getAllFriends(id))
    }

    const acceptFriend = async (userName) => {
        await dispatch(updateOneFriendship(userName, 'accept'))
        dispatch(getAllFriends(id))
    }

    const rejectFriend = async (userName) => {
        await dispatch(removeFriend(userName))
        dispatch(getAllFriends(id))
    }

    return (
        <div id='contacts_page'>
            <div id='contact__navbar'>
                <button onClick={e => setReqDisplay(!ReqDisplay)} className='friend_req_button'>
                    <span class={friendReqList.length ? "badge" : "notbadge"}>{friendReqList.length}</span>
                    <p><p>Friend Requests</p><i class={ ReqDisplay ? "arrow up" : "arrow down"}></i></p>
                </button>
            </div>
            <div className='req_contacts_container'>
            {
                ReqDisplay && <div className='contact_request_container'>
                <div id='title_holder'><h5 className='title'>Friend Requests</h5></div>
                { friendReqList && friendReqList.map((user, idx) => {
                    
                    return (
                            <div className='req_profile__container' key={idx}>
                            <div className='req_signle_contact'>
                                <img id='req_profile_pic' src={user.profile_img} onError={(e) => {e.target.src = 'https://unwomen.org.au/wp-content/uploads/2020/09/Avitar_Image_Placeholder-1.png'}} alt="profile_pic" className=""/>
                                <div className='name_username_container'>
                                    <p className={'req_real_name'}>{user.first_name} {user.last_name}</p>
                                    <p className={'req_user_name'}>@{user.user_name}</p>
                                </div>
                                    <button className={'accept_button'} onClick={(e) => acceptFriend(user.user_name)}>accept</button>
                                    <button className={'accept_button'} onClick={(e) => rejectFriend(user.user_name)}>reject</button>
                                </div>
                            </div>
                        )
                    })
                }{<div>No More Requests</div>}
                </div>}
            </div>

            <div className='contacts_container'>
            {
                <input className='search__input' placeholder="Look up users by user name" onChange={e => searchQuery(e.target.value)}/>
            }
            <ul>
                {userSearchQuery && userSearchQuery.map((user, idx) => (
                (<li onClick={e => history.push(`/users/${user.username}`)} className='req_profile__container search__bar_items' key={idx}><img id='seach_profile_pic' src={user.img} alt='profile_pic'/>{user.username}</li>)
                ))}
            </ul>
            
            
            <div className='title_holder'><h5 className='title'>My Contacts</h5></div>
            {
              friendsList && friendsList.map((friend, idx) => {
                return (
                    <div className='profile__container' key={idx}>
                        <div className='signle_contact'>
                            <img id='profile_pic' src={friend.profile_img} onError={(e) => {e.target.src = 'https://unwomen.org.au/wp-content/uploads/2020/09/Avitar_Image_Placeholder-1.png'}} alt="profile_pic" className=""/>
                                <div className='name_username_container'>
                                    <p className={'real_name'}>{friend.first_name} {friend.last_name}</p>
                                    <p className={'user_name'}>@{friend.user_name}</p>
                                </div>
                            <button className={'unfriend_button'} onClick={(e) => unFriend(friend.user_name)}>Remove Friend</button>
                        </div>
                    </div>
                )
              })
            }
            {
                !friendsList.length ? <div className='signle_contact'> You don't have any friends yet </div> : null
            }
            </div>
        </div>
    );
}
  
  
export default MyContacts;
