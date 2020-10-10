import {Request, Response} from 'express'
import db from '../database/connections';
import convertHourtoMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem  {
    week_day: number,
    from: string,
    to: string
}
class ClassesController {
    async index(req: Request, res: Response){
        const filters = req.query;

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        if(!filters.week_day || !filters.subject || !filters.time){
            return res.status(400).json({message: "Missing Filters to search" });
        }

        const timeInMinutes = convertHourtoMinutes(time);

        console.log(timeInMinutes);

        const classes = await db('classes')
        .whereExists(function(){
            this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id`=`classes`.`id`')
            .whereRaw('`class_schedule`.`week_day`=??',[Number(week_day)])
            .whereRaw('`class_schedule`.`from` <= ??',[timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??',[timeInMinutes])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', "users.id")
        .select(['classes.*','users.*'])

        return res.json(classes);

    }
    async create(req: Request,res: Response){
        const { 
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
         } = req.body;

    const trx = await db.transaction();

     try {
        const insertedUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio
        });

        const user_id = insertedUsersIds[0];

       const insertedClassesIds =  await trx('classes').insert({
            subject,
            cost,
            user_id
        })

       const class_id = insertedClassesIds[0];

       const classSchedule = schedule.map((scheduleItem: ScheduleItem ) => {
           
           return {
               class_id,
               week_day: scheduleItem.week_day,
               from: convertHourtoMinutes(scheduleItem.from),
               to: convertHourtoMinutes(scheduleItem.to),
           }
       })

       await trx('class_schedule').insert(classSchedule);

       await trx.commit();

       return res.status(201).json({message: "ok"});

     } catch (error) {

         trx.rollback();
         console.log(error);

         return res.status(400).json({
            message: "Unexpected error While creating new table"
         });
     }
    }
}

export default new ClassesController();