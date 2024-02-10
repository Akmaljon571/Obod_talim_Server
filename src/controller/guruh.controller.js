import Guruh from '../model/guruh.js'
import Teacher from '../model/teacher.js'

export const findOne = async (req, res) => {
    const all = await Guruh.find()
    const find = all.find(e => e._id == req.params.id)
    if (!find) {
        res.status(404).json({
            status: 404,
            message: "Guruh Not Found"
        })
        return ''
    }
    return res.json(find)
}

export const guruhCreate = async (req, res) => {
    try {
        const body = req.result

        await Guruh.create(body)
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

export const guruhAll = async (req, res) => {
    try {
        const all = await Guruh.find()
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || all.length;
        const search = req.query.search || '';

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        res.status(200).json({
            status: 200,
            data: all.filter(e => e.title.toLowerCase().includes(search.toLowerCase())).slice(startIndex, endIndex),
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

export const guruhTeacher = async (req, res) => {
    try {
        const { teacher_id } = req.params
        const teachers = await Teacher.find()
        const guruhs = await Guruh.find()

        res.status(200).json({
            status: 200,
            guruh: guruhs.filter(e => e.teacher_id == teacher_id),
            teacher: teachers.filter(e => e._id == teacher_id),
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}

export const guruhUpdate = async (req, res) => {
    try {
        const body = req.result
        const all = await Guruh.find()
        const one = all.find(e => e._id == req.params.id)
        if (one) {
            await Guruh.updateOne({ _id: one._id }, {
                $set: {
                    title: body.title || one.title,
                    sequence: body.sequence || one.sequence,
                    kun: body.kun || one.kun,
                    soat: body.soat || one.soat,
                    teacher_id: body.teacher_id || one.teacher_id,
                }
            })
            res.status(200).json({
                status: 200,
                message: "Guruh updated successfully"
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

export const guruhDelete = async (req, res) => {
    try {
        await Guruh.deleteOne({ _id: req.params.id })
        res.status(204).json({ status: 204 })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}
