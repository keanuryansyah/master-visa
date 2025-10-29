const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');
const { snap } = require('../utils/midtrans');

router.post('/', async (req, res) => {
    try {
        const { packageId, name, email, phone, peopleCount } = req.body;
        const pkg = await prisma.package.findUnique({ where: { id: packageId } });
        if (!pkg) return res.status(404).send('Package not found');

        // Hitung harga DP (800k per orang) — sesuai request
        const dpPerPerson = 800000;
        const totalAmount = dpPerPerson * peopleCount;

        // Simpan booking pending
        const booking = await prisma.booking.create({
            data: {
                packageId,
                name,
                email,
                phone,
                peopleCount,
                totalAmount,
                paymentStatus: 'pending'
            }
        });

        // Buat order id unik
        const orderId = `VISADB-${booking.id}-${Date.now()}`;

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: totalAmount
            },
            customer_details: {
                first_name: name,
                email,
                phone
            }
        };

        const transaction = await snap.createTransaction(parameter);
        // transaction.token atau redirect_url
        // Update booking dengan midtransOrderId
        await prisma.booking.update({
            where: { id: booking.id },
            data: { midtransOrderId: orderId }
        });

        res.json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            bookingId: booking.id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
