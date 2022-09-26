import React from 'react'
import { Chat } from './Chat'

export const Check = () => {
    // const pathname=useLocation()
    const crosscheck=window.location.pathname.indexOf('/Admin')>=0?" ":<Chat/>
return  crosscheck
 
}
