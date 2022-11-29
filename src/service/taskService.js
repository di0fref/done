const express = require('express');
const app = express();
const cors = require('cors')
const {HiHeart} = require("react-icons/hi2");

const port = 8000;
app.use(cors())

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

const mtasks = [
    {
        completed: true,
        name: "TODAY - This is the name with a pretty long title",
        description: "Writing documentation is enough to make you rip your hair out without worrying about the design. Let us help you keep a few strands.",
        date: "2022-11-26",
        id: "1",
    },
    {
        completed: false,
        name: "This is the name",
        description: "Writing documentation is enough to make you rip your hair out without worrying about the design. Let us help you keep a few strands.",
        date: "2022-12-01",
        id: "2",
    },
    {
        completed: false,
        name: "This is the name",
        description: "Writing documentation is enough to make you rip your hair out without worrying about the design. Let us help you keep a few strands.",
        date: "2022-12-11",
        id: "3",
    }, {
        completed: false,
        name: "TODAY - This is the name",
        description: "Writing documentation is enough to make you rip your hair out without worrying about the design. Let us help you keep a few strands.",
        date: "2022-11-26",
        id: "4",
    }
];

app.get('/today', (req, res) => {
    res.send(mtasks);
});

app.get('/upcoming', (req, res) => {
    res.send([mtasks[2]]);
});
