// This file is for taiko test only
require('dotenv').config();
const { openBrowser, goto, $, click, dropDown, textBox, into, write, clear, evaluate, closeBrowser } = require('taiko');

(async () => {
    try {
        await openBrowser();
        await goto('https://www.neabilling.com/viewonline');

        await dropDown({id:'NEA_location'}).select(process.env.NEA_LOCATION);

        await write(process.env.SC_NO, into(textBox({id: 'sc_no'})));
        await write(process.env.CONSUMER_ID, into(textBox({id: 'consumer_id'})));

        await clear(textBox({id: 'Fromdatepicker'}));
        await write('7/7/2020', into(textBox({id: 'Fromdatepicker'})));

        await clear(textBox({id: 'Todatepicker'}));
        await write('8/9/2020', into(textBox({id: 'Todatepicker'})));

        await click($("#btnSubmit"));

        const htmlContent = await evaluate(()=>{
            const table = document.getElementsByTagName('table')[1];
            // removes logo tr
            table.querySelectorAll('tbody tr')[0].remove();
            // removes transaction date tr
            table.querySelectorAll('tbody tr')[0].remove();
            table.classList.add('table', 'table-responsive');
            return table.outerHTML;
        });
        console.log(htmlContent);
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
