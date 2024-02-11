import remove_img from '../utils/remove_img.js'
import Teacher from "../model/teacher.js"
import { createHash } from "../utils/bcrypt.js"

export const findOne = async (req, res) => {
    const all = await Teacher.find()
    const find = all.find(e => e._id == req.params.id)
    if (!find) {
        res.status(404).json({
            status: 404,
            message: "Teacher Not Found"
        })
        return ''
    }
    return res.json(find)
}

export const teacherCreate = async (req, res) => {
    try {
        const { username, familiya, email, password, kocha, uy, jsh, tugilgan_sana, otasini_ismi, yonalish_id, jinsi, raqam, izoh } = req.result
        if (!req.filename) {
            return res.status(401).json({
                status: 401,
                message: "Image is required"
            })
        }

        await Teacher.create({
            username,
            familiya,
            email,
            password: await createHash(password),
            image: req.filename,
            kocha,
            uy,
            jsh,
            tugilgan_sana,
            otasini_ismi,
            yonalish_id,
            jinsi,
            raqam,
            izoh,
        })
        res.status(201).json({
            status: 201,
            message: "Created"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}

export const teacherAll = async (req, res) => {
    try {
        const all = await Teacher.find()
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || all.length;
        const search = req.query.search || '';

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        res.status(200).json({
            status: 200,
            data: all.filter(e => e.username.toLowerCase().includes(search.toLowerCase())).slice(startIndex, endIndex),
            length: all.length,
            page,
            pageSize,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}

export const teacherToken = async (req, res) => {
    try {
        const { id } = req.teacher
        const all = await Teacher.find()
        const one = all.find(e => e._id == id)
        res.status(200).json({
            status: 200,
            data: one
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}

export const teacherUpdate = async (req, res) => {
    try {
        const body = req.result
        const { filename } = req
        const all = await Teacher.find()
        const one = all.find(e => e._id == req.params.id)
        if (one) {
            filename && remove_img(one.image)
            await Teacher.updateOne({ _id: one._id }, {
                $set: {
                    username: body.username || one.username,
                    familiya: body.familiya || one.familiya,
                    email: body.email || one.email,
                    password: body.password ? await createHash(body.password) : one.password,
                    image: filename || one.image,
                    kocha: body.kocha || one.kocha,
                    uy: body.uy || one.uy,
                    jsh: body.jsh || one.jsh,
                    tugilgan_sana: body.tugilgan_sana || one.tugilgan_sana,
                    otasini_ismi: body.otasini_ismi || one.otasini_ismi,
                    yonalish_id: body.yonalish_id || one.yonalish_id,
                    jinsi: body.jinsi || one.jinsi,
                    raqam: body.raqam || one.raqam,
                    izoh: body.izoh || one.izoh,
                }
            })
            res.status(200).json({
                status: 200,
                message: "Teacher updated successfully"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}

export const teacherDelete = async (req, res) => {
    try {
        await Teacher.deleteOne({ _id: req.params.id })
        res.status(204).json({ status: 204 })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}
