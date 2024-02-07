const homePgae = (req, res) => {
    res.status(200).send(
        `<h1>Welcome to Express server</h1>`
    )
}
export default { homePgae }