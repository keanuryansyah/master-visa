import express from "express";
import { snap } from "../utils/midtrans.js";

const router = express.Router();

router.post("/create-transaction", async (req, res) => {
    const { name, phone, amount } = req.body;

    if (!name || !phone || !amount) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const parameter = {
            transaction_details: {
                order_id: "ORDER-" + Date.now(),
                gross_amount: amount,
            },
            customer_details: {
                first_name: name,
                phone,
            },
        };

        const transaction = await snap.createTransaction(parameter);
        res.json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
