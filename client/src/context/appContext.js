import {io} from 'socket.io-client';
import React from 'react';
import {SERVER_URL} from '../constants';

const SOCKET_URL = SERVER_URL

export const socket = io(SOCKET_URL);

//app context
export const AppContext = React.createContext();