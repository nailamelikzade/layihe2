const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/convert/:currency", async (req, res) => {

    let fromCurrency = req.params.currency;

    try {

        const response = await fetch(
            `https://open.er-api.com/v6/latest/${fromCurrency}`
        );

        const data = await response.json();

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: "Something went wrong"
        });

    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});