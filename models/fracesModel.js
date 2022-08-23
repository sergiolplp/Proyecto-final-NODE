var pool = require('./bd');
var md5 = require('md5');

async function getFraces() {
    try {
        var query = 'select * fraces';
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.log (error)
    }
}


async function deleteFracesById() {
    try {
        var query = 'delete from novedades where id - ?';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log (error)
    }
}

module.exports = {getFraces, deleteFracesById}