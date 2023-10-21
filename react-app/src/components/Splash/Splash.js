import './Splash.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import {useState, useEffect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import DemoUserButton from '../auth/DemoUserButton';


const Splash = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const email = 'demouser@mail.com';
    const password = 'Password1!';

    const onDemoSignIn = async (e) => {
        e.preventDefault();
        await dispatch(login(email, password));
        history.push('/my/home');
    };


    return (
        <div className='splash-page'>
        <picture id='left_column'>
        
        <div className='multi-image-container' alt='multiple-images'>
            <img id='top_pic_phone' src='https://images.ctfassets.net/gkyt4bl1j2fs/hVKddYw7KKDk1iNCMmDDx/fc9ecc28d15ae8e27049d7cac0484fc1/Homepage_Desktop_UI_Comp_01.png?w=1584&h=1751&q=50&fm=webp' alt='phone'/>
            <img id='buttom_pic_phone' className='pulse atoms-bits-bit__top-right' src='https://images.ctfassets.net/gkyt4bl1j2fs/7LkWsnq60LKKQdhEfOssFx/128192b4b693f6842bea2669c8965474/Homepage_Bit4.svg' alt='payment'/>
        </div>
        <button className='demo-button' onClick={onDemoSignIn}>Try Demo account!</button>
        <section className='features-description'>
            <p>
                This is a clone project inspired by FaceBook and PayPal. Click on the "Demo" button to Login and explore.
            </p>
            <h3>Features:</h3>
            <ul>
                <li>You can add and remove friends. When added, users get a friend request notification with options to accept or reject. Find users under the "Users" tab and friends under the "Contacts" tab.</li>
                <li>Send, request, or receive 'fake crypto' from the "Send&Request" tab. Like Venmo, you can send, receive, or request crypto. Transactions are under the "Activity" tab. Additionally there are some safety mechanism in place to ensure you can't send money to yourself or perform multiple transactions at once</li>
                <li>Check real-time data of Crypto coins. Click on the coin logo on the top left and search for a cryptocurrency like Bitcoin.</li>
                <li>Create and interact with new users by signing up.</li>
            </ul>
        </section>

        <div className='multi-image-container' alt='multiple-images'>
        <img className='top_pic' src='https://images.ctfassets.net/gkyt4bl1j2fs/1wFljDmY3Hs95mtTxhDDiB/caf4cd1a4be9643d519f6607922e58c0/Homepage_Desktop_Photo_03.png?w=811&h=1186&q=50&fm=webp' alt='shopping'/>
        <img className='buttom_pic' src='https://images.ctfassets.net/gkyt4bl1j2fs/20XuFiM31dZOXxGfQCLYuU/537ae7843c60d4540f9a0cca7bc3abb4/Group_4853__1_.png' alt='payment'/>
        </div>
        <NavLink to='/login'><button className='demo-button'>Log in!</button></NavLink>

        <img src='https://www.paypalobjects.com/marketing/web/us/en/intro-offer1/Hero_illustration_1x.png' alt='high-five'/>
        <section className='features-description'>
            <p>
                This is a clone project inspired by FaceBook and PayPal. Click on the "Demo" button to Login and explore.
            </p>
            <h3>Features:</h3>
            <ul>
                <li>You can add and remove friends. When added, users get a friend request notification with options to accept or reject. Find users under the "Users" tab and friends under the "Contacts" tab.</li>
                <li>Send, request, or receive 'fake crypto' from the "Send&Request" tab. Like Venmo, you can send, receive, or request crypto. Transactions are under the "Activity" tab.</li>
                <li>Check real-time data of Crypto coins. Click on the coin logo on the top left and search for a cryptocurrency like Bitcoin.</li>
                <li>Create and interact with new users by signing up.</li>
            </ul>
        </section>
        </picture>

        <picture id='right_column'>
        <section className='features-description'>
            <p>
                This is a clone project inspired by FaceBook and PayPal. Click on the "Demo" button to Login and explore.
            </p>
            <h3>Features:</h3>
            <ul>
                <li>You can add and remove friends. When added, users get a friend request notification with options to accept or reject. Find users under the "Users" tab and friends under the "Contacts" tab.</li>
                <li>Send, request, or receive 'fake crypto' from the "Send&Request" tab. Like Venmo, you can send, receive, or request crypto. Transactions are under the "Activity" tab.</li>
                <li>Check real-time data of Crypto coins. Click on the coin logo on the top left and search for a cryptocurrency like Bitcoin.</li>
                <li>Create and interact with new users by signing up.</li>
            </ul>
        </section>
        <div className='multi-image-container' alt='multiple-images'>
            <img className='top_pic' src='https://images.ctfassets.net/gkyt4bl1j2fs/1SOpncxX1EsFEbTLtF5JtT/abe49ad118a88e13786c257fff3c9f45/Homepage_Desktop_Photo_01.jpg?w=900&h=1260&q=50&fm=webp' alt='phone'/>
            <img className='buttom_pic' src='https://images.ctfassets.net/gkyt4bl1j2fs/42PqTx8tnUNgE8b8Ghtmv7/d8eb929da8672c1ac8540c16d7764496/Payment_Note_-_small.png' alt='transaction'/>
        </div>
        <section className='features-description'>
            <p>
                This is a clone project inspired by FaceBook and PayPal. Click on the "Demo" button to Login and explore.
            </p>
            <h3>Features:</h3>
            <ul>
                <li>You can add and remove friends. When added, users get a friend request notification with options to accept or reject. Find users under the "Users" tab and friends under the "Contacts" tab.</li>
                <li>Send, request, or receive 'fake crypto' from the "Send&Request" tab. Like Venmo, you can send, receive, or request crypto. Transactions are under the "Activity" tab.</li>
                <li>Check real-time data of Crypto coins. Click on the coin logo on the top left and search for a cryptocurrency like Bitcoin.</li>
                <li>Create and interact with new users by signing up.</li>
            </ul>
        </section>
        <NavLink to='/sign-up'><button className='demo-button'>Sign up!</button></NavLink>
        </picture>
        </div>
    )
}

export default Splash