const cron = require('node-cron');
const User = require('../users/models/mongodb/User');

module.exports.taskUpdateBlockUserStart = () => {

  cron.schedule('* * * * *', async () => {
    console.log(`****************************Unblock User Job Check**********************************`)
    await updateUserUnBlockStatus();
  }).start();
};



const updateUserUnBlockStatus = async () => {
  try {
    const currentDate = new Date();
    const startHour = currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    const usersBlocked = await User.find({
        unblocked_date: { $lte : currentDate.setHours(23, 59, 59, 999) },
        unblocked_time: startHour,
        attempts: 3,
    });

    let userIdsForUnblock = [];
    for (let index = 0; index < usersBlocked.length; index++) {
      const element = usersBlocked[index];
      userIdsForUnblock.push(element._id);
    }

    if (userIdsForUnblock.length) {
      const updateBlockedUsers = await User.updateMany(
        { _id: { $in: userIdsForUnblock } }, 
        { attempts: 0 }
      );
    } else {
      console.log("*************************** No User to Unblock ***********************************")
    }
  } catch (error) {
    console.error('Error updating block users:', error);
  }
}
