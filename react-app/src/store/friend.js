//constant
const GET_FRIENDS = 'friend/GET_FRIENDS';
const GET_FRIEND_REQUESTS = 'friend/GET_FRIEND_REQUESTS';
const GET_PENDING_REQUESTS = 'friend/GET_PENDING_REQUESTS';
const SET_FRIEND = 'friend/SET_FRIEND';
const UPDATE_FRIEND = 'friend/UPDATE_FRIEND';
const REMOVE_FRIEND = 'friend/REMOVE_FRIEND';
const DROP_FRIENDS = 'friend/DROP_FRIENDS';

const getFriends = (friends) => ({
    type: GET_FRIENDS,
    payload: friends
})

const getFriendReqs = (friendReqs) => ({
    type: GET_FRIEND_REQUESTS,
    payload: friendReqs
})

const getFriendPends = (friendPends) => ({
    type: GET_PENDING_REQUESTS,
    payload: friendPends
})

const setFriendship = (friend) => ({
    type: SET_FRIEND,
    payload: friend
})

const updateFriendship = (friend) => ({
    type: UPDATE_FRIEND,
    payload: friend
})

const deleteFriend = (friendId) => ({
    type: REMOVE_FRIEND,
    payload: friendId
})

const dropFriends = () => ({
    type: DROP_FRIENDS
})

export const getAllFriends = () => async (dispatch) => {
    const response = await fetch(`/api/friends/`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok){
        const data = await response.json();
        if(data.error){
            return;
        }
        dispatch(getFriends(data.friends))
        dispatch(getFriendPends(data.curr_friend_requests))
        dispatch(getFriendReqs(data.friend_requests))
    }
}

export const postFriendship = (otherUserName) => async (dispatch) => {
    const response = await fetch(`/api/friends/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'to_username': otherUserName
        })
    })
    if(response.ok){
        const data = await response.json();
        dispatch(setFriendship(data.request))
        return data
    } else {
        const error = await response.json();
        return error 
    }
}

export const updateOneFriendship = (otherUserUserName, type) => async (dispatch) => {
    const response = await fetch(`/api/friends/${type}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'to_username': otherUserUserName
        })
    })
    if(response.ok){
        const data = await response.json();
        if(data.error){
            return;
        }
        dispatch(setFriendship(data))
        // dispatch(updateFriendship(data))
    }
}

export const removeFriend = (otherUserName) => async (dispatch) => {
    const response = await fetch(`/api/friends/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'to_username': otherUserName
        })
    })
    if(response.ok){
        const data = await response.json();
        if(data.error){
            return;
        }
        dispatch(deleteFriend(data))
    }
}


export const dropAllFriends = () => (dispatch) => {
    dispatch(dropFriends())
}

const initialState = {
    "friendsList": [],
    "friendsReqs": [],
    "friendsPends": []
}

export default function reducer(state = initialState, action){
    let newState;
    switch(action.type){
        case GET_FRIENDS:
            newState = {...state}
            newState.friendsList = action.payload.reduce((friend, el) => {
                friend[el.user_name] = el;
                return friend;
            }, {})
            return newState
        case GET_FRIEND_REQUESTS:
            newState = {...state}
            newState.friendsReqs = action.payload.reduce((friend, el) => {
                friend[el.user_name] = el;
                return friend;
            }, {})
            return newState
        case GET_PENDING_REQUESTS:
            newState = {...state}

            newState.friendsPends = action.payload.reduce((friend, el) => {
                friend[el.user_name] = el;
                return friend;
            }, {})
            return newState
        case SET_FRIEND:
            newState = {
                ...state
            }
            newState.friendsList[action.payload.user_name] = action.payload
            return newState
        case UPDATE_FRIEND:
            newState = {}
            newState.friendsList[action.payload.user_name] = action.payload
            return newState
        case REMOVE_FRIEND:
            newState = initialState;
            newState = {...state }
            delete newState.friendsList[action.payload.username]
            return newState
        case DROP_FRIENDS:
            return initialState;
        default:
            return state
    }
}