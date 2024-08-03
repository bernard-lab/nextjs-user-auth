import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message: 'Logout successfully!!!',
            succes: true,
        });

        response.cookies.set('token', '', 
            {
                httpOnly: true,
                expires: new Date(0),
            }); // set cookies to empty && expiry to 0

        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}