#!coding:utf-8
import sys
import json
import MySQLdb

reload(sys)
sys.setdefaultencoding("utf-8")

with open('./config.json','r') as f:
    config = json.load(f)
    mysql = config['mysql']
#print(config)
def writeRaw(strs):
    with open('/dev/usb/lp0','w') as printer:
        for str in strs:
            if(str[:4]=='TEXT'):
                printer.write(str.encode('gbk'))
            else:
                printer.write(str)


# arr = [head,'QRCODE 90,20,M,4,A,0,"且将新火试新茶。诗酒趁年华 printed by:北师信科 吴畔昊"\n','TEXT 0,180,"TSS24.BF2",0,1,1,"      北师信科 吴畔昊"\n','PRINT 1\n']
#writeRaw(arr)

def autoPrint():
    conn = MySQLdb.connect(host=mysql['host'],user=mysql['user'],passwd=mysql['password'],db=mysql['database'],charset="utf8")
    try:
        cursor = conn.cursor()
        sql = 'select data,id from print_task where printed = 0'
        cursor.execute(sql)
        result = cursor.fetchone() 
        #print(result)
        if(result):
            arr = json.loads(result[0])
            print(arr)
            writeRaw(arr)
            sql = 'update print_task set printed=1 where id = %s'
            cursor.execute(sql,[result[1]])
            conn.commit()
        else:
            print('no results')
    finally:
        conn.close();

def printTask(id):
    conn = MySQLdb.connect(host=mysql['host'],user=mysql['user'],passwd=mysql['password'],db=mysql['database'],charset="utf8")
    try:
        cursor = conn.cursor()
        sql = 'select data,id from print_task where id = %s and printed = 0'
        cursor.execute(sql,[id]);
        result = cursor.fetchone() 
        #print(result)
        if(result):
            arr = json.loads(result[0])
            print(arr)
            writeRaw(arr)
            sql = 'update print_task set printed=1 where id = %s'
            cursor.execute(sql,[id])
            conn.commit()
        else:
            print('no results')
    finally:
        conn.close();
printTask(2)
#autoPrint()
