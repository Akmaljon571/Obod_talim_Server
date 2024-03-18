import Message from "../model/sms.js"
import Student from "../model/student.js"
import Teacher from "../model/teacher.js"
import SMS from "../utils/sms.js"

export const smsCreate = async (req, res) => {
    try {
        const { send_id, desc, status } = req.result
        if (status == 'teacher') {
            const teacher = await Teacher.find()
            const one = teacher.find(e => e._id == send_id)
            if (one) {
                await SMS.send({ phone: one.raqam, message: desc })
                await Message.create({
                    send_id,
                    desc,
                    status,
                })
                res.status(201).json({
                    status: 201,
                    message: "Created"
                })
            } else {
                return res.status(404).json({
                    message: "teacher Not Found",
                    status: 404
                })
            }
        } else {
            const student = await Student.find()
            const one = student.find(e => e._id == send_id)
            if (one) {
                await SMS.send({ phone: one.raqam, message: desc })
                await Message.create({
                    send_id,
                    desc,
                    status,
                })
                res.status(201).json({
                    status: 201,
                    message: "Created"
                })
            } else {
                return res.status(404).json({
                    message: "teacher Not Found",
                    status: 404
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}

export const smsTeacher = async (req, res) => {
    try {
        const { id } = req.teacher

        const all = await Message.find()
        return res.status(200).json({
            status: 200,
            data: all.filter(e => e.send_id == id && e.status == 'teacher')
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}
