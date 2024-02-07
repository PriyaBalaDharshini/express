// controllers/user.js
import { findIndex } from '../common/helper.js';

const user = [
    {
        id: 1,
        name: "Priya",
        place: "Hosur",
        native: "Trichy",
        email: "priya@gmail",
        password: 123
    }, {
        id: 2,
        name: "Bala",
        place: "Trichy",
        native: "Trichy",
        email: "priya@gmail",
        password: 123
    }
];

const getAllUsers = (req, res) => {
    try {
        res.status(200).send({
            message: "Data fetched successfully",
            user
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        });
    }
};

const getUserById = (req, res) => {
    try {
        const { id } = req.params;
        let index = findIndex(user, id);
        if (index !== -1) {
            res.status(200).send({
                message: "Data fetched successfully",
                user: user[index]
            });
        } else {
            res.status(400).send({
                message: "Invalid User ID"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};

const addUser = (req, res) => {
    try {
        /* console.log(req.body); */
        let id = user.length ? user[user.length - 1].id + 1 : 1;
        req.body.id = id;
        user.push(req.body)
        res.status(200).send({
            message: "User Added Successfully"

        })

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })

    }
}

const editUserById = (req, res) => {
    try {
        const { id } = req.params;
        let index = findIndex(user, id);

        if (index !== -1) {
            req.body.id = Number(id);
            user.splice(index, 1, req.body);
            res.status(200).send({
                message: "Data Updated successfully",
                user: user[index]
            });
        } else {
            res.status(400).send({
                message: "Invalid User ID"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};

const deleteUserById = (req, res) => {
    try {
        const { id } = req.params;
        let index = findIndex(user, id);
        if (index !== -1) {
            user.splice(index, 1);
            res.status(200).send({
                message: "Data Deleted successfully",

            });
        } else {
            res.status(400).send({
                message: "Invalid User ID"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};

export default {
    getAllUsers,
    getUserById,
    addUser,
    editUserById,
    deleteUserById
};
