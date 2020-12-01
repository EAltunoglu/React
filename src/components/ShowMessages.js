
import React, { Component }  from 'react';
//import './messages.css';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

//const firestore = firebase.firestore();
/*
export default function ShowMessages(username) {

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.where('sender', '==', username);
    const [messages] = useCollectionData(query);
    
    console.log(messages);
}*/