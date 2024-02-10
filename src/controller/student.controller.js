import Student from '../model/student.js'
import { createHash } from '../utils/bcrypt.js'
import remove_img from '../utils/remove_img.js'

const findOne = async (id, res, filename = '') => {
    const all = await Student.find()
    const find = all.find(e => e._id == id)
    if (!find) {
        filename && remove_img(one.logo)
        res.status(404).json({
            status: 404,
            message: "Student Not Found"
        })
        return ''
    }
    return find 
}

export const studentCreate = async (req, res) => {
    try {
        const { username,familiya, email, kocha, uy, jsh, tugilgan_sana, otasini_ismi, jinsi, raqam, guruh_id, holati } = req.result
        if (!req.filename) {
            return res.status(401).json({
                status: 401,
                message: "Image is required"
            })
        }

        await Student.create({
            username,
            familiya,
            email,
            image: req.filename,
            kocha,
            uy,
            jsh,
            tugilgan_sana,
            otasini_ismi,
            jinsi,
            raqam,
            guruh_id,
            holati
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

export const studentAll = async (req, res) => {
    try {
        const all = await Student.find()
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

export const studentGuruh = async (req, res) => {
    try {
        const all = await Student.find()
        const { id } = req.params

        res.status(200).json({
            status: 200,
            data: all.filter(e => e.guruh_id == id),
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}

export const studentOne = async (req, res) => {
    try {
        const all = await Student.find()
        const { id } = req.params

        res.status(200).json({
            status: 200,
            data: all.find(e => e._id == id),
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}

export const studentUpdate = async (req, res) => {
    try {
        const body = req.result
        const { filename } = req
        const one = await findOne(req.params.id, res, filename)
        if (one) {
            filename && remove_img(one.logo)
            await Student.updateOne({ _id: one._id }, {
                $set: {
                    username: body.username || one.username,
                    familiya: body.familiya || one.familiya,
                    email: body.email || one.email,
                    // password: createHash(body.password) || one.password,
                    image: filename || one.image,
                    kocha: body.kocha || one.kocha,
                    uy: body.uy || one.uy,
                    jsh: body.jsh || one.jsh,
                    tugilgan_sana: body.tugilgan_sana || one.tugilgan_sana,
                    otasini_ismi: body.otasini_ismi || one.otasini_ismi,
                    yonalish_id: body.yonalish_id || one.yonalish_id,
                    jinsi: body.jinsi || one.jinsi,
                    raqam: body.raqam || one.raqam,
                    guruh_id: body.guruh_id || one.guruh_id,
                    holati: body.holati || one.holati,
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

export const studentDelete = async (req, res) => {
    try {
        const one = await findOne(req.params.id, res)
        if (one) {
            remove_img(one.logo)
            await Student.deleteOne({ _id: req.params.id })
            res.status(204).json({ status: 204 })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}
