import { getToken } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/database/dbConfig";

connect();

export async function GET(request: NextRequest){
    try {
        const userId = await getToken(request);

        // get all data except password
        const user = await User.findById({_id: userId}).select("-password"); 

        return NextResponse.json({
            message: "User found",
            data: user, // mongodb user container/schema object{_id, email, username}
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

