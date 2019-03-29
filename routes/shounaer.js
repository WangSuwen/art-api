const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const result = require('../util/result');


// POST 添加提醒
router.post('/api/app/v350/remind', (req, res) => {
  result.success(res, {
      "code": "200",
      "data": {
          "ok": 1
      },
      "msg": "操作成功"
  });
});

// DELETE 删除某个提醒
router.delete('/api/app/v350/remind', (req, res) => {
  result.success(res, {
    "code": "6001",
    "data": null,
    "msg": "该提醒不存在"
  });
});

// POST 修改 某一个 提醒
router.post('/api/app/v350/remind-update', (req, res) => {
  result.success(res, {
      "code": "200",
      "data": {
          "ok": 1
      },
      "msg": "操作成功"
  });
});
// GET 获取提醒列表（根据提醒完成类型进行分页查询）
router.get('/api/app/v350/remind-list', (req, res) => {
  result.success(res, {
      "code": "200",
      "data": {
          "doneCount": 1,
          "unDoneCount": 7,
          "page_info": {
              "current_page": 1,
              "page_size": 10,
              "count": 1
          },
          "reminds": [
              {
                  "timeout": true,
                  "_id": "5c9756a50455fd0b5c092dea",
                  "title": "买大白菜4",
                  "description": "",
                  "tips_time": 1553406728526,
                  "associated_object_url": "http://cdn.shouner.com/object/2712ab56-9da9-4c15-a231-eb3a77ae3f75.jpg",
                  "done": 0,
                  "associated_object_id": "5c79f511e0817d192c935b1c"
              },
              {
                  "timeout": true,
                  "_id": "5c9757b82eb2b62e2066d3c8",
                  "title": "买大白菜2",
                  "description": "",
                  "tips_time": 1553406728526,
                  "associated_object_url": "http://cdn.shouner.com/object/2712ab56-9da9-4c15-a231-eb3a77ae3f75.jpg",
                  "done": 0,
                  "associated_object_id": "5c79f511e0817d192c935b1c"
              },
              {
                  "timeout": true,
                  "_id": "5c9757c12eb2b62e2066d3c9",
                  "title": "买大白菜5",
                  "description": "",
                  "tips_time": 1553406728526,
                  "associated_object_url": "http://cdn.shouner.com/object/2712ab56-9da9-4c15-a231-eb3a77ae3f75.jpg",
                  "done": 0,
                  "associated_object_id": "5c79f511e0817d192c935b1c"
              },
              {
                  "timeout": true,
                  "_id": "5c97881fc497221fc878859d",
                  "title": "买大白菜6",
                  "description": "",
                  "tips_time": 1553406728526,
                  "associated_object_url": "http://cdn.shouner.com/object/2712ab56-9da9-4c15-a231-eb3a77ae3f75.jpg",
                  "done": 0,
                  "associated_object_id": "5c79f511e0817d192c935b1c"
              },
              {
                  "timeout": true,
                  "_id": "5c97884b53daca17fc5e64c2",
                  "title": "买大白菜7",
                  "description": "",
                  "tips_time": 1553406728526,
                  "associated_object_url": "http://cdn.shouner.com/object/2712ab56-9da9-4c15-a231-eb3a77ae3f75.jpg",
                  "done": 0,
                  "associated_object_id": "5c79f511e0817d192c935b1c"
              },
              {
                  "timeout": true,
                  "_id": "5c97565f0455fd0b5c092de9",
                  "title": "买大白菜1",
                  "description": "",
                  "tips_time": 1553426728526,
                  "associated_object_url": "http://cdn.shouner.com/object/2712ab56-9da9-4c15-a231-eb3a77ae3f75.jpg",
                  "done": 0,
                  "associated_object_id": "5c79f511e0817d192c935b1c"
              },
              {
                  "timeout": false,
                  "_id": "5c973626dd84472ce8b987ce",
                  "title": "买大白菜3",
                  "description": "",
                  "tips_time": 1556416728526,
                  "associated_object_url": "http://cdn.shouner.com/object/2712ab56-9da9-4c15-a231-eb3a77ae3f75.jpg",
                  "done": 0,
                  "associated_object_id": "5c79efbe30220b51e625674c"
              }
          ]
      },
      "msg": "操作成功"
    });
});
// GET 获取提醒详情
router.get('/api/app/v350/remind-detail', (req, res) => {
  result.success(res, {
    "code": "200",
    "data": {
        "title": "买大白菜",
        "description": "",
        "tips_time": 1553406728526,
        "first": 1,
        "repeat": 0,
        "associated_object": {
            "name": "",
            "object_url": "http://cdn.shouner.com/object/8a7ebd89-f8a9-48ab-843b-aebdad61e913.jpg",
            "locations": [
                {
                    "code": "B8F951E5C9C8763C8062C990B518C989",
                    "level": 0,
                    "name": "小房间",
                    "_id": "5c72c0acf6494b7b0666f0cf"
                },
                {
                    "name": "沙发床抽屉",
                    "code": "6A6510EBCFC98AF52EB7B6E709EA9171",
                    "level": 1,
                    "_id": "5c76c117f6494b7b066703e5"
                },
                {
                    "name": "抽屉3",
                    "code": "6EBE4F7C16A8545856E7006C5EDBCAC0",
                    "level": 2,
                    "_id": "5c79eff785fee3192bb08cf4"
                }
            ],
            "categories": [
                {
                    "name": "日用居家",
                    "code": "429E0817D636D16D05C44BD61B8AA629",
                    "level": 0,
                    "_id": "58e23af68f2536ae3a934512"
                },
                {
                    "name": "起居",
                    "code": "DDC0E70CCC292F2E11EF1BAD3745A543",
                    "level": 1,
                    "_id": "58e23b0b8f2536ae3a934560"
                },
                {
                    "name": "床上用品",
                    "code": "C86D0FD4FC3CCE222400B0B6BC1B6637",
                    "level": 2,
                    "_id": "58e23b0d8f2536ae3a934568"
                },
                {
                    "name": "床单",
                    "code": "E06C25A6CF12F017ACD9DD4BC7C77E63",
                    "level": 3,
                    "_id": "5c79efbe30220b51e625674b"
                }
            ]
        }
    },
    "msg": "操作成功"
  });
});
// GET 提醒标记为已完成
router.get('/api/app/v350/remind-done', (req, res) => {
  result.success(res, {
      "code": "200",
      "data": {
          "ok": 1
      },
      "msg": "操作成功"
  });
});
// GET 判断是否需要弹框
router.get('/api/app/v350/remind-done', (req, res) => {
  result.success(res, {
      "code": "200",
      "data": {
          "ok": 1
      },
      "msg": "操作成功"
  });
});


module.exports = router;
