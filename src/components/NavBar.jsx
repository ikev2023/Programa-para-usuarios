import React from 'react'

const NavBar = () => {
    return (
        <div>
            <nav class="navbar bg-custom-black ">
                <div class="container-fluid d-flex align-items-center justify-content-center">
                    <img src="logo.png" alt="" class="img_logo2" />
                    <div class="d-flex align-items-center justify-content-center">
                        <h1 class="h1-footer p-3">Usuarios de Steam</h1>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar