const userAddress = [
    {
        name: "Priya",
        doorNumber: "60 / 9 - 3",
        area: "Amman Nagar",
        city: "Hosur",
        pincode: 12345
    },
    {
        name: "Bala",
        doorNumber: "60 / 9 - 3",
        area: "Amman Nagar",
        city: "Hosur",
        pincode: 12345
    }
]

const getUserAddress = (req, res) => {
    try {
        res.status(200).send({
            meaasge: "Address Fetched Successfully",
            userAddress
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Serverr Error"
        })
    }
}

export default { getUserAddress }