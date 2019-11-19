'use strict';
const { validate } = use('Validator')
const Hash = use('Hash');
const User = use('App/Models/User');
const Database = use('Database');
const sanitize = use('sqlstring');

class AuthController {
    async register({response, request, view}){
        return view.render('account/register');
    }
    async storeUser({response, request, view, session}){
        // validation of input fields
        const validation = await validate(request.all(), {
            email: 'required|email|unique:users,email',
            password: 'required|min:6|max:40',
            confirm_password: 'required'
        });
        //check if passwords are the same
        if(request.input('password') === request.input('confirm_password'))
         {
             // check if validation of others fail if not save user
            if(validation.fails()) {
                session.withErrors(validation.messages()).flashExcept(['password', 'confirm_password'])
                return response.redirect('back');
            }else{
                // try to save user to database
                try{
                    let newUser = await User.create({
                        email: request.input('email'),
                        password: request.input('password')
                    })
                } catch(error){
                    return error;
                }
                session.flash({success: 'Welcome to the Store!'});
                 return response.redirect('/');
            }
        }else{
            session.withErrors([
                {
                    field: 'password', message: 'need to confirm password'
                },
                {
                    field: 'confirm_password', message: 'need to confirm password'
                }
        ]).flashExcept(['password', 'confirm_password']);
            return response.redirect('back');
        }
    }
    async login({response, request, view}){
        return view.render('account/login');
    }
    async handleLogin({response, request, view, auth, session }){
        // capture data from form
        const postData = request.post();
        let user = await Database.raw(`
            SELECT * FROM freshgear.users WHERE users.email = "${
                postData.email
            }" LIMIT 1;
        `);
        user = user[0][0];
        if (user) {
            // verify password
            const passwordVerified = await Hash.verify(
                postData.password, 
                user.password
            );
        
        if(passwordVerified){
            //login the user
            await auth.login(user)
            session.flash({success: 'You are logged in'})
            return response.redirect('/')
        } else {
            session.withErrors([
                field: 'password', message: 'Incorrect password'
            ]).flashExcept(['password'])
            return response.redirect('back')
        }
        }
        console.log(user);
        return user;
        // return request.all();
    }
    
}

module.exports = AuthController
