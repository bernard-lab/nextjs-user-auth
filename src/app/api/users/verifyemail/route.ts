import { connect } from "@/database/dbConfig";
import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        
        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        // Find the user with the matching verifyToken
        const user = await User.findOne({
            verifyToken: token, 
            verifyTokenExpiry: {$gt: Date.now()} //$gt -> greater than current date
        });

         // Find the user with the matching verifyToken
        if(!user){
            return NextResponse.json({ error: 'Invalid or expired token' }, {status: 400});
        }
        console.log(user);

         // Update the user's verification status
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
             message: 'User verified successfully', 
             success: true, 
            });

    } catch (error: any) {
        return NextResponse.json({error: `Error in verifyemail/route.ts file ${error.message}` }, {status: 500});
    }
}


