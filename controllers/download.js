const request = require('request');
const fs = require('fs');
const path = require('path');


function formatChapter(chapter) {
    let _chapter = '';
    if (chapter < 10) {
        _chapter = `00${chapter}`;
    } else if (chapter < 100) {
        _chapter = `0${chapter}`;
    }
    return chapter;
}
/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/
function downloadFile(req, res) {
    let chapter = 99;
    let index = 0;
    const chapters = [16, 30, 31, 33, 35, 40, 51, 53, 60, 67, 80, 87, 88, 96, 113, 120, 126, 132, 138, 141, 150, 154, 156, 161, 164, 179, 181,184, 194, 200, 211, 214, 222, 226, 233, 237, 240, 242, 245, 250, 256];
    const downloadTimeInterval = setInterval(() => {
        const fileUrl  = `http://180f.ysts8.com:8000/%E7%8E%84%E5%B9%BB%E5%B0%8F%E8%AF%B4/%E8%AF%9B%E4%BB%99_%E7%AE%A1%E6%81%A9%E4%BA%AE/%E8%AF%9B%E4%BB%99${formatChapter(chapters[index])}.mp3?140022258175880x1556975780x140022264306540-e89ef87e222454532e383e215534`;
        const filename = path.join(__dirname, '../mp3', decodeURI(`%E8%AF%9B%E4%BB%99${formatChapter(chapters[index])}.mp3`));  //文件名
        const stream = fs.createWriteStream(filename);
        request(fileUrl, {}, (err, data) => {
            console.log(err, data);
        }).pipe(stream).on('close', function(err, data) {
            if (err) {
                console.err(`下载--${decodeURI(`%E8%AF%9B%E4%BB%99${formatChapter(chapters[index])}.mp3`)}时，失败！`);
                clearInterval(downloadTimeInterval);
            } else {
                if (++index === chapters.length) {
                    console.info('全集下载完毕');
                    clearInterval(downloadTimeInterval);
                } else {
                    console.info(`${decodeURI(`%E8%AF%9B%E4%BB%99${formatChapter(chapters[index])}.mp3`)}下载完毕\n`);
                }
            }
        });
    }, 9000);
};
module.exports = { downloadFile };