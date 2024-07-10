const tryCatch = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
        console.log(error);
    }
}

export default tryCatch;