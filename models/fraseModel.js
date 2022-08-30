var pool = require('./bd');
// var md5 = require('md5');



async function getFrase() {
    var query = "select * from frase order by id desc";
    var rows = await pool.query(query);
    return rows;
}

async function deleteFraseById(id) {
    var query = "delete from frase where id = ?";
    var rows = await pool.query(query, [id]);
    return rows;
}

async function insertFrase(obj) {
    try {
        var query = "insert into frase set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getFraseById(id) {
    var query = "select * from frase where id = ?";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarFraseById(obj, id) {
    try {
        var query = "update frase set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getFrase, deleteFraseById, insertFrase, getFraseById, modificarFraseById }


// async function getFrase() {
//     try {
//         var query = 'select * frase';
//         var rows = await pool.query(query);
//         return rows;
//     } catch (error) {
//         console.log (error)
//     }
// }


// async function deleteFraseById() {
//     try {
//         var query = 'delete from frace where id - ?';
//         var rows = await pool.query(query, [id]);
//         return rows;
//     } catch (error) {
//         console.log (error)
//     }
// }

// module.exports = {getFrase, deleteFraseById}