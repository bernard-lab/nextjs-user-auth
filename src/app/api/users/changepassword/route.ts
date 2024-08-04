import { connect } from "@/database/dbConfig";
import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const  [{password}, token]  = reqBody;   

        // Hash the password
        const salt = await bcryptjs.genSalt(10); // 10 rounds
        const hashedPassword = await bcryptjs.hash(password, salt);    

        // Validate token if exists
        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

         // Find the user with the matching forgotPasswordToken
         const user = await User.findOne({
            forgotPasswordToken: token, 
            forgotPasswordTokenExpiry: {$gt: Date.now()} //$gt -> greater than current date
        });   
        
         // Check the user is null or empty
        if(user === null){
            return NextResponse.json({ error: 'No user found' }, {status: 402});
        }
        // Validate token if correct
        if(!user){
            return NextResponse.json({ error: 'Invalid or expired token' }, {status: 401});
        }
       
        // Update the user's verification status
        user.password = hashedPassword.toString();
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        console.log('CURRENT User ', user);

        return new NextResponse(JSON.stringify({
             message: 'Password changed successfully', 
             success: true, 
            }, user));

    } catch (error: any) {
        return NextResponse.json({error: `Error in changepassword/route.ts file ${error.message}` }, {status: 500});
    }
}


