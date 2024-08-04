import { connect } from '@/database/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@/helpers/mailer';

connect(); //connect to database

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        console.log('Request Body:', reqBody);

         // Check if user already exist
         const user = await User.findOne({ email });
         if (!user) {
             return NextResponse.json({ error: 'User email not found' }, { status: 400 });
         }

          // Compare password
          if(!email === user.email) {        
            return NextResponse.json({ error: 'Invalid email' }, { status: 401 });
        }
        console.log(user);

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        // Send email verification link
        await sendEmail({ email, emailType: 'RESET', userId: user._id });

        // Send success message
         const response = NextResponse.json({
            message: 'Send email successful',
            success: true,
        });

        // Return response
        return response;

    } catch (error: any) {
        console.error('Forgot Password Error:', error.message);
        return NextResponse.json({ error: error.message}, { status: 500 });
    }
}
