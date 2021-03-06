var exec = require('child_process').exec;
var iconv = require("iconv-lite");
var fs = require("fs");

function begin_with(width = 40,height=29,gap=3){
var data = 'SIZE ' + width + ' mm,' + height + ' mm\n';
data += "GAP " + gap + " mm,0 mm\n";
data += "DIRECTION 0\n";
data += "CLS\n";
fs.writeFileSync('./print.tpl',data);
}

function len(str) {  
    //console.log(typeof str)
    if (str == null) return 0;  
    if (typeof str != "string"){  
        str += "";  
    	}  
    return str.replace(/[^\x00-\xff]/g,"01").length;  
}  

function fill_with(text,width=26,char=' '){


var n = (width - len(text))/2;

for (var i=0;i<n;i++){
	text = char+text+char;
	}
return text;
}

function print_tpl(){
var cmd = "cat print.tpl > /dev/usb/lp0";
exec(cmd, function (error, stdout, stderr) {
    // 获取命令执行的输出
    console.log(stdout+stderr+error);
});
}

function qr_with_text(value,text){
begin_with();
fs.appendFileSync('./print.tpl',iconv.encode('QRCODE 90,20,M,4,A,0,"' + value + '"\n','utf8'));
text = fill_with(text,26,' ');
var str = iconv.encode('TEXT 0,180,"TSS24.BF2",0,1,1,"'+ text + '"\n','gbk');
fs.appendFileSync('./print.tpl', str);
fs.appendFileSync('./print.tpl', 'PRINT 1\n');
console.log("print.tpl:\n"+fs.readFileSync('./print.tpl').toString());

}

function qr_x4(value,text){
begin_with();
text = fill_with(text,12,' ');
fs.appendFileSync('./print.tpl',iconv.encode('QRCODE 35,10,M,2,A,0,"' + value + '"\n','utf8'));
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 0,90,"TSS24.BF2",0,1,1,"'+ text + '"\n','gbk'));
fs.appendFileSync('./print.tpl',iconv.encode('QRCODE 185,10,M,2,A,0,"' + value + '"\n','utf8'));
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 150,90,"TSS24.BF2",0,1,1,"'+ text + '"\n','gbk'));
fs.appendFileSync('./print.tpl',iconv.encode('QRCODE 35,130,M,2,A,0,"' + value + '"\n','utf8'));
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 0,210,"TSS24.BF2",0,1,1,"'+ text + '"\n','gbk'));
fs.appendFileSync('./print.tpl',iconv.encode('QRCODE 185,130,M,2,A,0,"' + value + '"\n','utf8'));
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 150,210,"TSS24.BF2",0,1,1,"'+ text + '"\n','gbk'));

fs.appendFileSync('./print.tpl', 'PRINT 1\n');
console.log("print.tpl:\n"+fs.readFileSync('./print.tpl').toString());

}

function all_text(text){
begin_with();
text = fill_with(text,12,' ');

fs.appendFileSync('./print.tpl', iconv.encode('TEXT 0,10,"TSS24.BF2",0,1,1,"'+ text + '"\n','gbk'));
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 0,50,"TSS24.BF2",0,1,1,"'+ text + '"\n','gbk'));
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 0,90,"TSS24.BF2",0,1,1,"'+ text + '"\n','gbk'));
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 0,130,"TSS24.BF2",0,1,1,"'+ text + '"\n','gbk'));
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 0,170,"TSS24.BF2",0,1,1,"'+ text + '"\n','gbk'));
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 0,210,"TSS24.BF2",0,1,1,"'+ text + '"\n','gbk'));

fs.appendFileSync('./print.tpl', 'PRINT 1\n');

console.log("print.tpl:\n"+fs.readFileSync('./print.tpl').toString());
}

function poems(head,body,width=11){
begin_with();
head = fill_with(head,26,' ');
n = body.length/width + 1;
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 0,15,"TSS24.BF2",0,1,1,"'+ fill_with(head) + '"\n','gbk'));
for(var i =0 ;i < n ;i++){
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 0,'+(40+23*i)+',"TSS24.BF2",0,1,1,"'+ fill_with(body.substr(i*width,width),26) + '"\n','gbk'));
}
fs.appendFileSync('./print.tpl', 'PRINT 1\n');
}

function lyric(head,part1,part2,width = 11){
part1 = '  '+part1;
part2 = '  '+part2;
begin_with();
head = fill_with(head,26,' ');
n1 = part1.length/width + 1;
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 0,15,"TSS24.BF2",0,1,1,"'+ fill_with(head) + '"\n','gbk'));
for(var i =0 ;i < n1 ;i++){
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 0,'+(40+23*i)+',"TSS24.BF2",0,1,1,"'+ fill_with(part1.substr(i*width,width),26) + '"\n','gbk'));
}
n2 = part2.length/width + 1;
for(var i =0 ;i < n2 ;i++){
fs.appendFileSync('./print.tpl', iconv.encode('TEXT 0,'+(40+23*(i+n1))+',"TSS24.BF2",0,1,1,"'+ fill_with(part2.substr(i*width,width),26) + '"\n','gbk'));
}
fs.appendFileSync('./print.tpl', 'PRINT 1\n');
}

//qr_x4('拥有者:北师信科电子2015级吴畔昊(18810285808)','信科吴畔昊');
//qr_x4('寻寻觅觅,冷冷清清,凄凄惨惨戚戚,我是信科吴畔昊滴～(18810285808)','my owner');
//qr_x4('上德不德,我是信科吴畔昊的～(18810285808)','my owner');
qr_with_text('http://172.22.108.160/qr/v1/+2tsvB3foSfG1GcJRtNvGw==','EFID:1');
//all_text('信科吴畔昊   信科吴畔昊');
//poems('杜工部蜀中离席 李商隐','人生何处不离群？世路干戈惜暂分。雪岭未归天外使，松州犹驻殿前军。座中醉客延醒客，江上晴云杂雨云。美酒成都堪送老，当垆仍是卓文君。',8);
/*
cmd = process.argv[2];
if(!cmd)
console.log('no cmd specified');
else if(cmd=='poems' && process.argv[5])
poems(process.argv[3],process.argv[4],process.argv[5]);
else if(cmd=='qr' && process.argv[4])
qr_with_text(process.argv[3],process.argv[4]);
else if(cmd=='qr4' && process.argv[4])
qr_x4(process.argv[3],process.argv[4]);
else if(cmd=='text' && process.argv[3])
all_text(process.argv[3]);
else if(cmd=='lyric' && process.argv[5])
lyric(process.argv[3],process.argv[4],process.argv[5]);
else
console.log('参数不够');
*/
