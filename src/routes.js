import { Router } from 'express'
import permission from './app/controllers/permissionsController.js'
import role from './app/controllers/rolesController.js'
import permissionRole from './app/controllers/permissionsRolesController.js'
import department from './app/controllers/departmentsController.js'
import branch from './app/controllers/branchsController.js'
import company from './app/controllers/companiesController.js'
import employee from './app/controllers/employeesController.js'
import user from './app/controllers/usersController.js'

const routes = new Router()

// Rotas de acesso às permissões
routes.get('/permissions', permission.index)
routes.get('/permissions/:id', permission.show)
routes.post('/permissions', permission.create)
routes.put('/permissions/:id', permission.update)

// Rotas de acesso às permissões
routes.get('/roles', role.index)
routes.get('/roles/:id', role.show)
routes.post('/roles', role.create)
routes.put('/roles/:id', role.update)

//Rotas de Acesso às permissões dos usuários
routes.get('/permissionsRoles', permissionRole.index)
routes.get('/permissionsRoles/:id', permissionRole.show)
routes.post('/permissionsRoles', permissionRole.create)
routes.put('/permissionsRoles/:id', permissionRole.update)

//Rotas de Acesso às permissões dos Departamentos
routes.get('/departments', department.index)
routes.get('/departments/:id', department.show)
routes.post('/departments', department.create)
routes.put('/departments/:id', department.update)

//Rotas de Acesso aos Departamentos
routes.get('/branches', branch.index)
routes.get('/branches/:id', branch.show)
routes.post('/branches', branch.create)
routes.put('/branches/:id', branch.update)

//Rotas de Acesso às Empresas
routes.get('/companies', company.index)
routes.get('/companies/:id', company.show)
routes.post('/companies', company.create)
routes.put('/companies/:id', company.update)

//Rotas de Acesso às Funcionários
routes.get('/employees', employee.index)
routes.get('/employees/:id', employee.show)
routes.post('/employees', employee.create)
routes.put('/employees/:id', employee.update)

//Rotas de Acesso aos Usuários
routes.get('/users', user.index)
routes.get('/users/:id', user.show)
routes.post('/users', user.create)
routes.put('/users/:id', user.update)

export default routes