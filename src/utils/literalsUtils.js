module.exports = {
    remainingDeays(item){
            const remainingDays = (item["total-hours"]/item["daily-hours"]).toFixed()
    
            const createdDate = new Date(item.created_at)
            const dueDay = createdDate.getDate()+ Number(remainingDays)
            const dueDate = createdDate.setDate(dueDay)
    
            const timerDiffInMs = dueDate - Date.now()
            const daysInMs = 1000* 60*60*24
            const dayDiff = Math.ceil(timerDiffInMs/daysInMs)
            return dayDiff  
    },
    calculateBudget:(item,valueHour)=> valueHour*item["total-hours"]
    }