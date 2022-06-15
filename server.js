/* jshint esversion:11 */

const express = require('express');
const app = express();
const holidays = require('./holidays');

app.get('/holidays', (req, res, next)=>{
    res.send(holidays);
});

app.get('/is-today-holiday', (req, res, next)=>{

    const today = new Date();
    const queryResult = holidays.find(holiday => holiday.date === today.toLocaleDateString());
    const message = (queryResult !== undefined) ? `Sim, hoje é ${queryResult.name}` : 'Não, hoje não é feriado';

    res.send(message);

});

app.get('/holidays/:monthNumber', (req, res, next)=>{

    const { monthNumber } = req.params;
    const monthHolidays = holidays.filter(holiday=>{

        const holidayDate = new Date(holiday.date);
        const holidayMonth = holidayDate.getMonth() + 1;
        return (holidayMonth === parseInt(monthNumber));

    });

    res.send(monthHolidays);

});

app.listen(3000, () => console.log('Servidor online na porta 3000'));