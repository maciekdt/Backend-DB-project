const authRouter = require('express').Router()


authRouter.get('/token', function(req, res, next) {
    usersRepo.authenticateUser(baseAuth(req),
        function(userId) {
            if (userId) {
                tokenHandler.getToken(userId,
                    function(token) {
                        res.status(200).send({
                            "token": token,
                            "userId": userId
                        });
                    },
                    function(err) {
                        next(err);
                    });
            } else res.status(401).send("Wrong login or password");
        },
        function(err) {
            next(err);
        }
    );
});

authRouter.get('/checkToken', function(req, res, next) {
    tokenHandler.verifyToken(req.header("authorization"),
        function(id) {
            res.status(200).send("Valid token");
        },
        function(err) {
            res.status(401).send("Not valid token");
        });
})

authRouter.get('/publicKey', function(req, res, next) {
    res.status(200).send({
        "algorithm": tokenHandler.getAlgorithmName(),
        "key": tokenHandler.getPublicKey()
    });
})

authRouter.post('/register', function(req, res, next) {
    usersRepo.insertUser(req.body,
        function() {
            res.status(201).send();
        },
        function(err) {
            if (err.code == codes.userNameAlreadyUsed || err.code == codes.emailAlreadyUsed) {
                res.status(400).send({
                    errorCode: err.code
                })
            } else next(err);
        });
})


module.exports = authRouter;