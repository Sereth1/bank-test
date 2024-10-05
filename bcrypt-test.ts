import bcrypt from 'bcryptjs'; // or 'bcrypt' if you installed bcrypt

const testBcrypt = async () => {
    try {
        const password = 'mySecretPassword';
        const saltRounds = 10;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('Hashed Password:', hashedPassword);

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log('Password Match:', isMatch);
    } catch (error) {
        console.error('Error with bcrypt:', error);
    }
};

testBcrypt();
