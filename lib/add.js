const fs = require('fs');
const path = require('path');
const { prompt } = require('inquirer'); 
const tplPath = path.resolve(__dirname, '../template.json');
const tplJson = require(tplPath);

const questions = [
    {
        type: 'input',
        name: 'name',
        message: '模板名称',
        validate: function(val) {
            if (!val) {
                return '模板名称不为空'
            } else {
                return true;
            }        
        }
    },
    {
        type: 'input',
        name: 'description',
        message: '模板描述',
        validate: function(val) {
            if (!val) {
                return '模板描述不为空'
            } else {
                return true;
            }        
        }
    },
    // {
    //     type: 'input',
    //     name: 'npm',
    //     message: '模板包名称，（ps: 创建项目使用这个npm包）',
    //     validate: function(val) {
    //         if (!val) {
    //             return '模板名称不为空'
    //         } else {
    //             return true;
    //         }        
    //     }
    // }
    {
        type: 'input',
        name: 'gitUrl',
        message: 'git仓库地址',
        validate: function(val) {
            if (!val) {
                return 'git仓库地址不为空'
            } else {
                return true;
            }        
        }
    },
    {
        type: 'input',
        name: 'branch',
        message: 'git分支名称',
        validate: function(val) {
            if (!val) {
                return 'git分支名称不为空'
            } else {
                return true;
            }        
        }
    }
    
];

module.exports = function() {
    prompt(questions).then(function(data) {
        tplJson[data.name] = {};
        tplJson[data.name]['name'] = data.name;
        tplJson[data.name]['description'] = data.description;
        // tplJson[data.name]['npm'] = data.npm;
        tplJson[data.name]['gitUrl'] = data.gitUrl;
        tplJson[data.name]['branch'] = data.branch;
        fs.writeFile(tplPath, JSON.stringify(tplJson), 'utf-8', function(err, data) {
            if (err) {
                console.log('模板添加失败');
            } 
            console.log('模板添加成功');
        });
    });
};