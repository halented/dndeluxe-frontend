import React from 'react'

export default function Logout(){
    return (
    <div>
        {localStorage.clear()}
        <h1>See ya!</h1>
    </div>
    )
}