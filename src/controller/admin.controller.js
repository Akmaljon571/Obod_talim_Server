import Teacher from "../model/teacher.js"
import jwt from 'jsonwebtoken'
import { verifyPassword } from "../utils/bcrypt.js"
import random from "../utils/random.js"
import sendMail from "../utils/nodemailer.js"
import Student from "../model/student.js"
import Guruh from "../model/guruh.js"

export const login = async (req, res) => {
    try {
        const { email, password } = req.result
        const admin_email = process.env.ADMIN_EMAIL
        const admin_password = process.env.ADMIN_PASSWORD

        if (admin_email === email && admin_password === password) {
            const code = random()
            await sendMail(email, code)
            return res.status(200).json({
                status: 200,
                message: "Code send Mail",
                data: { code, email, password, status: "admin" }
            })
        }
        const teacher = await Teacher.find()
        const find = teacher.find(e => e.email === email && verifyPassword(password, e.password))
        if (find) {
            const code = random()
            await sendMail(email, code)
            return res.status(200).json({
                status: 200,
                message: "Code send Mail",
                data: { code, email, password, status: "teacher" }
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: "Users Not Found"
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

export const loginCode = async (req, res) => {
    try {
        const data = req.result
        let find;
        if (data.status == 'admin') {
            find = { _id: "admin" }
        } else {
            find = await Teacher.findOne({ email: data.email })
        }
        console.log(find, data)
        const token = jwt.sign({ id: find._id, status: data.status }, process.env.SECRET_KEY)
        res.status(200).json({
            status: 200,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}

export const dashboardAdmin = async (req, res) => {
    try {
        const allTeacher = await Teacher.find()
        const allStudents = await Student.find()
        const allGuruh = await Guruh.find()

        const data = {
            groups: allGuruh.length,
            teachers: allTeacher.length,
            students: allStudents.length,
            ketgan: allStudents.filter(e => e.holati === 'ketgan').length
        }

        res.status(200).json({
            status: 200,
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}

export const dashboardTeacher = async (req, res) => {
    try {
        const { id } = req.teacher.value

        const allStudent = await Student.find()
        const allGuruh = await Guruh.find()
        const guruh = allGuruh.filter(e => e.teacher_id == id)
        let students
        for (let i = 0; i < guruh.length; i++) {
            students += allStudent.filter(e => e.guruh_id == guruh[i]._id).length
        }
        const data = {
            groups: guruh.length,
            students
        }
        res.status(200).json({
            status: 200,
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error!"
        })
    }
}
