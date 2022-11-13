const express = require("express");
const router = express.Router();

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

// app.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/failure'
//     }));

app.get(
    "/auth/google/callback",
    passport.authenticate('google', { session: false }),
    (req, res) => {
        jwt.sign(
            { user: req.user },
            "secretKey",
            { expiresIn: "1h" },
            (err, token) => {
                if (err) {
                    return res.json({
                        token: null,
                    });
                }
                res.json({
                    token,
                });
            }
        );
    }
);

app.get("/profile", (req, res) => {
    console.log(req);
    res.send("Welcome");
});

module.exports = router;