import { connect } from '@/database/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect(); //connect to database

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log('Request Body:', reqBody);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10); // 10 rounds
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save new user
        const savedUser = await newUser.save();
        console.log('New User:', savedUser);

        // Send email verification link
        await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

        return NextResponse.json({
            message: 'Successfully created new user',
            success: true,
            user: savedUser
        });

    } catch (error: any) {
        console.error('Signup Error:', error.message);
        return NextResponse.json({ error: error.message}, { status: 500 });
    }
}
