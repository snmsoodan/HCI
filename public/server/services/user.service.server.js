module.exports = function(app,userModel) {

    var instruments=[

        // { "_id": "Adjustable Sit Up Benches", "n1": "1:00 PM", "n2": "1:30 PM", "n3":"2:00 PM", "n4":"2:30 PM", "n5":"3:00 PM", "n6":"3:30 PM","n7":"4:00 PM","n8":"4:30","n9":"5:00 PM","n10":"5:30","n11":"6:00","n12":"6:30","n13":"7:00",
        //     "a1":"f","a2":"t","a3":"t","a4":"t","a5":"t","a6":"t","a7":"t","a8":"t","a9":"t","a10":"t","a11":"t","a12":"t","a13":"t"},

        {"_id": "Adjustable Sit Up Benches", "n": "1:00 - 1:30 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "1:30 - 2:00 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "2:00 - 2:30 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "2:30 - 3:00 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "3:00 - 3:30 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "3:30 - 4:00 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "4:00 - 4:30 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "4:30 - 5:00 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "5:00 - 5:30 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "5:30 - 6:00 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "6:00 - 6:30 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "6:30 - 7:00 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "7:00 - 7:30 PM","a":"t"},
        {"_id": "Barbell", "n": "7:00 - 7:30 PM","a":"t"}
    ]



    var categories=[
        {"name":"Abs"},{"name":"Back"},{"name":"Chest"},{"name":"Arms"},{"name":"Cardio"},{"name":"Legs"}
    ]

    var subCategories=[
        {id:"Abs",name:"Adjustable Sit Up Benches"},{id:"Abs",name:"Bar"},{id:"Abs",name:"Ab Wheel"},{id:"Abs",name:"Stability Ball"},{id:"Abs",name:"Roman Chairs"},{id:"Abs",name:"Hyper Bench"},
        {id:"Back",name:"SEATED CABLE ROW"},{id:"Back",name:"BACK EXTENSIONS"},{id:"Back",name:"Assisted Pull-up"},{id:"Back",name:"Wide-Grip Pull-Up"},{id:"Back",name:"Bent-over Row"},{id:"Back",name:"Barbell"},
        {id:"Chest",name:"Bench Press Kit"},{id:"Chest",name:"Chest Bench Kit"},{id:"Chest",name:"Dumnble Kit"},{id:"Chest",name:"Chest Fly Machine"},{id:"Chest",name:"Chest Press Machine"},{id:"Chest",name:"Dip Machine"},
        {id:"Arms",name:"Biceps Curl"},{id:"Arms",name:"Triceps Dip"},{id:"Arms",name:"Fly Machine"},{id:"Arms",name:"Seated High Row"},{id:"Arms",name:"Lat Pull-Down,Seated"},{id:"Arms",name:"Shoulder Press"},
        {id:"Cardio",name:"Treadmill"},{id:"Cardio",name:"Stair Mill"},{id:"Cardio",name:"Rowing Machine"},{id:"Cardio",name:"Spin Bike"},{id:"Cardio",name:"Jacob's Ladder"},{id:"Cardio",name:"ARC Trainer"},
        {id:"Legs",name:"Leg Press"},{id:"Legs",name:"Leg Extension"},{id:"Legs",name:"Hamstring Curl"},{id:"Legs",name:"Seated Calf Raise"},{id:"Legs",name:"Standing Calf Raise"},{id:"Legs",name:"Leg Abductor"}
    ]

    var  userBookings=[]

    var passport = require('passport');
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


    // var auth = authorized;

    app.get("/auth/google", passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get("/auth/google/callback",
        passport.authenticate('google', {
            successRedirect: '/#/category/Abs',
            failureRedirect: '/#/home'
        }));
    app.get("/api/loggedIn",loggedIn);
    app.post("/api/logout",logout);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);




    app.get("/api/instruments/:instrumentName",getInstuments);
    app.put("/api/book/name/:name/time/:time",book);
    app.get('/api/userBookiings/:userId',findUserBookings);
    app.get('/api/cancel/:userId/name/:name/time/:time',cancel);

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };
    passport.use('google',new GoogleStrategy(googleConfig, googleStrategy));


    function cancel(req,res) {
        var userId=req.params.userId;
        var name=req.params.name;
        var time=req.params.time;

        for(var i in instruments)
        {
            if(instruments[i]._id===name&&instruments[i].n===time)
            {
                instruments[i].a="t";
            }
        }
            for(var i in userBookings)
            {
                if(userBookings[i].insName===name&&userBookings[i].insTime===time)
                {
                    // instruments[i].a="f";
                    userBookings.splice(i,1);
                }
            }
        res.json(userBookings);
    }

    function findUserBookings(req,res) {
        var userId=req.params.userId;
        var bookings=[];

        for(var i in userBookings)
        {
            if(userBookings[i]._id===userId)
            {
                bookings.push(userBookings[i]);
            }
        }
        res.json(bookings);
    }

    function book(req,res) {

        var currentUser=req.body;
        var name=req.params.name;
        var time=req.params.time;
        for(var i in instruments)
        {
            if(instruments[i]._id===name&&instruments[i].n===time)
            {
                instruments[i].a="f";
                userBookings.push({"_id":currentUser._id,"userName":currentUser.firstName+" "+currentUser.lastName,"insName":name,"insTime":time})
                res.sendStatus(200);
                // console.log(userBookings)
            }
        }
    }

    function getInstuments(req,res) {
        var ins=[];
        var instrumentName=req.params.instrumentName;
        for(var i in instruments)
        {
            if(instruments[i]._id===instrumentName)
            {
                ins.push(instruments[i]);
            }
        }
        res.json(ins);
    }


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
                        // if(email.indexOf("@husky")!==-1||email.indexOf('@ccs')!==-1)
                        // {
                        //     console.log("here")
                        //     return done(400);
                        // }
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