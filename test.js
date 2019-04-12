const later = require('later');

/**
 * 测试：自动添加多个定时任务，执行完毕便自动清除
 */
(function taskExec() {
  const tasks = {};
  for (let i = 1; i < 5; i++) {
    tasks[`task_${i}`] = later.setInterval(() => {
        console.log(`第${i}个任务，当前时间是：${new Date()}`);
        tasks[`task_${i}`].clear();
        delete tasks[`task_${i}`];
        console.log(`剩余的任务：${Object.keys(tasks)}`);
    }, later.parse.cron(`${i * 10} * * * * *`, true));
  }
  console.log(`所有的任务：${Object.keys(tasks)}`);
})()