const controller = {};

controller.showSchedule = (req,res) => {
    
    const data = null
    res.render('agenda',{
        data: data
    });
}




module.exports = controller;
