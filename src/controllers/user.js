// controllers/user.js
import { findIndex } from '../common/helper.js';
import DB_CONFIG from '../config/dbConfig.js'
import mongodb, { MongoClient } from 'mongodb';

const user = [];
const client = new MongoClient(DB_CONFIG.DB_URL); //client creation

const getAllUsers = async (req, res) => {
    await client.connect(); // client connection
    try {
        const db = await client.db(DB_CONFIG.DB_NAME);
        const users = await db.collection("users").find().toArray()
        res.status(200).send({
            message: "Data fetched successfully",
            users
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        });
    }
    finally {
        client.close();
    }
};

const getUserById = async (req, res) => {
    await client.connect(); // client connection
    try {
        const db = await client.db(DB_CONFIG.DB_NAME);
        const users = await db.collection("users").find({ _id: new mongodb.ObjectId(req.params.id) }).toArray()
        res.status(200).send({
            message: "Data fetched successfully",
            users
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        });
    }
    finally {
        client.close();
    }
};

const addUser = async (req, res) => {
    await client.connect(); // client connection
    try {
        /* console.log(req.body); */
        /*  let id = user.length ? user[user.length - 1].id + 1 : 1;
         req.body.id = id;
         user.push(req.body) DB will create id so no need of this */
        const db = await client.db(DB_CONFIG.DB_NAME); // db creation
        const user = await db.collection("users").findOne({ email: req.body.email }); // checking for user with email in collection named "users"
        if (!user) {
            // if user does not exist with the given email, create a new user
            let newUser = await db.collection("users").insertOne(req.body);
            res.status(200).send({
                message: "User Added Successfully",
            });
        } else {
            // else throw message
            res.status(400).send({ message: `User already exists with ${req.body.email}` });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    } finally {
        client.close(); // close the client
    }
};


const editUserById = async (req, res) => {
    await client.connect(); // client connection
    try {
        const db = await client.db(DB_CONFIG.DB_NAME);
        const user = await db.collection("users").find({ _id: new mongodb.ObjectId(req.params.id) });
        if (user) {
            await db.collection("users").updateOne({ _id: new mongodb.ObjectId(req.params.id) }, { $set: req.body });
            res.status(200).send({
                message: "Data Updated successfully"

            });
        }
        else {
            res.status(400).send({
                message: "Invalid id"
            });
        }

    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        });
    }
    finally {
        client.close();
    }
};

const deleteUserById = async (req, res) => {
    await client.connect(); // client connection
    try {
        const db = await client.db(DB_CONFIG.DB_NAME);
        const user = await db.collection("users").find({ _id: new mongodb.ObjectId(req.params.id) });
        if (user) {
            await db.collection("users").deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
            res.status(200).send({
                message: "Data Deleted successfully"

            });
        }
        else {
            res.status(400).send({
                message: "Invalid id"
            });
        }

    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        });
    }
    finally {
        client.close();
    }
};

export default {
    getAllUsers,
    getUserById,
    addUser,
    editUserById,
    deleteUserById
};
