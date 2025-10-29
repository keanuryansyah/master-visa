import express from "express";
import { core } from "../utils/midtrans.js";

const router = express.Router();

router.post("/create-va", async (req, res) => {
    try {
        const { name, phone, amount, bank } = req.body;

        const parameter = {
            payment_type: "bank_transfer",
            transaction_details: {
                order_id: "ORDER-" + Date.now(),
                gross_amount: amount,
            },
            bank_transfer: {
                bank: bank || "bca", // default BCA
            },
            customer_details: {
                first_name: name,
                phone: phone,
            },
        };

        const chargeResponse = await core.charge(parameter);
        res.json(chargeResponse);
    } catch (error) {
        console.error("Midtrans Error:", error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
