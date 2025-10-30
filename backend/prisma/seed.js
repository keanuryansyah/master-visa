const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Hapus data lama untuk menghindari duplikasi (opsional)
    await prisma.package.deleteMany({});
    await prisma.country.deleteMany({});

    // Buat negara Korea Selatan
    const korea = await prisma.country.create({
        data: {
            name: 'Korea Selatan',
            slug: 'korea-selatan',
            image: '/images/korea-hero.jpg', // Gambar untuk hero section
            description: 'Jelajahi keindahan budaya dan modernitas Korea Selatan.',
            packages: {
                create: [
                    {
                        title: 'Single Entry',
                        description: 'Visa untuk masuk ke Korea satu kali. Visa berlaku selama 3 bulan dengan masa stay maksimal 30 hari.',
                        weServe: JSON.stringify(['Touris', 'Bisnis']), // Gunakan JSON.stringify
                        price1: 1595000,
                        price2: 1500000,
                        price3_6: 1450000,
                        price7plus: 1400000,
                    },
                    {
                        title: 'Single Entry Express',
                        description: 'Visa untuk masuk ke Korea satu kali dengan proses dipercepat. Visa berlaku selama 3 bulan dengan masa stay maksimal 30 hari.',
                        weServe: JSON.stringify(['Touris', 'Bisnis']),
                        price1: 2095000,
                        price2: 2000000,
                        price3_6: 1950000,
                        price7plus: 1900000,
                    },
                    {
                        title: 'Multiple Entry',
                        description: 'Visa untuk masuk ke Korea berkali-kali. Visa berlaku selama 5 tahun dengan masa stay di Korea maksimal 30 hari setiap kunjungan.',
                        weServe: JSON.stringify(['Touris', 'Bisnis']),
                        price1: 2395000,
                        price2: 2300000,
                        price3_6: 2250000,
                        price7plus: 2200000,
                    },
                ],
            },
        },
    });

    console.log(`Created country with id: ${korea.id} and its packages.`);
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });