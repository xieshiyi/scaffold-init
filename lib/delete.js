const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
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
    }
];
module.exports = function() {
    prompt(questions).then(function(data) {
    	const deleteName = data.name;
        delete tplJson[data.name];
        fs.writeFile(tplPath, JSON.stringify(tplJson), 'utf-8', function(err, data) {
            if (err) {
                console.log('模板删除失败');
                return;
            } else if(!data){
            	console.log(chalk.red(`模板${deleteName}不存在`));
            	return;
            }
            console.log('模板删除成功');
        });
    });
};