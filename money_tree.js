var mysql = require('mysql');
var express = require('express');
var app = express();
var randomstring = require("randomstring");
var moment = require('moment');
var changeCase = require('change-case')
var now = moment();
var sellArr = [];
var buyArr = [];

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
    .listen(8081, function () {
        console.log("Money Tree Server Started ..............");
    });

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var conn = function () {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    return connection;
}

app.get('/getId/:tempID', function (req, res) {
    var connection = conn();
    connection.connect();
    connection.query('SELECT * from user where 1', function (err, rows, fields) {
        if (!err) {
            console.log("Retrieving Users!!");
            console.log('The solution is: ', rows);
            for (var i = 0; i < rows.length; i++) {
                if (req.params.tempID == rows[i].sessionId) {
                    return res.json({ status: 'true', message: [{ data: rows[i].user_id }] });
                } else {
                    return res.json({ status: 'false', message: [{ data: "Token is wrong please login again" }] });
                }
            }
        }
        else
            console.log('Error while performing Query.');
    });
    connection.end();
});

app.get('/', function (req, res) {
    console.log("In Working Conditions ..........");
    retJson = [{ status: 'true', message: [{ data: "working" }] }];
    return res.status(200).json(retJson);
})
app.post('/login', function (req, res) {
    ;
    var tkn;
    var body = req.body;
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });


    var retJson = [];

    pool.getConnection(function (err, connection) {
        connection.query("SELECT * from user where 1", function (err, rows, fields) {
            if (!err) {
                console.log("Retrieving Users");
                for (var i = 0; i < rows.length; i++) {
                    if (req.body.id == rows[i].user_id && req.body.password == rows[i].password && req.body.access == rows[i].access) {
                        tkn = randomstring.generate();
                        connection.query("UPDATE user SET sessionId = '" + tkn + "' WHERE user_id = '" + req.body.id + "';", function (err) {
                            if (!err) {
                                var access_level = req.body.access;
                                var table;
                                if (access_level == "PM") {
                                    table = "portfolio_manager";
                                }
                                else if (access_level == "ET") {
                                    table = "equity_trader";
                                }
                                else if (access_level == "Broker") {
                                    table = "broker";
                                }
                                else {
                                    console.log("No such entry found");
                                }
                                retJson = [{ acess: table, status: 'true', message: [{ data: tkn }] }];
                                connection.query("SELECT * from " + table + " where 1;", function (err, rows, fields) {
                                    if (!err) {
                                        for (var i = 0; i < rows.length; i++) {
                                            if (req.body.id == rows[i].id) {
                                                console.log("USer Id : " + rows[i].id + "Logged Into the System with sessionkey " + tkn);
                                                retJson[0].message.push(rows[i]);
                                            }
                                        }
                                        return res.status(200).json(retJson);
                                    }
                                    else {
                                        console.log(err.message + " Not Able to Login");
                                        retJson[0].message.push(err.message);
                                        res.status(404).json(retJson);
                                    }
                                });
                            } else {
                                console.log(err.message);
                            }
                            connection.release();
                        });
                    }
                }
            }
            else
                console.log('Error while performing Query.');
        });
    });
});

app.post('/giveOrder/:tempID', function (req, res) {
    var body = req.body;
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });

    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            var formatted = now.format('YYYY-MM-DD HH:mm:ss')
            for (var i = 0; i < rows.length; i++) {
                if (req.params.tempID == rows[i].sessionId) {
                    console.log(req.params.tempID + " is giving Order with UserID " + rows[i].user_id);
                    var tkn = randomstring.generate(10);
                    var post = {
                        id: tkn,
                        pm_id: rows[i].user_id,
                        et_id: body.et_id,
                        share_id: body.share_id,
                        limit_price: body.limit_price,
                        current_price: body.current_price,
                        side: body.side,
                        status: 'open',
                        open_quantity: '1000',
                        allocated_quantity: '0',
                        stop_price: body.stop_price,
                        total_quantity: body.total_quantity,
                        timestamp: formatted
                    };
                    connection.query("INSERT INTO money_tree.order VALUES ('" + tkn + "' , '" + rows[i].user_id +
                        "', '" + body.et_id + "' , '" + body.share_id + "', '" + body.side + "', 'open', '1000', '0', '" + formatted + "','" + body.limit_price
                        + "', '" + body.current_price + "','"
                        + body.stop_price + "','" + body.total_quantity + "');", function (err, rows, fields) {
                            if (!err) {

                                console.log("Following Order is being generated with Order Id : " + tkn);
                                console.log("The details are : ");
                                console.log(post);
                                return res.status(200).json({ status: 'true ', message: [{ orderID: tkn }] });
                            } else {
                                console.log(err.message);
                                return res.status(404).json({ status: 'true ', message: [{ error: err.message }] });
                            }
                            connection.release();
                        })
                }
            }
        });
    });
});

app.get("/logout/:tempID", function (req, res) {
    var connection = conn();
    connection.connect();
    connection.query("UPDATE user SET sessionId='0' WHERE sessionId='" + req.params.tempID + "';", function (err, rows, fields) {
        console.log("User Logged Out with Session Id : " + req.params.tempID);
        var retJson = [{ status: 'true', message: [{ data: "Successfully LOGED OUT!!" }] }];
        return res.json(retJson);
    });
    conn().end();
});

app.get('/searchShares/:id', function (req, res) {
    var newId = changeCase.upperCase(req.params.id);
    var connection = conn();
    connection.connect();
    connection.query("SELECT * FROM shares WHERE 1", function (err, rows, fields) {
        if (!err) {
            var retArr = [];
            for (var j = 0; j < rows.length; j++) {
                if (rows[j].share_name.indexOf(newId) > -1) {
                    retArr.push(rows[j]);
                }
            }
            return res.json(retArr);
        }
        else
            console.log('Error while performing Query.');
    });
    connection.end();
});

app.get('/getTraders', function (req, res) {
    var connection = conn();
    connection.connect();
    connection.query("SELECT * FROM equity_trader WHERE 1", function (err, rows, fields) {
        var retJson = [];
        if (!err) {
            for (var e = 0; e < rows.length; e++) {
                retJson.push(rows[e]);
            }
            return res.json(retJson);
        } else {
            console.log(err.message);
        }
        connection.end();
    });
});

app.get('/getPortfolioManager', function (req, res) {
    var connection = conn();
    connection.connect();
    connection.query("SELECT * FROM portfolio_manager WHERE 1", function (err, rows, fields) {
        var retJson = [];
        if (!err) {
            for (var e = 0; e < rows.length; e++) {
                retJson.push(rows[e]);
            }
            return res.json(retJson);
        } else {
            console.log("Error");
        }
        connection.end();
    });
});

app.get('/getPMOrderHistory/:tempID/:id', function (req, res) {
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });

    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].sessionId == req.params.tempID) {
                    console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId + " retreieving his Order History Page Information");
                    var query = "SELECT * FROM HISTORY as H, shares as S WHERE  S.id = H.share_id AND H.pm_id='" + rows[i].user_id + "' AND  H.et_id ='" + req.params.id + "';";
                    connection.query(query, function (err, rows, fields) {
                        if (!err) {
                            for (var j = 0; j < rows.length; j++)
                                retJson.message.push(rows[j]);
                        } else {
                            console.log(err.message);
                        }
                        return res.json(retJson);
                        connection.release();
                    });
                }
            }
        });
    });
});


app.get('/getETPendingOrderHistory/:tempID/:id', function (req, res) {
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });

    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].sessionId == req.params.tempID) {
                    /// console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId + " retreieving his Pending Order History Page Information");
                    var query = "SELECT * FROM money_tree.order as H, shares as S WHERE  S.id = H.share_id AND H.et_id='" + rows[i].user_id + "' AND  H.pm_id ='" + req.params.id + "';";
                    //  console.log(query)
                    connection.query(query, function (err, rows, fields) {
                        if (!err) {
                            console.log(rows)
                            for (var j = 0; j < rows.length; j++)
                                retJson.message.push(rows[j]);
                        } else {
                            console.log(err.message);
                        }
                        return res.json(retJson);
                        connection.release();
                    });
                }
            }
        });
    });
});

app.get('/getETOrderHistory/:tempID/:id', function (req, res) {
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    console.log("1");
    var retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        console.log("2");
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            console.log("3");
            console.log(rows[0]);
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].sessionId == req.params.tempID) {
                    console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId + " retreieving his Order History Page Information");
                    var query = "SELECT * FROM HISTORY as H, shares as S WHERE  S.id = H.share_id AND H.et_id='" + rows[i].user_id + "' AND  H.pm_id ='" + req.params.id + "';"
                    console.log(query);
                    connection.query(query, function (err, rows, fields) {
                        if (!err) {
                            for (var j = 0; j < rows.length; j++) {
                                retJson.message[j] = rows[j];
                                console.log(retJson.message[j]);
                            }
                        } else {
                            console.log(err.message);
                        }
                        return res.json(retJson);
                        connection.release();
                    });
                }
            }
        });
    });
});


app.get('/getDrafts/:tempID', function (req, res) {
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });


    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].sessionId == req.params.tempID) {
                        console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId + " retreieving his Draft History Page Information");
                        connection.query("SELECT * FROM DRAFT as D, shares as S WHERE S.id=D.share_id AND pm_id='" + rows[i].user_id + "';", function (err, rows, fields) {
                            if (!err) {
                                for (var j = 0; j < rows.length; j++)
                                    retJson.message.push(rows[j]);
                            } else {
                                console.log(err.message)
                            }

                            connection.release();
                            return res.json(retJson);
                        });
                    }
                }
            }
        });
    });
});

app.post('/saveDraft/:tempID', function (req, res) {
    var body = req.body;
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    var formatted = now.format('YYYY-MM-DD HH:mm:ss')
    retJson = [{ status: 'true', message: [] }];
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].sessionId == req.params.tempID) {
                        console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId);
                        var tkn = randomstring.generate(10);
                        connection.query("INSERT INTO draft VALUES('" + body.quantity + "','" + body.share_id + "' , '" + rows[i].user_id + "' ,'" + formatted + "' , '" + body.price + "','" + tkn + "');", function (err, rows, fields) {
                            if (!err) {
                                console.log("Saving his draft with Draft Id : " + tkn);
                                retJson[0].message[0] = { data: tkn }
                                return res.json(retJson);
                            } else {
                                console.log(err.message);
                            }
                            connection.release();
                        })
                    }
                }
            } else {
                retJson[0].message[0] = { data: err.message };
            }
        });
    });
});

app.post('/delDraft/:tempID', function (req, res) {
    var body = req.body;
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    var id;
    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {

        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {

            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].sessionId == req.params.tempID) {
                        id = rows[i].user_id;
                        connection.query("DELETE FROM draft WHERE id='" + body.id + "';", function (err, rows, fields) {
                            if (!err) {
                                connection.query("SELECT * FROM draft WHERE 1", function (err, rows, fields) {
                                    if (!err) {
                                        console.log("User with User Id : " + id + " and Session Key : " + req.params.tempID + " has deleted a draft with Draft Id : " + body.id);
                                        for (var j = 0; j < rows.length; j++)
                                            retJson.message.push(rows[j]);
                                        return res.json(retJson);
                                    } else {
                                        console.log(err.message);
                                    }
                                    connection.relase();
                                })

                            } else {
                                console.log(err.message);
                            }
                        })
                    }
                }
            }
            else {
                retJson[0].message[0] = { data: err.message };
                return res.json(retJson);
            }
        });
    });
});

app.get("/getDraftID/:tempID/:draftId", function (req, res) {
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].sessionId == req.params.tempID) {
                        console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId + " retreieving his Draft History Page Information");
                        connection.query("SELECT * FROM draft WHERE id='" + req.params.draftId + "';", function (err, rows, fields) {
                            if (!err) {
                                for (var j = 0; j < rows.length; j++)
                                    retJson.message.push(rows[j]);
                                return res.json(retJson);
                            } else {
                                console.log(err.message);
                            }
                            connection.relase();
                        })
                    }
                }
            } else {
                retJson[0].message[0] = { data: err.message };
                return res.json(retJson);
            }
        });
    });
})

app.put("/editDraft/:tempID", function (req, res) {
    var body = req.body;
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].sessionId == req.params.tempID) {
                        connection.query("UPDATE draft SET quantity='" + body.quantity + "' WHERE id='" + body.id + "';", function (err, rows, fields) {
                            if (!err) {
                                connection.query("SELECT * FROM draft WHERE id='" + body.id + "';", function (err, rows, fields) {
                                    if (!err) {
                                        console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId + " editing Draft with Id : " + body.id);
                                        for (var j = 0; j < rows.length; j++)
                                            retJson.message.push(rows[j]);
                                        return res.json(retJson);
                                    }
                                })
                            } else {
                                console.log(errr.message);
                            }
                            connection.relase();
                        })
                    }
                }
            } else {
                retJson[0].message[0] = { data: err.message };
                return res.json(retJson);
            }
        });
    });
});

app.post('/buildBlocks/:tempID', function (req, res) {
    var body = req.body;
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    var quant = [];
    var formatted = now.format('YYYY-MM-DD HH:mm:ss')
    var tkn;
    var id;
    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].sessionId == req.params.tempID) {
                        console.log("User with User Id : " + rows[i].user_id + " and session Key : " + rows[i].sessionId + " has made a request to create Blocks of Order : " + body.id);
                        id = rows[i].user_id;
                        var q = "SELECT * FROM money_tree.order WHERE id='" + body.id + "';";
                        connection.query(q, function (err, rows, fields) {
                            var number;
                            if (rows[0].total_quantity > 100) {
                                number = rows[0].total_quantity / 100;
                                var x = rows[0].total_quantity % 100;
                                for (var a = 0; a < number - 1; a++) {
                                    quant.push(100);
                                }
                                if (x != 0) {
                                    quant.push(x);

                                }
                            } else {
                                number = 1;
                                quant.push(rows[0].total_quantity);
                            }
                            for (var k = 0; k < number; k++) {
                                tkn = randomstring.generate(10);
                                console.log("Block created with Block Id : " + tkn + " and Quantity : " + quant[k]);
                                retJson.message.push({ "bid": tkn, "qunatity": quant[k] });
                                var query = "INSERT INTO block VALUES('" + tkn + "','" + id + "','MT_BR001','" + quant[k] + "','" + rows[0].side + "','NSE','open','0','" + quant[k] + "','" + formatted + "','" + parseInt(rows[0].current_price) * quant[k] + "' ,'" + rows[0].share_id + "');";
                                connection.query(query, function (err, rows, fields) {
                                    if (!err) {

                                    } else {
                                        console.log(err.message);
                                    }
                                    connection.release();
                                });
                            }
                            return res.json(retJson);
                        });
                        break;
                    }
                }
            } else {
                retJson[0].message[0] = { data: err.message };
                return res.json(retJson);
            }
        });
    });
});
app.get('/getExecutedOrders/:tempID', function (req, res) {

    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    var id;
    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].sessionId == req.params.tempID) {
                        console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId + " retreieving his Executed Order History Page Information");
                        var query = "SELECT * FROM HISTORY AS H, shares AS S WHERE S.id = H.share_id AND H.pm_id='" + rows[i].user_id + "';";
                        connection.query(query, function (err, rows, fields) {
                            if (!err) {
                                for (var j = 0; j < rows.length; j++) {
                                    retJson.message.push(rows[j]);
                                }
                                return res.json(retJson);
                            } else {
                                console.log(err.message);
                            }
                            connection.relase();
                        });
                    }
                }
            } else {
                retJson[0].message[0] = { data: err.message };
                return res.json(retJson);
            }
        });
    });
})

app.get('/getPendingOrders/:tempID', function (req, res) {
    console.log(req.params.tempID);
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    var id;
    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].sessionId == req.params.tempID) {
                        console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId + " retreieving his Pending Order History Page Information");
                        var query = "SELECT * FROM money_tree.order AS H, shares AS S WHERE S.id = H.share_id AND H.pm_id='" + rows[i].user_id + "';";
                        console.log(query);
                        connection.query(query, function (err, rows, fields) {
                            if (!err) {
                                for (var j = 0; j < rows.length; j++) {
                                    retJson.message.push(rows[j]);
                                }
                                return res.json(retJson);
                            } else {
                                console.log("ERROR");
                            }
                            connection.relase();
                        });
                    }
                }
            } else {
                retJson[0].message[0] = { data: err.message };
                return res.json(retJson);
            }
        });
    });
})

app.get('/getPendingOrdersId/:tempID/:id', function (req, res) {

    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    var id;
    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].sessionId == req.params.tempID) {
                        console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId + " retreieving his Pending Order History Page Information");
                        var query = "SELECT * FROM money_tree.order as H, shares as S WHERE  S.id = H.share_id AND H.pm_id='" + rows[i].user_id + "' AND  H.et_id ='" + req.params.id + "';";
                        console.log(query);
                        connection.query(query, function (err, rows, fields) {
                            if (!err) {
                                for (var j = 0; j < rows.length; j++) {
                                    retJson.message.push(rows[j]);
                                }
                                return res.json(retJson);
                            } else {
                                console.log(err.message);
                            }
                            connection.relase();
                        });
                    }
                }
            } else {
                retJson[0].message[0] = { data: err.message };
                return res.json(retJson);
            }
        });
    });
})

app.get('/getETPendingOrders/:tempID/:id', function (req, res) {

    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    var id;
    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].sessionId == req.params.tempID) {
                        //console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId + " retreieving his Pending Order History Page Information");
                        var query = "SELECT * FROM money_tree.order WHERE et_id='" + rows[i].user_id + "' AND pm_id='" + req.params.id + "';";
                        console.log(query)
                        connection.query(query, function (err, rows, fields) {
                            if (!err) {
                                for (var j = 0; j < rows.length; j++) {
                                    retJson.message.push(rows[j]);
                                }
                                return res.json(retJson);
                            } else {
                                console.log(err.message);
                            }
                            connection.relase();
                        });
                    }
                }
            } else {
                retJson[0].message[0] = { data: err.message };
                return res.json(retJson);
            }
        });
    });
})

app.get('/getBuildBlocks/:tempID', function (req, res) {
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    var id;
    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    if ((rows[i].sessionId != null) && (rows[i].sessionId == req.params.tempID)) {
                        console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId + " retreieving his Blocks History Page Information");
                        connection.query("SELECT * FROM block WHERE et_id='" + rows[i].user_id + "';", function (err, rows, fields) {
                            if (!err) {
                                for (var j = 0; j < rows.length; j++)
                                    retJson.message.push(rows[j]);
                                return res.json(retJson);
                            } else {
                                console.log(err.message);
                            }
                            connection.relase();
                        });
                    }
                }
            } else {
                retJson[0].message[0] = { data: err.message };
                return res.json(retJson);
            }
        });
    });
})

app.get('/getOrderId/:tempID/:oID', function (req, res) {
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    var id;
    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].sessionId == req.params.tempID) {
                        console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId + " retreieving his Order History Page Information");
                        connection.query("SELECT * FROM money_tree.order WHERE et_id='" + rows[i].user_id + "' AND ;", function (err, rows, fields) {
                            if (!err) {
                                for (var j = 0; j < rows.length; j++)
                                    retJson.message.push(rows[j]);
                                return res.json(retJson);
                            } else {
                                console.log(err.message);
                            }
                            connection.relase();
                        })
                    }
                }
            } else {
                retJson[0].message[0] = { data: err.message };
                return res.json(retJson);
            }
        });
    });
})

app.get('/getETPendingOrdersOnce/:tempID', function (req, res) {
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });
    var id;
    var pm;
    //reJson = { message: [] };
    retJson = { status: 'true', message: [] };
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM user WHERE 1", function (err, rows, fields) {
            if (!err) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].sessionId == req.params.tempID) {
                        id = rows[i].user_id;
                        console.log("User with User Id : " + rows[i].user_id + " and Session Key : " + rows[i].sessionId + " retreieving his Order History Page Information");
                        connection.query("SELECT * FROM portfolio_manager as P, shares as S, money_tree.order as O WHERE S.id = O.share_id AND P.id = O.pm_id", function (err, rows, fields) {
                            if (!err) {

                                return res.json(retJson);
                            } else {
                                console.log(err.message);
                            }
                        })
                    }
                }
            } else {
                retJson.message[0] = { data: err.message };
                return res.json(retJson);
            }
        });
    });
})

app.post('/loginData', function (req, res) {
    //console.log(req)
    console.log(req.body);
    console.log(req.method);
    var tkn;
    var body = req.body;
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'money_tree'
    });


    var retJson = [];

    pool.getConnection(function (err, connection) {
        connection.query("SELECT * from user where 1", function (err, rows, fields) {
            if (!err) {
                console.log("Retrieving Users");
                for (var i = 0; i < rows.length; i++) {
                    // console.log(req.body.access + " " + rows[i].user_id);
                    if (req.body.id == rows[i].user_id && req.body.password == rows[i].password && req.body.access == rows[i].access) {
                        tkn = randomstring.generate();
                        connection.query("UPDATE user SET sessionId = '" + tkn + "' WHERE user_id = '" + req.body.id + "';", function (err) {
                            if (!err) {
                                var access_level = req.body.access;
                                var table, col_name, altColName, altTable;
                                if (access_level == "PM") {
                                    table = "portfolio_manager";
                                    altColName = "et_id";
                                    altTable = "equity_trader"
                                    col_name = "pm_id"
                                }
                                else if (access_level == "ET") {
                                    table = "equity_trader";
                                    altTable = "portfolio_manager";
                                    altColName = "pm_id";
                                    col_name = "et_id";
                                }
                                else if (access_level == "Broker") {
                                    table = "broker";
                                    col_name = "bid";
                                }
                                else {
                                    console.log("No such entry found");
                                }
                                retJson =
                                    {
                                        acess: table,
                                        status: 'true',
                                        credentials: [
                                            {
                                                data: tkn
                                            }
                                        ],
                                        traders: [],
                                        pm: [],
                                        orderHistory: [],
                                        orderPending: [],
                                        drafts: [],
                                        blocks: [],
                                        shares: []
                                    }
                                    ;

                                var credentialData;
                                connection.query("SELECT * from " + table + " where 1;", function (err, rows, fields) {
                                    if (!err) {
                                        for (var i = 0; i < rows.length; i++) {
                                            if (req.body.id == rows[i].id) {
                                                console.log("User Id : " + rows[i].id + "Logged Into the System with sessionkey " + tkn);
                                                retJson.credentials.push(rows[i]);
                                                console.log(retJson);
                                            }
                                        }
                                        console.log("Wait")
                                        if (access_level == "PM" || access_level == "ET") {
                                            connection.query("SELECT * FROM " + altTable + " WHERE 1", function (err, rows, fields) {
                                                if (!err) {
                                                    credentialData = rows;
                                                    var reqFields = "et_id,pm_id,share_name,share_price,image,symbol,O.id,share_id,side,status,open_quantity,allocated_quantity,timestamp,limit_price,current_price,stop_price,total_quantity";
                                                    var query = "SELECT " + reqFields + "," + altColName + " FROM money_tree.order as O, shares as S," + table + " as P WHERE S.id=O.share_id AND P.id=O." + col_name + " AND " + col_name + "='" + body.id + "';";
                                                    console.log(query);
                                                    var data;
                                                    connection.query(query, function (err, rows, fields) {
                                                        if (!err) {
                                                            var g_id, data;
                                                            for (var i = 0; i < credentialData.length; i++) {
                                                                data = { placerData: credentialData[i], ordersGiven: [] };
                                                                for (var j = 0; j < rows.length; j++) {
                                                                    if (access_level == "PM" && credentialData[i].id == rows[j].et_id) {
                                                                        //console.log(rows[i]);
                                                                        data.ordersGiven.push(rows[j]);
                                                                        //  console.log(data);
                                                                    } else if (access_level == "ET" && credentialData[i].id == rows[j].pm_id) {
                                                                        data.ordersGiven.push(rows[j]);
                                                                    }
                                                                }
                                                                retJson.orderPending.push(data);
                                                            }
                                                            connection.query("SELECT * FROM shares WHERE 1", function (err, rows, fields) {
                                                                if (!err) {
                                                                    for (var i = 0; i < rows.length; i++) {
                                                                        retJson.shares.push(rows[i]);
                                                                    }
                                                                    var query1 = "SELECT * FROM HISTORY as H, shares as S WHERE S.id = H.share_id AND " + col_name + "='" + body.id + "' order by et_id;";
                                                                    console.log(query1);
                                                                    connection.query(query1, function (err, rows, fields) {
                                                                        if (!err) {
                                                                            //console.log(rows);
                                                                            var g_id, data;
                                                                            for (var i = 0; i < credentialData.length; i++) {
                                                                                data = { placerData: credentialData[i], ordersGiven: [] };
                                                                                for (var j = 0; j < rows.length; j++) {
                                                                                    // console.log(access_level + " " + credentialData[i].id + " " + rows[j].pm_id);
                                                                                    if (access_level == "PM" && credentialData[i].id == rows[j].et_id) {
                                                                                        console.log("in PM")
                                                                                        data.ordersGiven.push(rows[j]);
                                                                                        console.log(rows[i]);
                                                                                    } else if (access_level == "ET" && credentialData[i].id == rows[j].pm_id) {
                                                                                        console.log("in ET")
                                                                                        data.ordersGiven.push(rows[j]);
                                                                                    }
                                                                                }
                                                                                //  console.log(data);
                                                                                retJson.orderHistory.push(data);
                                                                            }
                                                                            if (access_level == "PM") {
                                                                                var query2 = "SELECT * FROM DRAFT as D, shares as S WHERE S.id = D.share_id AND " + col_name + "='" + body.id + "';";
                                                                                console.log(query2);
                                                                                connection.query(query2, function (err, rows, fields) {
                                                                                    if (!err) {
                                                                                        for (var i = 0; i < rows.length; i++)
                                                                                            retJson.drafts.push(rows[i]);
                                                                                        connection.query("SELECT * FROM equity_trader WHERE 1", function (err, rows, fields) {
                                                                                            if (!err) {
                                                                                                for (var i = 0; i < rows.length; i++)
                                                                                                    retJson.traders.push(rows[i]);
                                                                                                return res.status(200).json(retJson);
                                                                                            }
                                                                                        });
                                                                                        //return res.status(200).json(retJson);
                                                                                    } else { console.log(err.message) }
                                                                                });
                                                                            }
                                                                            else if (access_level == "ET") {
                                                                                var query3 = "SELECT * FROM BLOCK as B, shares as S WHERE S.id = B.share_id AND " + col_name + "='" + body.id + "';";
                                                                                console.log(query3);
                                                                                connection.query(query3, function (err, rows, fields) {
                                                                                    if (!err) {
                                                                                        for (var i = 0; i < rows.length; i++)
                                                                                            retJson.blocks.push(rows[i]);
                                                                                        connection.query("SELECT * FROM portfolio_manager WHERE 1", function (err, rows, fields) {
                                                                                            if (!err) {
                                                                                                for (var i = 0; i < rows.length; i++)
                                                                                                    retJson.traders.push(rows[i]);
                                                                                                return res.status(200).json(retJson);
                                                                                            }
                                                                                        });
                                                                                        //return res.status(200).json(retJson);
                                                                                    } else (console.log(err.message))
                                                                                });
                                                                            }
                                                                            //return res.status(200).json(retJson);
                                                                        }
                                                                    });
                                                                } else {
                                                                    console.log(err.message);
                                                                }
                                                            })
                                                            // return res.status(200).json(retJson);
                                                        }
                                                    });
                                                }
                                            });
                                            console.log("Wait Over")
                                        }
                                    }
                                    else {
                                        console.log(err.message + " Not Able to Login");
                                        retJson[0].message.push(err.message);
                                        res.status(404).json(retJson);
                                    }
                                });
                            } else {
                                console.log(err.message);
                            }
                            connection.release();
                        });
                    }
                }
            }
            else
                console.log('Error while performing Query.');
        });
    });
});