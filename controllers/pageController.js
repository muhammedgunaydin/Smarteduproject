const nodemailer = require("nodemailer");
const { countDocuments } = require("../models/Course");
const Course = require('../models/Course')
const User = require('../models/User')


exports.getIndexPage = async (req, res) => {

    const courses = await Course.find().sort('-createdAt').limit(2)
    const totalCourses = await Course.find().countDocuments()
    const totalStudents = await User.countDocuments({ role: 'student' })
    const totalTeachers = await User.countDocuments({ role: 'teacher' })

    res.status(200).render('index', {
        page_name: "index",
        courses,
        totalCourses,
        totalStudents,
        totalTeachers
    })
}

exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: "about"
    })
}

exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: "register"
    })
}

exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: "login"
    })
}

exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: "contact"
    })
}

exports.sendEmail = async (req, res) => {

    try {

        const outputMessage = console.log(req.body)

        req.flash("sucsess", "We received your message.")
        res.status(200).redirect('contact')
    }
    catch (err) {
        req.flash("error", "We cannot received your message.")
        res.status(200).redirect('contact')
    }

}