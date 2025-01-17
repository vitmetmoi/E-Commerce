import React from 'react';
import './Login.scss'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Login(props) {
    return (
        <>
            <Button variant="contained">Hello world</Button>
            <TextField id="standard-basic" label="Standard" variant="standard" />
        </>
    );
    return (
        <>
            <section class="vh-100" style={{ backgroundColor: '#9A616D' }}>
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-xl-10">
                            <div class="card" style={{ borderRadius: "1rem;" }}>
                                <div class="row g-0">
                                    <div class="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            alt="login form" class="img-fluid" style={{ borderRadius: "1rem 0 0 1rem;" }} />
                                    </div>
                                    <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div class="card-body p-4 p-lg-5 text-black">

                                            <form>

                                                <div class="d-flex align-items-center mb-3 pb-1">
                                                    <i class="fas fa-cubes fa-2x me-3" style={{ color: " #ff6219;" }}></i>
                                                    <span class="h1 fw-bold mb-0">Logo</span>
                                                </div>

                                                <h5 class="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px;" }}>Sign into your account</h5>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <input type="email" id="form2Example17" class="form-control form-control-lg" />
                                                    <label class="form-label" for="form2Example17">Email address</label>
                                                </div>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <input type="password" id="form2Example27" class="form-control form-control-lg" />
                                                    <label class="form-label" for="form2Example27">Password</label>
                                                </div>

                                                <div class="pt-1 mb-4">
                                                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-lg btn-block" type="button">Login</button>
                                                </div>

                                                <a class="small text-muted" href="#!">Forgot password?</a>
                                                <p class="mb-5 pb-lg-2" style={{ color: " #393f81;" }}>Don't have an account? <a href="#!"
                                                    style={{ color: "#393f81;" }}>Register here</a></p>
                                                <a href="#!" class="small text-muted">Terms of use.</a>
                                                <a href="#!" class="small text-muted">Privacy policy</a>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section></>
    );
    return (
        <div className='login-container'>
            <div className='login-content'>


                <div class="content-left text-black">

                    <div class="px-5 ms-xl-4">
                        <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" ></i>
                        <span class="h1 fw-bold mb-0">Logo</span>
                    </div>

                    <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                        <form className='login-form'>

                            <h3 class="h3-class fw-normal mb-3 pb-3">Log in</h3>

                            <div class="form-input-material">
                                <input type="text" name="username" id="username" placeholder=" " autocomplete="off" class="form-control-material" required />
                                <label for="username">Username</label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <label class="form-label" for="form2Example28">Password</label>
                                <input type="password" id="form2Example28" class="form-control form-control-lg" />
                            </div>

                            <div class="pt-1 mb-4">
                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-info btn-lg btn-block" type="button">Login</button>
                            </div>

                            <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Forgot password?</a></p>
                            <p>Don't have an account? <a href="#!" class="link-info">Register here</a></p>

                        </form>

                    </div>

                </div>

                <div style={{ backgroundImage: "url(" + "https://doncare-club.com/cdn/shop/files/5_68cd7cdf-4b4b-4dbe-bcc8-f9d7526c85e1.jpg?v=1734677425&width=1080" + ")" }} class="form-img">
                </div>


            </div>
        </div>
    );
}

export default Login;