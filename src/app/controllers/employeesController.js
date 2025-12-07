import {Op} from 'sequelize'
import { parseISO } from 'date-fns'
import * as Yup from 'yup'
import Branch from '../models/Branch.js'
import Company from '../models/Company.js'
import Employee from '../models/Employee.js'
import Role from '../models/Role.js'
import Department from '../models/Department.js'

class EmployeeController{

    //Controller para Consultar Rotas no Banco de Dados
    async index(req,res){

        // Variáveis que serão utilizadas como parâmetros de consulta no Banco de Dados
        const{
            registration_number,
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

        if(registration_number){
            where = {
                ...where,
                registration_number: {
                    [Op.iLike]: `${registration_number}`, // O operador iLike é estilo Case Insensitive - não considera maiúsculas e minúsculas - Somente Postgres
                }
            }
        }

        if(name){
            where = {
                ...where,
                name: {
                    [Op.iLike]: `${name}%`, // O operador iLike é estilo Case Insensitive - não considera maiúsculas e minúsculas - Somente Postgres
                }
            }
        }

        if(status){
            where = {
                ...where,
                status: {
                    
                    [Op.iLike]: `${status}%`,
                }
            }
        }

        if(createdBefore){
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

        if(createdAfter){
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

        if(updatedBefore){
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

        if(updatedAfter){
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
        if(sort){
            order = sort.split(',').map(item =>item.split(':'))
        }

        const employee  = await Employee.findAll({
            where,

            include: [
                {
                    model: Branch,
                    attributes: ['name'],
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
            ],

            order,
            limit,
            offset: limit * page - limit, //Exemplo: 25 * 10 -25 = 225
        })

        // Mensagem de Debug - JSON.stringfy -> transforma um objeto em um json
        console.debug('GET :: /Employee/', JSON.stringify(employee))

        return res.json(employee)
    }

    //Controller para Consultar uma permissão pelo id
    async show(req,res){

        const id = req.params.id
        const employee = await Employee.findOne({
            where:
            { 
                id,
            },

            include: [
                {
                    model: Branch,
                    attributes: ['name'],
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
        })

        if(!employee){
            return res.status(404).json({error: 'Employee not found!'})
        }

        // Mensagem de Debug - JSON.stringfy -> transforma um objeto em um json
        console.debug('GET :: /Employee/:id', JSON.stringify(employee))

        return res.json(employee) 


    }

    // Rota para criar um Customer no Banco de Dados
    async create(req,res){
        
        const schema = Yup.object().shape({
            registration_number: Yup.string().required(),
            name: Yup.string().required(),
            company_id: Yup.number().required(),
            role_id: Yup.number().required(),
            branch_id: Yup.number().required(),
            department_id: Yup.number().required(),
        })

        if(!(await (schema.isValid(req.body)))){
            return res.status(400).json({error: 'Error on validate Schema!'})
        }

        await Employee.create(req.body)
        console.debug('POST :: /Employee/', JSON.stringify(req.body))
        return res.status(201).json(req.body)
 
    }

    //Rota para alterar o cadastro de Permissões
    async update(req,res){
        
        const schema = Yup.object().shape({
            registration_number: Yup.string(),
            name: Yup.string(),
            company_id: Yup.number(),
            role_id: Yup.number(),
            branch_id: Yup.number(),
            department_id: Yup.number(),
            status: Yup.string()
        })

        if(!(await (schema.isValid(req.body)))){
            return res.status(400).json({error: 'Error on validate Schema!'})
        }

        const employee = await Employee.findByPk(req.params.id)

        if(!employee){
            return res.status(404).json({error: 'Employee not found!'})
        }

        console.log(employee)
        await employee.update(req.body)

        console.debug('PUT :: /Employeees/', JSON.stringify(req.body))

        return res.json(employee) 
    }

}

export default new EmployeeController()