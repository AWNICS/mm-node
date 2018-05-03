import express from 'express';
import RoleService from './role.service';
import log from '../../config/log4js.config';

var router = express.Router();
var roleService = new RoleService();

/**
 * @swagger
 * definitions:
 *   Privilege:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 */
/**
 * @swagger
 * /privileges:
 *   post:
 *     tags:
 *       - Privilege
 *     description: Creates a privilege in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: privilege
 *         description: Privilege object 
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Privilege'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/privileges', function(req, res) {
    var privilege = req.body;
    roleService.createPrivilege(privilege, (result) => {
        res.send(result);
    });
})

/**
 * @swagger
 * /privileges:
 *   get:
 *     tags:
 *       - Privilege
 *     description: Returns all privilege from MySql
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of privileges from MySql
 *         schema:
 *           $ref: '#/definitions/Privilege'
 */
router.get('/privileges', function(req, res) {
    roleService.getAllPrivilege((result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /privileges/{id}:
 *   get:
 *     tags:
 *       - Privilege
 *     description: Returns privilege by id from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for privilege to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Privilege'
 *     responses:
 *       200:
 *         description: A privilege return from MySql
 */
router.get('/privileges/:id', function(req, res) {
    var id = req.params.id;
    roleService.getByIdPrivilege(id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /privileges:
 *   put:
 *     tags:
 *       - Privilege
 *     description: Updates privilege in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Privilege data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Privilege'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/privileges', function(req, res) {
    var privilege = req.body;
    roleService.updatePrivilege(privilege, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /privileges/{id}:
 *   delete:
 *     tags:
 *       - Privilege
 *     description: Deletes privilege from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: privilege's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/privileges/:id', function(req, res) {
    var id = req.params.id;
    roleService.deletePrivilege(id, (result) => {
        res.send('Number of Privilege deleted: ' + result);
    });
});

/**
 * @swagger
 * definitions:
 *   RolePrivilege:
 *     properties:
 *       id:
 *         type: integer
 *       roleId:
 *         type: integer
 *       privilegeId:
 *         type: integer
 */
/**
 * @swagger
 * /rolePrivileges:
 *   post:
 *     tags:
 *       - RolePrivilege
 *     description: Creates a Role Privilege in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: RolePrivilege object 
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RolePrivilege'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/rolePrivileges', function(req, res) {
    var rolePrivilege = req.body;
    roleService.createRolePrivilege(rolePrivilege, (result) => {
        res.send(result);
    });
})

/**
 * @swagger
 * /rolePrivileges:
 *   get:
 *     tags:
 *       - RolePrivileges
 *     description: Returns all role privileges from MySql
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of role privileges from MySql
 *         schema:
 *           $ref: '#/definitions/RolePrivileges'
 */
router.get('/rolePrivileges', function(req, res) {
    roleService.getAllRolePrivilege((result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /rolePrivileges/{id}:
 *   get:
 *     tags:
 *       - RolePrivilege
 *     description: Returns role privilege by id from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for role privilege to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/RolePrivilege'
 *     responses:
 *       200:
 *         description: A role privilege return from MySql
 */
router.get('/rolePrivileges/:id', function(req, res) {
    var id = req.params.id;
    roleService.getByIdRolePrivilege(id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /rolePrivileges:
 *   put:
 *     tags:
 *       - RolePrivilege
 *     description: Updates role privilege in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: role Privilege data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RolePrivilege'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/rolePrivileges', function(req, res) {
    var rolePrivilege = req.body;
    roleService.updateRolePrivilege(rolePrivilege, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /rolePrivileges/{id}:
 *   delete:
 *     tags:
 *       - RolePrivilege
 *     description: Deletes role privilege from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: role privilege's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/rolePrivileges/:id', function(req, res) {
    var id = req.params.id;
    roleService.deleteRolePrivilege(id, (result) => {
        res.send('Number of RolePrivilege deleted: ' + result);
    });
});

/**
 * @swagger
 * definitions:
 *   Role:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       description:
 *         type: string
 */
/**
 * @swagger
 * /roles:
 *   post:
 *     tags:
 *       - Role
 *     description: Creates a Role in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Role object 
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Role'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/roles', function(req, res) {
    const role = req.body;
    roleService.createRole(role, (result) => {
        res.send(result);
    });
})

/**
 * @swagger
 * /roles:
 *   get:
 *     tags:
 *       - Role
 *     description: Returns all role from MySql
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of role from MySql
 *         schema:
 *           $ref: '#/definitions/Role'
 */
router.get('/roles', function(req, res) {
    roleService.getAllRole((result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     tags:
 *       - Role
 *     description: Returns role by id from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for role to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Role'
 *     responses:
 *       200:
 *         description: A role return from MySql
 */
router.get('/roles/:id', function(req, res) {
    var id = req.params.id;
    roleService.getByIdRole(id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /roles:
 *   put:
 *     tags:
 *       - Role
 *     description: Updates role in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: role data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Role'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/roles', function(req, res) {
    var role = req.body;
    roleService.updateRole(role, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     tags:
 *       - Role
 *     description: Deletes role from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: role's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/roles/:id', function(req, res) {
    var id = req.params.id;
    roleService.deleteRole(id, (result) => {
        res.send('Number of Role deleted: ' + result);
    });
});

/**
 * @swagger
 * definitions:
 *   UserRole:
 *     properties:
 *       id:
 *         type: integer
 *       userId:
 *         type: integer
 *       roleId:
 *         type: integer
 */
/**
 * @swagger
 * /userRoles:
 *   post:
 *     tags:
 *       - UserRole
 *     description: Creates a User Role in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: User Role object 
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserRole'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/userRoles', function(req, res) {
    var userRole = req.body;
    roleService.createUserRole(userRole, (result) => {
        res.send(result);
    });
})

/**
 * @swagger
 * /userRoles:
 *   get:
 *     tags:
 *       - UserRole
 *     description: Returns all user role from MySql
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of user role from MySql
 *         schema:
 *           $ref: '#/definitions/UserRole'
 */
router.get('/userRoles', function(req, res) {
    roleService.getAllUserRole((result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /userRoles/{id}:
 *   get:
 *     tags:
 *       - UserRole
 *     description: Returns user role by id from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for user role to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/UserRole'
 *     responses:
 *       200:
 *         description: A user role return from MySql
 */
router.get('/userRoles/:id', function(req, res) {
    var id = req.params.id;
    roleService.getByIdUserRole(id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /userRoles:
 *   put:
 *     tags:
 *       - UserRole
 *     description: Updates user role in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: user role data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserRole'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/userRoles', function(req, res) {
    var userRole = req.body;
    roleService.updateUserRole(userRole, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /userRoles/{id}:
 *   delete:
 *     tags:
 *       - UserRole
 *     description: Deletes user role from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user role's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/userRoles/:id', function(req, res) {
    var id = req.params.id;
    roleService.deleteUserRole(id, (result) => {
        res.send('Number of UserRole deleted: ' + result);
    });
});

module.exports = router;