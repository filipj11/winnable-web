import React from 'react'

import { Game } from './interfaces/game'
import { Events } from './interfaces/events';


const BASE_URL = 'https://127.0.0.1:2999/liveclientdata'

async function fetchAll(): Promise<