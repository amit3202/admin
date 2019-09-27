var users = require('../../models/admin/users');
var genhelper = require('../../helper/general');
module.exports = {
    index: (req, res) => {

        let data = {};
        if (req.session.renderData != undefined) {
            data = { ...req.session.renderData };
            delete (req.session.renderData);
        }

        res.render('admin/login', { layout: 'layouts/admin/loginLayout', data: data })

    },
    login: (req, res, next) => {

        let username = req.input('username');
        let password = req.input('password');

        (async () => {

            let query = { username, password };
            try {

                await users.find(query).exec((err, userResult) => {

                    if (err) {
                        throw new Error('Something went wrong, Try later')
                    } else {

                        if (userResult.length > 0) {

                            let userDoc = userResult[0];

                            if (userDoc.activation.status == 'inactive' || userDoc.activation.deleted_at != null) {

                                if (userDoc.activation.status == 'inactive') {

                                    let data = {
                                        loginError: true,
                                        msg: 'Account is still Inactive'
                                    }
        
                                    res.render('admin/login', { layout: 'layouts/admin/loginLayout', data: data })


                                } else if (userDoc.activation.deleted_at != null) {

                                    let data = {
                                        loginError: true,
                                        msg: 'Account deleted ! Contact Admin'
                                    }
        
                                    res.render('admin/login', { layout: 'layouts/admin/loginLayout', data: data })

                                }

                            }
                            else {

                                req.session.personal = userDoc.personal;
                                req.session.username = userDoc.username;
                                req.session.email = userDoc.email;
                                req.session.activate = userDoc.activation.status;

                                res.redirect(genhelper.siteURL('admin/dashboard'));
                            }


                        } else {

                            let data = {
                                loginError: true,
                                msg: 'Invalid Username or Password'
                            }

                            res.render('admin/login', { layout: 'layouts/admin/loginLayout', data: data })

                        }
                    }


                })

            } catch (error) {

                error.httpStatusCode = 500;
                next(error)

            }


        })()

    }
}