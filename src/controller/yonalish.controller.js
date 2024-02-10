import Yonalish from "../model/yonalish.js"

const findOne = async (id, res) => {
    const all = await Yonalish.find()
    const find = all.find(e => e._id == id)
    if (!find) {
        res.status(404).json({
            status: 404,
            message: "Yo'nalish Not Found"
        })
        return ''
    }
    return find
}

export const yonalishGet = async (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            data: await Yonalish.find()
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}

export const yonalishCreate = async (req, res) => {
    try {
        const { title } = req.result
        await Yonalish.create({ title })
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


export const yonalishUpdate = async (req, res) => {
    try {
        const { title } = req.result
        const { id } = req.params
        const find = await findOne(id, res)
        if (title && find) {
            await Yonalish.updateOne({ _id: id }, {
                $set: { title }
            })
            res.status(200).json({
                status: 200,
                message: "Updated"
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

export const yonalishDelete = async (req, res) => {
    const find = await findOne(req.params.id, req)
    if (find) {
        await Yonalish.deleteOne({ _id: find._id })
        res.status(204).json({ status: 204 })
    }
}