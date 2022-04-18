import passportJwt from 'passport-jwt'
import passport from 'passport';
const ExtractJwt=passportJwt.ExtractJwt;
const JwtStrategy=passportJwt.Strategy
const opts={}
import User from '../model/user.js'
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Random string';
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

// passport.use(new StrategyJwt({
//     jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey:'Random string',
// },
// function(jwt_payload,done){
//     return User.findOne({id: jwt_payload.sub})
//     .then((user)=>{
//          return done(null,user)
//     })
//     .catch((err)=>{
//         return done(err)
//     })
// }
// )
// )

export default passport