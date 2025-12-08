import { Op } from 'sequelize'
import { parseISO } from 'date-fns'
import * as Yup from 'yup'
import Role from '../models/Role.js'
import Permission from '../models/Permission.js'

class RolesController {

    //Controller para Consultar Rotas no Banco de Dados
    async index(req, res) {

        // Variáveis que serão utilizadas como parâmetros de consulta no Banco de Dados
        const {
            name,
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

        if (name) {
            where = {
                ...where,
                name: {
                    [Op.iLike]: `${name}%`, // O operador iLike é estilo Case Insensitive - não considera maiúsculas e minúsculas - Somente Postgres
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

        const role = await Role.findAll({
            where,

            include: [
                {
                    model: Permission,
                    attributes: ['name'],
                }
            ],

            order,
            limit,
            offset: limit * page - limit, //Exemplo: 25 * 10 -25 = 225
        })

        console.debug(`Method: ${req.method} :: URL: ${req.url}`)
        return res.json(role)
    }

    //Controller para Consultar uma permissão pelo id
    async show(req, res) {

        const id = req.params.id
        const role = await Role.findOne({
            where:
            {
                id,
            },

            include: [
                {
                    model: Permission,
                    attributes: ['name'],
                }
            ]
        })

        if (!role) {
            return res.status(404).json({ error: 'Role not found!' })
        }

        console.debug(`Method: ${req.method} :: URL: ${req.url}`)
        return res.json(role)


    }

    // Rota para criar um Customer no Banco de Dados
    async create(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
        })

        if (!(await (schema.isValid(req.body)))) {
            return res.status(400).json({ error: 'Error on validate Schema!' })
        }

        await Role.create(req.body)
        console.debug(`Method: ${req.method} :: URL: ${req.url}`)
        return res.status(201).json(req.body)

    }

    //Rota para alterar o cadastro de Permissões
    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            status: Yup.string().uppercase()
        })

        if (!(await (schema.isValid(req.body)))) {
            return res.status(400).json({ error: 'Error on validate Schema!' })
        }

        const role = await Role.findByPk(req.params.id)

        if (!role) {
            return res.status(404).json({ error: 'permission not found!' })
        }

        console.log(role)
        await role.update(req.body)

        console.debug(`Method: ${req.method} :: URL: ${req.url}`)
        return res.json(role)
    }

}

export default new RolesController()