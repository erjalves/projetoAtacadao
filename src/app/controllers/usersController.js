import { Op } from 'sequelize'
import { parseISO } from 'date-fns'
import * as Yup from 'yup'
import Branch from '../models/Branch.js'
import Company from '../models/Company.js'
import Employee from '../models/Employee.js'
import Role from '../models/Role.js'
import Department from '../models/Department.js'
import User from '../models/User.js'

class UserController {

    //Controller para Consultar Rotas no Banco de Dados
    async index(req, res) {

        // Variáveis que serão utilizadas como parâmetros de consulta no Banco de Dados
        const {
            username,
            email,
            phone_number,
            status,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort
        } = req.query

        const page = req.query.page || 1 // Variável responsável por fazer a paginação
        const limit = req.query.limit || 25 // Variável por fazer o limite de itens por página
        let where = {}
        let order = []

        if (username) {
            where = {
                ...where,
                username: {
                    [Op.iLike]: `${username}%`, // O operador iLike é estilo Case Insensitive - não considera maiúsculas e minúsculas - Somente Postgres
                }
            }
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: `${email}`, // O operador iLike é estilo Case Insensitive - não considera maiúsculas e minúsculas - Somente Postgres
                }
            }
        }

        if (phone_number) {
            where = {
                ...where,
                phone_number: {
                    [Op.iLike]: `${phone_number}`, // O operador iLike é estilo Case Insensitive - não considera maiúsculas e minúsculas - Somente Postgres
                }
            }
        }

        if (status) {
            where = {
                ...where,
                status: {

                    [Op.iLike]: `${status}%`,
                }
            }
        }

        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    /* 
                        Como o Data vem como uma String, é necessário convertê-la para um objeto de data, para isso é necessário instalar a biblioteca date-fns
                     */
                    [Op.lte]: parseISO(createdBefore),// O operador gte -> great then or equal (maior ou igual)
                }
            }
        }

        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    /* 
                        Como o Data vem como uma String, é necessário convertê-la para um objeto de data, para isso é necessário instalar a biblioteca date-fns
                     */
                    [Op.gte]: parseISO(createdAfter),// O operador gte -> lower then or equal (menor ou igual)
                }
            }
        }

        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    /* 
                        Como o Data vem como uma String, é necessário convertê-la para um objeto de data, para isso é necessário instalar a biblioteca date-fns
                     */
                    [Op.lte]: parseISO(updatedBefore),// O operador gte -> great then or equal (maior ou igual)
                }
            }
        }

        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    /* 
                        Como o Data vem como uma String, é necessário convertê-la para um objeto de data, para isso é necessário instalar a biblioteca date-fns
                     */
                    [Op.gte]: parseISO(updatedBefore),// O operador gte -> lower then or equal (menor ou igual)
                }
            }
        }

        //Campos de ordenação/classificação
        if (sort) {
            order = sort.split(',').map(item => item.split(':'))
        }

        const user = await User.findAll({
            attributes: {exclude: ['password_hash','employeeId']},
            where,

            include: [
                {
                    model: Employee,
                    attributes: ['name'],

                    include: [
                        {
                            model: Branch
                        },

                        {
                            model: Company,
                            attributes: ['name'],
                        },
                        {
                            model: Role,
                            attributes: ['name'],
                        },

                        {
                            model: Department,
                            attributes: ['name'],
                        }
                    ]
                },

            ],

            order,
            limit,
            offset: limit * page - limit, //Exemplo: 25 * 10 -25 = 225
        })

        // Campo disponibilizado pelo Middleware de Autenticação
        console.log({user_id: req.user_id})

        // Mensagem de Debug - JSON.stringfy -> transforma um objeto em um json
        console.debug('GET :: /User/', JSON.stringify(user))

        return res.json(user)
    }

    //Controller para Consultar uma permissão pelo id
    async show(req, res) {

        const id = req.params.id
        const user = await User.findOne({
            attributes: {exclude: ['password_hash','employeeId']},
            where:
            {
                id,
            },

            include: [
                {
                    model: Employee,
                    attributes: ['name'],

                    include: [
                        {
                            model: Branch
                        },

                        {
                            model: Company,
                            attributes: ['name'],
                        },
                        {
                            model: Role,
                            attributes: ['name'],
                        },

                        {
                            model: Department,
                            attributes: ['name'],
                        }
                    ]
                },
            ]
        })

        if (!user) {
            return res.status(404).json({ error: 'user not found!' })
        }

        // Mensagem de Debug - JSON.stringfy -> transforma um objeto em um json
        console.debug('GET :: /User/:id', JSON.stringify(user))

        return res.json(user)


    }

    // Rota para criar um Customer no Banco de Dados
    async create(req, res) {

        const schema = Yup.object().shape({
            username: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
            profile_picture: Yup.string().required(),
            phone_number: Yup.string().required(),
            last_login: Yup.date().required(),
            employee_id: Yup.number().required(),
            password_confimation: Yup.string().when('password',(password,field)=>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        })

        if (!(await (schema.isValid(req.body)))) {
            return res.status(400).json({ error: 'Error on validate Schema!' })
        }

        await User.create(req.body)

        console.debug('POST :: /User/', JSON.stringify(req.body))
        return res.status(201).json(req.body)

    }

    //Rota para alterar o cadastro de Permissões
    async update(req, res) {

        const schema = Yup.object().shape({
            username: Yup.string(),
            email: Yup.string().email(),
            old_password: Yup.string().min(8),
            password: Yup.string().min(8).when('old_password',(old_password,field) =>
                old_password ? field.required(): field  
            ),
            profile_picture: Yup.string().required(),
            phone_number: Yup.string().required(),
            last_login: Yup.date().required(),
            employee_id: Yup.number().required(),
            password_confimation: Yup.string().when('password',(password,field)=>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        })

        if (!(await (schema.isValid(req.body)))) {
            return res.status(400).json({ error: 'Error on validate Schema!' })
        }

        const user = await User.findByPk(req.params.id)

        if (!user) {
            return res.status(404).json({ error: 'User not found!' })
        }


        const {old_password} = req.body

        if(old_password && !(await user.checkPasssword(old_password))){
            return res.status(401).json({message: 'User password not match'})
        }

        await user.update(req.body)

        console.debug('PUT :: /Users/', JSON.stringify(req.body))

        return res.json(user)
    }

}

export default new UserController()