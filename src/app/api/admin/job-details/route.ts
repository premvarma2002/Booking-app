import { NextResponse } from "next/server"
import { prisma } from "@/lib"

export async function GET(){
    try {
        const jobs = await prisma.jobs.findMany({ orderBy:{createdAt:"desc"}});
        const onGoingJobs = await prisma.jobs.findMany({
            where:{isComplete:false},
        });
        return NextResponse.json({
            jobs,onGoingJobs:onGoingJobs?.length ?? 0
        },{status: 200})
    } catch (error) {
      return NextResponse.json(
        {message: "An unexpected error occurred"},
        { status: 500}
      );
    }
}