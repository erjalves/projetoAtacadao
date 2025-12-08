import { Op } from 'sequelize'
import { parseISO } from 'date-fns'
import * as Yup from 'yup'
import Branch from '../models/Branch.js'
import Company from '../models/Company.js'

class CompanyController {

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

        const company = await Company.findAll({
            where,

            include: [
                {
                    model: Branch,
                    attributes: ['name'],
                }
            ],

            order,
            limit,
            offset: limit * page - limit, //Exemplo: 25 * 10 -25 = 225
        })

        console.debug(`Method: ${req.method} :: URL: ${req.url}`)
        return res.json(company)
    }

    //Controller para Consultar uma permissão pelo id
    async show(req, res) {

        const id = req.params.id
        const company = await Company.findOne({
            where:
            {
                id,
            },

            include: [
                {
                    model: Branch,
                    attributes: ['name'],
                }
            ]
        })

        if (!company) {
            return res.status(404).json({ error: 'Company not found!' })
        }

        console.debug(`Method: ${req.method} :: URL: ${req.url}`)
        return res.json(company)
    }

    // Rota para criar um Customer no Banco de Dados
    async create(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            branch_id: Yup.number().required(),
        })

        if (!(await (schema.isValid(req.body)))) {
            return res.status(400).json({ error: 'Error on validate Schema!' })
        }

        await Company.create(req.body)
        console.debug(`Method: ${req.method} :: URL: ${req.url}`)
        return res.status(201).json(req.body)

    }

    //Rota para alterar o cadastro de Permissões
    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            cod: Yup.string(),
            status: Yup.string().uppercase()
        })

        if (!(await (schema.isValid(req.body)))) {
            return res.status(400).json({ error: 'Error on validate Schema!' })
        }

        const branch = await Branch.findByPk(req.params.id)

        if (!branch) {
            return res.status(404).json({ error: 'Branch not found!' })
        }

        await branch.update(req.body)

        console.debug(`Method: ${req.method} :: URL: ${req.url}`)
        return res.json(branch)
    }

}

export default new CompanyController()