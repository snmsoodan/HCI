module.exports = function(app,userModel) {


    var passport = require('passport');
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


    // var auth = authorized;

    app.get("/auth/google", passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get("/auth/google/callback",
        passport.authenticate('google', {
            successRedirect: '/#/category',
            failureRedirect: '/#/home'
        }));
    app.get("/api/loggedIn",loggedIn);
    app.post("/api/logout",logout);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };
    passport.use('google',new GoogleStrategy(googleConfig, googleStrategy));


    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    }
                    else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function serializeUser(user, done) {
        console.log("searealizable")
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    console.log("desearealizable")
                    done(null, user);
                },
                function(err){
                    console.log("just error local desearealizable")
                    done(err, null);
                }
            );
    }


    function logout(req,res) {
        req.logOut();
        res.send(200);
    }



    function loggedIn(req,res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send('0');
        }
    }

    function findUserById(req,res) {
        //console.log("a")
        var id=req.params.userId;
        console.log("client server "+id);
        userModel
            .findUserById(id)
            .then(function (user) {
                res.send(user);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function updateUser(req,res) {
        var newUser=req.body;
        var id=req.params.userId;

        userModel
            .updateUser(id,newUser)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

}