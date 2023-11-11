const authRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role)
        {
            res.status(403).send("Access denied!")
        }
        next();
    }
}

module.exports = authRole;