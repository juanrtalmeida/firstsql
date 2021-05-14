const Literals = require('../models/literals')
const literalsUtils = require('../utils/literalsUtils')
const Profile = require('../models/Profile')   

module.exports = {
    async index(req,res){

        const literals = await Literals.get();
        const profile = await Profile.get();
        let newStat= {inprogress:0, alreadydone:0}

        const updatedJobs = literals.map(item =>{
            const remaining = literalsUtils.remainingDeays(item)<= 0? 0: literalsUtils.remainingDeays(item)
            status=''
            if (remaining<=0){
                newStat.alreadydone++;
                status = 'done'
            } else{
                newStat.inprogress++;
                status = 'progress'
            }

            return {
                ...item,remaining,status,budget:literalsUtils.calculateBudget(item, profile["value-hour"])
            }
            
        })
        return res.render( "index",{jobs:updatedJobs,profile:await Profile.get(),literals:await Literals.get(),status:newStat})
    },
    
    async create(req, res){
        await Literals.create({
            name:req.body.name,
            "daily-hours":req.body["daily-hours"],
            "total-hours":req.body["total-hours"],
            created_at:Date.now()
        });
    
        return res.redirect('/')
    },
    show(req, res){
        return res.render("job")
},
    async save(req, res){ 
        
        const jobId = req.params.id
        const finder = (await Literals.get()).find(item=> Number(item.id) === Number(jobId))
        
        if (!finder){
            return res.send('Job not found!')
        }

        const profile = await Profile.get();
        finder.budget= literalsUtils.calculateBudget(finder, profile["value-hour"])
        return res.render("job-edit", {finder})
    },
    async update(req,res){
        const jobId = req.params.id
        
        const updatedJob = {
            name:(req.body.name)===""?finder.name:req.body.name,
            "total-hours":(req.body["total-hours"])===""?finder["total-hours"]:req.body["total-hours"],
            "daily-hours":(req.body["daily-hours"])===""?finder["daily-hours"]:req.body["daily-hours"]
        }

        await Literals.update(updatedJob, jobId)
        
        res.redirect('/job/'+jobId)
    },
    async delete(req,res){
        const jobId = req.params.id
        await Literals.delete(jobId)
        return res.redirect('/')
    }
}